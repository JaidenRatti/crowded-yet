import { notFound } from 'next/navigation'
import { schools } from '../../../../schools'
import LibraryDetails from '../../../../components/LibraryDetails'

interface PageProps {
  params: Promise<{
    id: string
    libraryId: string
  }>
}

export default async function LibraryPage({ params }: PageProps) {
  const { id, libraryId } = await params
  const school = schools.find(s => s.id === id)
  const libraryIdNum = parseInt(libraryId, 10)

  if (!school || isNaN(libraryIdNum)) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LibraryDetails schoolId={school.id} libraryId={libraryIdNum} />
    </div>
  )
}

