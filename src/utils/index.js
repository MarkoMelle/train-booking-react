export const handleScroll = (id) => {
  const element = document.getElementById(id);
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
};

export const timeDifference = (startTime, endTime, inWords = false) => {
  const startDate = new Date(`1970-01-01 ${startTime}`);
  const endDate = new Date(`1970-01-01 ${endTime}`);

  let difference = endDate - startDate;

  if (difference < 0) {
    difference += 24 * 60 * 60 * 1000;
  }

  const hours = Math.floor(difference / (60 * 60 * 1000));
  const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));

  if (inWords) {
    const hoursWord =
      hours === 1 ? "час" : hours > 1 && hours < 5 ? "часа" : "часов";

    const minutesWord =
      minutes === 1
        ? "минута"
        : minutes > 1 && minutes < 5
        ? "минуты"
        : "минут";

    return `${hours} ${hoursWord}\n${minutes} ${minutesWord}`;
  }

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
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
