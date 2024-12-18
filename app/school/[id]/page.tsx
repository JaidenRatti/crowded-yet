import { notFound } from 'next/navigation';
import { schools } from '@/app/schools';
import LibraryList from '@/app/components/LibraryList';

// Define params type as a Promise
type Params = Promise<{ id: string }>;

export default async function SchoolPage({ params }: { params: Params }) {
  // Await the params to resolve
  const resolvedParams = await params;
  const schoolId = decodeURIComponent(resolvedParams.id);

  // Find the school by its id
  const school = schools.find((s) => s.id === schoolId);

  if (!school) {
    notFound(); // Trigger 404 page if school is not found
  }

  // Render the page
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{school.name} Libraries</h1>
      <LibraryList schoolId={school.id} showBackLink={true} />
    </div>
  );
}
