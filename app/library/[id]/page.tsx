import { notFound } from 'next/navigation';
import LibraryDetails from '@/app/components/LibraryDetails';
import { schools } from '@/app/schools';
import { generateRandomLibraryData } from '@/app/utils/generateRandomData';

// Define the type for params
type Params = Promise<{ id: string }>;

export default async function LibraryPage({ params }: { params: Params }) {
  // Await the params to resolve
  const resolvedParams = await params;
  const libraryId = decodeURIComponent(resolvedParams.id);

  // Find the school that contains the library
  const school = schools.find((s) =>
    s.libraries.some((lib) => lib.name === libraryId)
  );

  if (!school) {
    notFound(); // Trigger 404 if no school is found
  }

  // Find the specific library in the school
  const libraryInfo = school.libraries.find((lib) => lib.name === libraryId);

  if (!libraryInfo) {
    notFound(); // Trigger 404 if no library is found
  }

  // Generate library data dynamically
  const library = generateRandomLibraryData(
    libraryInfo.name,
    libraryInfo.numFloors
  );

  // Render the page
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <LibraryDetails library={library} schoolId={school.id} />
      </div>
    </main>
  );
}
