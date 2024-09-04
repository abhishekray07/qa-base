import pino from 'pino'
import { Logger } from './logging-types'

let logger: Logger

export function sLog() {
  if (!logger && isServer()) {
    logger = initLogger()
  }
  return logger ?? console
}

function initLogger() {
  const jsonLogger = pino({
    base: null,
    level: process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'info',
    errorKey: 'error'
  })

  const serverLogger: Logger = {
    debug(msg, obj) {
      jsonLogger.debug(obj, msg)
    },
    info(msg, obj) {
      jsonLogger.info(obj, msg)
    },
    warn(msg, obj) {
      jsonLogger.warn(obj, msg)
    },
    error(msg, obj) {
      jsonLogger.error(obj, msg)
    },
  }
  return serverLogger
}

function isServer() {
  return typeof window === 'undefined'
}
