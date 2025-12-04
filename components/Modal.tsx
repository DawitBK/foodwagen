'use client'

import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null
  return (
    <div className="food-modal-backdrop" role="dialog" aria-modal="true">
      <div className="food-modal-card">
        <div className="flex justify-end">
          <button aria-label="close" onClick={onClose} className="text-gray-600">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
