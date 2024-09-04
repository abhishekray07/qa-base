'use client'

import { StatusType, datadogLogs } from '@datadog/browser-logs'
import { Logger } from './logging-types'
import { sLog } from './server-logging'

let logger: Logger

export function cLog() {
  if (!logger && isClient()) {
    logger = initLogger()
  }
  return logger ?? isClient() ? console : sLog()
}

function initLogger() {
  const CLIENT_TOKEN = process.env.NEXT_PUBLIC_DATA_DOG_CLIENT_TOKEN

  if (!CLIENT_TOKEN) throw new Error('Missing client logging config')

  datadogLogs.init({
    clientToken: CLIENT_TOKEN as string,
    forwardErrorsToLogs: true,
    service: 'qa-base',
    sessionSampleRate: 100,
  })

  const jsonLogger = datadogLogs.createLogger('client', {
    level: (process.env.NEXT_PUBLIC_LOG_LEVEL as StatusType) ?? StatusType.info,
  })

  const clientLogger: Logger = {
    debug: logFn.bind(null, 'debug'),
    info: logFn.bind(null, 'info'),
    warn: logFn.bind(null, 'warn'),
    error: logFn.bind(null, 'error'),
  }

  function logFn(method: string, msg: string, obj?: object) {
    const { error, ...rest } = (obj ?? {}) as { error?: Error }
    return jsonLogger[method as keyof Logger](msg, rest, error as Error | undefined)
  }

  return clientLogger
}

function isClient() {
  return typeof window !== 'undefined'
}
