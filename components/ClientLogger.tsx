'use client'

import { useEffect } from 'react'
import { cLog } from '@/utils/client-logging'

export function ClientLogger() {
  useEffect(() => {
    cLog().info('Client component mounted')
  }, [])

  return null
}
