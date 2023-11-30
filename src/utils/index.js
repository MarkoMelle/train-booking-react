export const handleScroll = (id) => {
  const element = document.getElementById(id);
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
};

export const formatDate = (date) => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export function stringifyDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

export function addSeatsToWagons(wagons) {
  const requiredSeats = {
    first: 16,
    second: 32,
    third: 48,
    fourth: 62,
  };

  return wagons.map((wagon) => {
    const classType = wagon.coach.class_type;
    const currentSeatsCount = wagon.seats.length;
    const seatsToAdd = requiredSeats[classType] - currentSeatsCount;

    let newSeats = [...wagon.seats];

    for (let i = 0; i < seatsToAdd; i++) {
      newSeats.push({
        index: currentSeatsCount + i + 1,
        available: Math.random() > 0.5,
      });
    }
    return {
      ...wagon,
      seats: newSeats,
    };
  });
}

export function classifySeats(wagon) {
  const { seats, coach } = wagon;

  let upperAvailableSeats = 0;
  let lowerAvailableSeats = 0;
  let sideAvailableSeats = 0;

  const updatedSeats = seats.map((seat) => {
    let seatPrice;

    if (!seat.available) {
      return seat;
    }

    if (coach.class_type === "first") {
      seatPrice = seat.index % 2 === 0 ? coach.bottom_price : coach.top_price;
      seat.index % 2 === 0 ? lowerAvailableSeats++ : upperAvailableSeats++;
    } else if (coach.class_type === "second" || coach.class_type === "third") {
      const isUpperSeat = seat.index % 4 === 2 || seat.index % 4 === 3;
      if (seat.index > 32 && seat.index <= 48 && coach.class_type === "third") {
        seatPrice = coach.side_price;
        sideAvailableSeats++;
      } else {
        seatPrice = isUpperSeat ? coach.bottom_price : coach.top_price;
        isUpperSeat ? upperAvailableSeats++ : lowerAvailableSeats++;
      }
    } else if (coach.class_type === "fourth") {
      let isLowerSeat;
      if (seat.index <= 32) {
        isLowerSeat = [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32].includes(seat.index);
      } else {
        isLowerSeat = seat.index !== 62 && seat.index % 2 === 0;
      }

      seatPrice = isLowerSeat ? coach.bottom_price : coach.top_price;
      isLowerSeat ? upperAvailableSeats++ : lowerAvailableSeats++;
    }

    return { ...seat, price: seatPrice };
  });

  return {
    ...wagon,
    seats: updatedSeats,
    coach: {
      ...coach,
      upper_available_seats: upperAvailableSeats,
      lower_available_seats: lowerAvailableSeats,
      ...(coach.class_type === "third" && {
        side_available_seats: sideAvailableSeats,
      }),
    },
  };
}

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function calculateTicketInfo(data) {
  const ticketInfo = {
    passengers: {
      adult: 0,
      children: 0,
    },
    price: {
      adult: 0,
      children: 0,
    },
    totalPrice: 0,
  };

  const processTickets = (tickets, countPassengers) => {
    tickets.forEach((ticket) => {
      const type = ticket.type === "adult" ? "adult" : "children";
      if (countPassengers) {
        ticketInfo.passengers[type]++;
      }
      ticketInfo.price[type] += ticket.resultPrice;
    });
  };

  processTickets(data.departure, true);

  if (data.arrival) {
    processTickets(data.arrival, false);
  }

  ticketInfo.totalPrice = ticketInfo.price.adult + ticketInfo.price.children;

  return ticketInfo;
}


export function formatPassengerData(data) {
  const fullName = `${data.lastName} ${data.firstName} ${data.patronymic}`;

  const birthDateFormatted = new Date(data.birthDate).toLocaleDateString('ru-RU');

  const gender = data.gender === 'male' ? 'мужской' : 'женский';

  const documentType = data.documentType === 'passport' ? 'Паспорт' : 'Свидетельство о рождении';

  let documentNumber;
  if (data.documentType === 'passport') {
    documentNumber = `${data.passportSeries} ${data.passportNumber}`;
  } else {
    documentNumber = data.birthCertificateNumber;
  }


  const ageCategory = data.ageType === 'adult' ? 'Взрослый' : 'Детский';

  return {
    ageCategory,
    fullName,
    gender,
    birthDate: birthDateFormatted,
    documentType,
    documentNumber,
  };
}
