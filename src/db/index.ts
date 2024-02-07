const patients = [
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
    notes: [
      {
        id: 1,
        date: '2024-02-06T18:55:00.000Z',
        title: 'First visit',
        description: 'First visit to the doctor',
        duration: 7,
        prescriptions: [
          {
            id: 1,
            name: 'Paracetamol',
            dosage: '1 pill every 8 hours',
          },
          {
            id: 2,
            name: 'Ibuprofen',
            dosage: '1 pill every 12 hours',
          },
        ],
      },
      {
        id: 2,
        date: '2024-02-06T18:55:00.000Z',
        title: 'Second visit',
        description: 'Second visit to the doctor',
        duration: 10,
        prescriptions: [
          {
            id: 3,
            name: 'Paracetamol',
            dosage: '1 pill every 8 hours',
          },
          {
            id: 4,
            name: 'Ibuprofen',
            dosage: '1 pill every 12 hours',
          },
        ],
      },
    ],
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
    notes: [
      {
        id: 3,
        date: '2024-02-06T18:55:00.000Z',
        title: 'First visit',
        description: 'First visit to the doctor',
        duration: 10,
        prescriptions: [
          {
            id: 5,
            name: 'Paracetamol',
            dosage: '1 pill every 8 hours',
          },
          {
            id: 6,
            name: 'Ibuprofen',
            dosage: '1 pill every 12 hours',
          },
        ],
      },
      {
        id: 4,
        date: '2024-02-06T18:55:00.000Z',
        title: 'First visit',
        description: 'First visit to the doctor',
        duration: 10,
      },
    ],
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

export default {patients};
