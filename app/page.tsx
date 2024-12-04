'use client'

import Link from 'next/link'
import { useState } from 'react'
import { schools } from './schools'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Home() {
  const [isDataSourceOpen, setIsDataSourceOpen] = useState(false)
  const [isWrongDataOpen, setIsWrongDataOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Universities/Colleges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {schools.map((school) => (
          <Link 
            key={school.id} 
            href={`/school/${school.id}`}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <h2 className="text-xl font-bold">{school.name}</h2>
          </Link>
        ))}
      </div>
      <div className="border-t pt-4">
        <button
          onClick={() => setIsDataSourceOpen(!isDataSourceOpen)}
          className="flex items-center justify-between w-full text-left text-lg font-semibold py-2"
        >
          How are you getting this data?
          {isDataSourceOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {isDataSourceOpen && (
          <div className="mt-2 text-gray-600 pb-4">
            <p>Data is pulled from <a href="https://waitz.io/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://waitz.io/</a>, and how they get their data can be found <a href="https://waitz.io/faq.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">here</a>.</p>
          </div>
        )}
      </div>
      <div className="border-t pt-4">
        <button
          onClick={() => setIsWrongDataOpen(!isWrongDataOpen)}
          className="flex items-center justify-between w-full text-left text-lg font-semibold py-2"
        >
          Why does it say 0% occupancy?
          {isWrongDataOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {isWrongDataOpen && (
          <div className="mt-2 text-gray-600 pb-4">
            <p>Three options: The building is closed, the building is open but empty (unlikely), or the school is no longer supported. Schools known to not be supported anymore are Brandeis, FIU, McGill, San Antonio, Texas State, Buffalo, Hartford, and Westminster.</p>
          </div>
        )}
      </div>
    </div>
  )
}

