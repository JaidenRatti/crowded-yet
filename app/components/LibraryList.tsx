'use client'

import React, { useState, useEffect } from 'react'
import { SchoolData } from '@/app/types'
import LibraryCard from './LibraryCard'
import Link from 'next/link'
import { MousePointerClick } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { schools } from '@/app/schools'
import { generateRandomLibraryData } from '@/app/utils/generateRandomData'

interface LibraryListProps {
  schoolId: string
  showBackLink?: boolean
}

const LibraryList: React.FC<LibraryListProps> = ({ schoolId, showBackLink = false }) => {
  const [libraries, setLibraries] = useState<SchoolData | null>(null)

  useEffect(() => {
    const generateData = () => {
      const school = schools.find(s => s.id === schoolId);
      if (school) {
        const librariesData = school.libraries.map(lib => 
          generateRandomLibraryData(lib.name, lib.numFloors)
        );
        setLibraries({ id: school.id, name: school.name, libraries: librariesData });
      }
    };

    generateData();
    const interval = setInterval(generateData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [schoolId]);

  if (!libraries) {
    return <div className="text-center">Loading library data...</div>
  }

  return (
    <div>
      {showBackLink && (
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all schools</Link>
      )}
      <Alert className="mb-6">
        <MousePointerClick className="h-4 w-4" />
        <AlertTitle>Interactive Library Cards</AlertTitle>
        <AlertDescription>
          The data below is randomly generated as I am no longer allowed to access the API. Click on any library card to view more details on Waitz.io.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraries.libraries.map((library) => (
          <LibraryCard key={library.id} library={library} schoolId={schoolId} />
        ))}
      </div>
    </div>
  )
}

export default LibraryList;

