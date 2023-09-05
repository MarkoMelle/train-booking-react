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
