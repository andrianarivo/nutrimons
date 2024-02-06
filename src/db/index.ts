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
        duration: 7,
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
      {
        date: '2021-01-01',
        title: 'Second visit',
        description: 'Second visit to the doctor',
        duration: 10,
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
        duration: 10,
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
