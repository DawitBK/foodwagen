'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Modal from './Modal'
import FoodForm from './FoodForm'
import { useAppDispatch } from '../store/hooks'
import { fetchFoods } from '../store/foodSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const [openAdd, setOpenAdd] = useState(false)

  return (
    <>
      <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="food-container flex items-center justify-between py-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-2xl">🍔</span>
            <span className="text-xl font-bold text-amber-500">FoodWagen</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-700">
            <Link href="#foods" className="hover:text-amber-500 transition">Featured</Link>
          </nav>
          <div className="flex items-center gap-4">

            <button
              className="bg-amber-500 text-white px-6 py-2 rounded-md shadow-lg font-bold hover:bg-amber-600 transition text-sm"
              onClick={() => setOpenAdd(true)}
            >
              Add Meal
            </button>
          </div>
        </div>
      </header>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <FoodForm
          onSuccess={() => {
            setOpenAdd(false)
            dispatch(fetchFoods())
          }}
          onCancel={() => setOpenAdd(false)}
        />
      </Modal>
    </>
  )
}
