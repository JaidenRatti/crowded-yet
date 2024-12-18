import { Library, SubLocation } from '@/app/types'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomSubLocation(name: string): SubLocation {
  const capacity = getRandomInt(50, 200);
  const people = getRandomInt(0, capacity);
  const busyness = Math.round((people / capacity) * 100);

  return {
    id: getRandomInt(1, 1000),
    name,
    busyness,
    people,
    capacity,
    isOpen: Math.random() > 0.2, // 80% chance of being open
    hourSummary: 'Open',
  };
}

export function generateRandomLibraryData(name: string, numFloors: number): Library {
  const subLocs = Array.from({ length: numFloors }, (_, i) => generateRandomSubLocation(`Floor ${i + 1}`));
  const totalCapacity = subLocs.reduce((sum, floor) => sum + floor.capacity, 0);
  const totalPeople = subLocs.reduce((sum, floor) => sum + floor.people, 0);
  const overallBusyness = Math.round((totalPeople / totalCapacity) * 100);

  return {
    id: getRandomInt(1, 1000),
    name,
    busyness: overallBusyness,
    people: totalPeople,
    capacity: totalCapacity,
    isOpen: subLocs.some(floor => floor.isOpen),
    hourSummary: 'Open',
    subLocs,
  };
}

