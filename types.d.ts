export interface Patient {
  id: number;
  name: string;
  firstname: string;
  age: number;
  height: number;
  weight: number;
  summary: string;
  hourRate: number;
  notes?: Note[];
  [key: string]: any;
}

export interface Note {
  id: number;
  date: string;
  title: string;
  description: string;
  duration: number;
  prescriptions?: Prescription[];
  [key: string]: any;
}

export interface Prescription {
  id: number;
  name: string;
  dosage: string;
  [key: string]: any;
}
