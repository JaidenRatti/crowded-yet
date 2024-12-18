import { schools } from './schools'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p className="mb-2">
          Unfortunately CrowdedYet has been forced to shut down. If you are looking to see how busy buildings on your campus are head to waitz.io/[school]. For example <a href="https://waitz.io/waterloo" className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">www.waitz.io/waterloo</a>.
        </p>
        <p>Below is what one of the schools used to look like.</p>
      </div>
      <h1 className="text-3xl font-bold mb-6">Universities/Colleges (Historical View)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {schools.map((school) => (
          <Link 
            key={school.id} 
            href={`/school/${school.id}`}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <h2 className="text-xl font-bold">{school.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

