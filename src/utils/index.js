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

  return wagons.map(wagon => {
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

  seats.forEach((seat) => {
    if (!seat.available) return;

    if (coach.class_type === "first") {
      seat.index % 2 === 0 ? lowerAvailableSeats++ : upperAvailableSeats++;
    } else if (coach.class_type === "second" || coach.class_type === "third") {
      if (seat.index > 32 && seat.index <= 48 && coach.class_type === "third") {
        sideAvailableSeats++;
      } else {
        ((seat.index + 1) % 4 === 0 || seat.index % 4 === 0) ? lowerAvailableSeats++ :upperAvailableSeats++ ;
      }
    } else if (coach.class_type === "fourth") {
      (((seat.index <= 31) && ((seat.index + 1) % 4 === 0 || seat.index % 4 === 0)) || (seat.index >= 33 && seat.index % 2 === 1)) 
        ? upperAvailableSeats++ : lowerAvailableSeats++;
    }
  });

  return {
    ...wagon,
    coach: {
      ...coach,
      upper_available_seats: upperAvailableSeats,
      lower_available_seats: lowerAvailableSeats,
      ...(coach.class_type === "third" && { side_available_seats: sideAvailableSeats })
    }
  };
}
