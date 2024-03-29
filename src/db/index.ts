import {MMKV} from 'react-native-mmkv';
import {Note, Patient, Prescription} from '../../types';

const patients: Patient[] = [
  {
    id: 1,
    name: 'Cristian',
    firstname: 'Cristian',
    age: 25,
    height: 1.75,
    weight: 75,
    sex: 'm',
    summary: 'Healthy young guy no medical history.',
    hourRate: 25,
    notes: [1, 2],
  },
  {
    id: 2,
    name: 'Cristian',
    firstname: 'Cristian',
    age: 25,
    height: 1.75,
    weight: 75,
    sex: 'm',
    summary: 'Healthy young guy no medical history.',
    hourRate: 25,
    notes: [3, 4],
  },
  {
    id: 3,
    name: 'Cristian',
    firstname: 'Cristian',
    age: 25,
    height: 1.75,
    weight: 75,
    sex: 'm',
    summary: 'Healthy young guy no medical history.',
    hourRate: 25,
  },
];

const notes: Note[] = [
  {
    id: 1,
    date: '2024-02-06T18:55:00.000Z',
    title: 'First visit',
    description: 'First visit to the doctor',
    duration: 7,
    patientId: 1,
    prescriptions: [1, 2],
  },
  {
    id: 2,
    date: '2024-02-06T18:55:00.000Z',
    title: 'Second visit',
    description: 'Second visit to the doctor',
    duration: 7,
    patientId: 1,
    prescriptions: [3, 4],
  },
  {
    id: 3,
    date: '2024-02-06T18:55:00.000Z',
    title: 'First visit',
    description: 'First visit to the doctor',
    duration: 10,
    patientId: 2,
    prescriptions: [5, 6],
  },
  {
    id: 4,
    date: '2024-02-06T18:55:00.000Z',
    title: 'First visit',
    description: 'First visit to the doctor',
    duration: 10,
    patientId: 2,
  },
];

const prescriptions: Prescription[] = [
  {
    id: 1,
    noteId: 1,
    name: 'Paracetamol',
    dosage: '1 pill every 8 hours',
  },
  {
    id: 2,
    noteId: 1,
    name: 'Ibuprofen',
    dosage: '1 pill every 12 hours',
  },
  {
    id: 3,
    noteId: 2,
    name: 'Paracetamol',
    dosage: '1 pill every 8 hours',
  },
  {
    id: 4,
    noteId: 2,
    name: 'Ibuprofen',
    dosage: '1 pill every 12 hours',
  },
  {
    id: 5,
    noteId: 3,
    name: 'Paracetamol',
    dosage: '1 pill every 8 hours',
  },
  {
    id: 6,
    noteId: 3,
    name: 'Ibuprofen',
    dosage: '1 pill every 12 hours',
  },
];

const storage = new MMKV();

export {storage};

export default {patients, notes, prescriptions};
