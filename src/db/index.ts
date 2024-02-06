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
        date: '2021-01-01',
        title: 'First visit',
        description: 'First visit to the doctor',
        prescription: [
          {
            name: 'Paracetamol',
            dosage: '1 pill every 8 hours',
          },
          {
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
        date: '2021-01-01',
        title: 'First visit',
        description: 'First visit to the doctor',
        prescription: [
          {
            name: 'Paracetamol',
            dosage: '1 pill every 8 hours',
          },
          {
            name: 'Ibuprofen',
            dosage: '1 pill every 12 hours',
          },
        ],
      },
    ],
  },
];

export default {patients};
