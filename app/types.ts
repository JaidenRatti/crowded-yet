export interface SubLocation {
    id: number;
    name: string;
    busyness: number;
    people: number;
    capacity: number;
    isAvailable: boolean;
    hourSummary: string;
    isOpen: boolean;
    percentage: number;
  }
  
  export interface Library {
    name: string;
    id: number;
    busyness: number;
    people: number;
    isAvailable: boolean;
    capacity: number;
    hourSummary: string;
    isOpen: boolean;
    percentage: number;
    subLocs?: SubLocation[];
  }
  
  export interface SchoolData {
    data: Library[];
  }
  
  export interface School {
    name: string;
    id: string;
  }
  
  