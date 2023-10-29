export const initialState = {
  currentTrip: {
    trainNumber: "116С",
    direction: ["Москва", "Санкт-Петербург"],
    departureTime: ["00:10", "09:52"],
    departureStation: ["Курский вокзал", "Ладожский вокзал"],
    arrivalTime: ["00:10", "09:52"],
    arrivalStation: ["Курский вокзал", "Ладожский вокзал"],
    sitClasses: [
      {
        name: "Сидячий",
        available: { all: 88, upper: 22, lower: 66 },
        price: { from: 1920, upper: 1920, lower: 2130 },
      },
      {
        name: "Плацкарт",
        available: { all: 52, upper: 12, lower: 40 },
        price: { from: 3820, upper: 3820, lower: 4130 },
      },
      {
        name: "Купе",
        available: { all: 24, upper: 19, lower: 5 },
        price: { from: 6820, upper: 6820, lower: 7130 },
      },
      {
        name: "Люкс",
        available: { all: 18, upper: 11, lower: 7 },
        price: { from: 11820, upper: 11820, lower: 12130 },
      },
    ],
  },
};

export const passengers = [
  {
    ageCategory: "Взрослый",
    fullName: "Мартынюк Ирина Эдуардовна",
    gender: "женский",
    birthDate: "17.02.1985",
    documentType: "Паспорт",
    documentNumber: "4511 234567",
  },
  {
    ageCategory: "Взрослый",
    fullName: "Иванов Иван Иванович",
    gender: "мужской",
    birthDate: "12.05.1980",
    documentType: "Паспорт",
    documentNumber: "4255 320650",
  },
  {
    ageCategory: "Детский",
    fullName: "Петрова Анастасия Сергеевна",
    gender: "женский",
    birthDate: "08.08.1990",
    documentType: "Свидетельство о рождении",
    documentNumber: "VIII УН 256319",
  },
];

export const order = {
  number: "285АА",
  totalPrice: 7760,
};
