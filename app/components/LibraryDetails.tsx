'use client'

import Link from 'next/link'
import { Library, SubLocation } from '@/app/types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LibraryDetailsProps {
  library: Library
  schoolId: string
}

export default function LibraryDetails({ library, schoolId }: LibraryDetailsProps) {
  const getOccupancyColor = (percentage: number) => {
    if (percentage < 33) return 'bg-green-500'
    if (percentage < 66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <Link href={`/school/${schoolId}`} className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all libraries</Link>
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

