import { type ApiEnvelope, http } from '@/lib/http'

export type WaitlistEntry = {
  id: string
  name: string
  position: string
  businessName: string
  businessEmail: string
  createdAt: string
}

export const waitlistApi = {
  async list(): Promise<WaitlistEntry[]> {
    const { data } = await http.get<ApiEnvelope<WaitlistEntry[]>>('/waitlist')
    return data.data
  },
}
