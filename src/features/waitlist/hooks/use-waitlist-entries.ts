import { useQuery } from '@tanstack/react-query'
import { waitlistApi } from '../api/waitlist-api'

export const waitlistKeys = { all: ['waitlist'] as const }

export function useWaitlistEntries() {
  return useQuery({ queryKey: waitlistKeys.all, queryFn: waitlistApi.list })
}
