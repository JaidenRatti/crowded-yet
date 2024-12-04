'use client'

import { useState, useEffect } from 'react'
import { Library, SubLocation } from '../types'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LibraryDetailsProps {
  schoolId: string
  libraryId: number
}

export default function LibraryDetails({ schoolId, libraryId }: LibraryDetailsProps) {
  const [library, setLibrary] = useState<Library | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 33) return 'bg-green-500'
    if (percentage < 66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

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
        const data = await response.json()
        const foundLibrary = data.data.find((lib: Library) => lib.id === libraryId)
        if (foundLibrary) {
          setLibrary(foundLibrary)
        } else {
          setError('Library not found')
        }
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
  }, [schoolId, libraryId])

  if (loading) {
    return <div className="text-center text-gray-600">Loading details...</div>
  }

  if (error || !library) {
    return <div className="text-center text-red-600">{error || 'Library not found'}</div>
  }

  return (
    <div className="space-y-6">
      <Link href={`/school/${schoolId}`} className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all buildings</Link>
      <h1 className="text-3xl font-bold mb-6">{library.name}</h1>
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle>Overall Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className={`h-full rounded-full ${getOccupancyColor(library.busyness)}`}
                  style={{ width: `${library.busyness}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium ml-2 text-gray-600">
                {library.busyness}%
              </span>
            </div>
            <Badge variant={library.isOpen ? "default" : "destructive"} className={library.isOpen ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
              {library.isOpen ? 'Open' : 'Closed'}
            </Badge>
            <p className="text-sm text-gray-500">{library.hourSummary}</p>
          </div>
        </CardContent>
      </Card>
      {library.subLocs && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Detailed Occupancy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {library.subLocs.map((subLoc: SubLocation) => (
              <Card key={subLoc.id} className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle>{subLoc.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-full rounded-full ${getOccupancyColor(subLoc.busyness)}`}
                          style={{ width: `${subLoc.busyness}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium ml-2 text-gray-600">
                        {subLoc.busyness}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">People: {subLoc.people} / {subLoc.capacity}</p>
                    <Badge variant={subLoc.isOpen ? "default" : "destructive"} className={subLoc.isOpen ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
                      {subLoc.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                    <p className="text-sm text-gray-500">{subLoc.hourSummary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

