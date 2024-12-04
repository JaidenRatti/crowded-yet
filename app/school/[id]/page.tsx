import { notFound } from 'next/navigation'
import { schools } from '../../schools'
import LibraryList from '../../components/LibraryList'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SchoolPage({ params }: PageProps) {
  const { id } = await params
  const school = schools.find(s => s.id === id)

  if (!school) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{school.name} Buildings</h1>
      <LibraryList schoolId={school.id} showBackLink={true} />
    </div>
  )
}

