'use client'

import { useEffect } from 'react'
import { initDatadog } from '@/utils/datadog'

export function DatadogInitializer() {
  useEffect(() => {
    initDatadog()
  }, [])

  return null
}
