import Link from 'next/link'
import { Library } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LibraryCardProps {
  library: Library
  schoolId: string
}

export default function LibraryCard({ library, schoolId }: LibraryCardProps) {
  const getOccupancyColor = (percentage: number) => {
    if (percentage < 33) return 'bg-green-500'
    if (percentage < 66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Link href={`/school/${schoolId}/library/${library.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{library.name}</CardTitle>
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
            <p className="text-sm text-gray-600">
              Current occupancy: {library.people} / {library.capacity}
            </p>
            <Badge variant={library.isOpen ? "default" : "destructive"} className={library.isOpen ? "bg-green-500 hover:bg-green-600" : ""}>
              {library.isOpen ? 'Open' : 'Closed'}
            </Badge>
            <p className="text-sm text-gray-500">{library.isOpen ? 'View floor details' : 'Closed'}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

