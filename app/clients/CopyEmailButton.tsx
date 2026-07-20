'use client'

import {useEffect, useRef, useState} from 'react'
import {Copy, Mail} from 'lucide-react'

type CopyEmailButtonProps = {
  email: string
  label: string
  inverted?: boolean
}

export default function CopyEmailButton({
  email,
  label,
  inverted = false,
}: CopyEmailButtonProps) {
  const [toastMessage, setToastMessage] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  const showToast = (message: string) => {
    setToastMessage(message)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToastMessage(''), 2400)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      showToast(`${email} copied to clipboard`)
    } catch {
      showToast(`Could not copy automatically: ${email}`)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={`${label} Copy ${email} to clipboard`}
        className={
          inverted
            ? 'inline-flex min-h-13 items-center justify-center gap-3 rounded-md bg-brand-white px-6 py-3 text-brand-red transition hover:bg-brand-red-wash focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-white'
            : 'inline-flex min-h-13 items-center justify-center gap-3 rounded-md bg-brand-red px-6 py-3 text-brand-white transition hover:bg-brand-red-dark focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-red'
        }
      >
        <Mail className="h-4 w-4" aria-hidden />
        <span className="text-sm font-semibold">{label}</span>
      </button>

      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed bottom-5 left-1/2 z-[100] flex w-[min(calc(100vw-2rem),30rem)] -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-brand-black px-5 py-3.5 text-center text-sm font-medium text-brand-white shadow-xl transition-all duration-200 ${
          toastMessage
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <Copy className="h-4 w-4 shrink-0 text-brand-red-light" aria-hidden />
        {toastMessage}
      </div>
    </>
  )
}
