export interface SubLocation {
  id: number;
  name: string;
  busyness: number;
  people: number;
  capacity: number;
  hourSummary: string;
  isOpen: boolean;
}

export interface Library {
  name: string;
  id: number;
  busyness: number;
  people: number;
  capacity: number;
  hourSummary: string;
  isOpen: boolean;
  subLocs?: SubLocation[];
}

export interface SchoolData {
  id: string;
  name: string;
  libraries: Library[];
}

export interface School {
  name: string;
  id: string;
}

export interface SchoolInfo {
  id: string;
  name: string;
  libraries: { name: string; numFloors: number }[];
}

