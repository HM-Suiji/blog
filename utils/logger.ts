import pino from 'pino'

const isEdge = process.env.NEXT_RUNTIME === 'edge'
const isBrowser = typeof window !== 'undefined'
const isNodeServer = !isEdge && !isBrowser
const logLevel = process.env.LOG_LEVEL || 'info'

export const logger =
  isNodeServer && process.env.NODE_ENV === 'production'
    ? pino({ level: logLevel }, pino.destination({ sync: true }))
    : pino({
        transport:
          process.env.NODE_ENV !== 'production' && !isBrowser && !isEdge
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              }
            : undefined,
        level: process.env.NODE_ENV === 'production' ? logLevel : 'debug',
        browser: {
          asObject: true,
        },
      })
