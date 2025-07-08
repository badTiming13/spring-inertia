// server.js
import express from 'express'
import fetch from 'node-fetch'
import minimist from 'minimist'
import { createServer as createViteServer, createLogger } from 'vite'

const args        = minimist(process.argv.slice(2))
const upstreamUrl = args.u || 'http://localhost:8080'
const port        = args.p || 5173
const logger      = createLogger()

// Helper to merge fetch headers into a plain object
const toHeadersObject = (headers) => {
  const out = {}
  for (const [k, v] of headers.entries()) out[k] = v
  return out
}

async function createServer() {
  const app = express()

  // 1) Create Vite in middleware mode, telling HMR to use the same port
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        clientPort: port,   // client connects back here for HMR
      },
    },
    appType: 'custom',
  })

  // 2) Mount Vite's own middleware (handles /@vite/, /src/, HMR upgrade)
  app.use(vite.middlewares)
  app.use(express.json())

  // 3) Skip proxy for Vite internals
  app.use((req, res, next) => {
    if (
      req.url.startsWith('/@vite/')    ||
      req.url.startsWith('/src/')      ||
      req.url.startsWith('/node_modules/') ||
      req.headers.upgrade              || // WebSocket HMR
      req.url === '/favicon.ico'
    ) {
      return next()
    }
    next('route')
  })

  // 4) Proxy all other requests (your pages) to Spring Boot, then transform HTML
  app.use(async (req, res) => {
    try {
      const upstream = await fetch(upstreamUrl + req.originalUrl, {
        method: req.method,
        headers: req.headers,
        body: ['GET','HEAD'].includes(req.method)
          ? undefined
          : JSON.stringify(req.body),
      })

      logger.info(`[${upstream.status}] ${req.method} ${req.originalUrl}`)

      const headers = toHeadersObject(upstream.headers)
      let body = await upstream.text()

      if (headers['content-type']?.startsWith('text/html')) {
        body = await vite.transformIndexHtml(req.originalUrl, body)
        headers['content-length'] = body.length
      }

      res.status(upstream.status).set(headers).end(body)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).send(e.message)
    }
  })

  // 5) Start Express on a single port (no separate Vite server)
  app.listen(port, () =>
    logger.info(`🚀 Dev server running at http://localhost:${port}`)
  )
}

createServer()
