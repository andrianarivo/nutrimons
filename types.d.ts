export interface Patient {
  id: number;
  name: string;
  firstname: string;
  age: number;
  height: number;
  weight: number;
  summary: string;
  hourRate: number;
  notes: Note[];
}

export interface Note {
  date: string;
  title: string;
  description: string;
  prescription: Prescription[];
}

export interface Prescription {
  name: string;
  dosage: string;
}
