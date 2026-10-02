import { create } from 'zustand'

export type ToastVariant = 'success' | 'error'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
}

interface ToastState {
  toasts: Toast[]
  dismiss: (id: number) => void
}

const DURATION_MS = 4000
let nextId = 0

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

function push(message: string, variant: ToastVariant) {
  const id = ++nextId
  useToastStore.setState((state) => ({ toasts: [...state.toasts, { id, message, variant }] }))
  setTimeout(() => useToastStore.getState().dismiss(id), DURATION_MS)
}

export const toast = {
  success: (message: string) => push(message, 'success'),
  error: (message: string) => push(message, 'error'),
}
