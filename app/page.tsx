import { schools } from './schools'
import Link from 'next/link'
import Image from 'next/image'

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
      
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">Cease and Desists</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Initial Notice</h3>
              <Image
                src="/cd1.png"
                alt="Initial cease and desist letter from Waitz.io"
                width={2306}
                height={1330}
                className="w-full rounded-lg"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Follow-up Notice</h3>
              <Image
                src="/cd2.png"
                alt="Follow-up cease and desist letter from Waitz.io"
                width={2280}
                height={824}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-lg">
  <p className="text-center text-lg">
    To see the support received from students, check{' '}
    <a 
      href="https://www.reddit.com/r/uwaterloo/comments/1h6v4ks/check_how_busy_the_libraries_on_campus_are/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="font-bold text-blue-600 hover:text-blue-800 underline"
    >
      this Reddit post
    </a>
  </p>
</div>
    </div>
  )
}

