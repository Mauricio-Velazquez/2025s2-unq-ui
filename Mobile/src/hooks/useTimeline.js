import { useContext } from 'react'
import { TimelineContext } from '../providers/TimelineProvider'

export function useTimeline () {
  const context = useContext(TimelineContext)

  if (!context) {
    throw new Error('useTimeline must be used within an TimelineProvider')
  }

  return context
}
