'use client'

import { useState, useEffect } from 'react'
import { SchoolData } from '../types'
import LibraryCard from './LibraryCard'
import Link from 'next/link'

interface LibraryListProps {
  schoolId: string
  showBackLink?: boolean
}

export default function LibraryList({ schoolId, showBackLink = false }: LibraryListProps) {
  const [libraries, setLibraries] = useState<SchoolData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://waitz.io/live/${schoolId}`, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: SchoolData = await response.json()
        setLibraries(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching library data:', err)
        setError(`Failed to load library data: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [schoolId])

  if (loading) {
    return <div className="text-center">Loading library data...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <p className="mt-2">
          If this error persists, it may be due to CORS restrictions.
        </p>
      </div>
    )
  }

  if (!libraries || libraries.data.length === 0) {
    return <div className="text-center">No library data available.</div>
  }

  return (
    <div>
      {showBackLink && (
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all schools</Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {libraries.data.map((library) => (
          <LibraryCard key={library.id} library={library} schoolId={schoolId} />
        ))}
      </div>
    </div>
  )
}

