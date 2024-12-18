import { Library } from '@/app/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock } from 'lucide-react'

interface LibraryCardProps {
  library: Library
  schoolId: string
}

export default function LibraryCard({ library}: LibraryCardProps) {
  const getOccupancyColor = (percentage: number) => {
    if (percentage < 33) return 'bg-green-500'
    if (percentage < 66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <a 
      href="https://waitz.io/waterloo" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block group"
    >
      <Card className="transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">{library.name}</span>
            <span className="text-sm text-gray-500">
              {library.subLocs?.length} {library.subLocs?.length === 1 ? 'Floor' : 'Floors'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {library.hourSummary}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="default"
            size="sm" 
            className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
          >
            View floor details
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </a>
  )
}

