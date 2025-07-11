import React from 'react'
import { useCartStore } from '@/entities/cart/model/store'

export function CartIcon() {
  const { items } = useCartStore()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="relative">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  )
} 