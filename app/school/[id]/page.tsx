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
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{school.name} Libraries</h1>
      
      <LibraryList schoolId={school.id} showBackLink={true} />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Demo (Historical)</h2>
        <video 
          controls
          className="w-full max-w-4xl mx-auto"
          playsInline
          preload="metadata"
        >
          <source 
            src="/croppedcrowdedreddit.mp4" 
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm text-gray-600 mt-2 text-center">
          A demonstration of how the library occupancy tracking used to work.
        </p>
      </div>
    </div>
  )
}

