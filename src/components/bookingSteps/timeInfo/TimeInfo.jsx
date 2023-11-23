import PropTypes from "prop-types";

function formatTime(time, inWords = false) {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
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
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

export default function TimeInfo({
  time,
  duration,
  station,
  city,
  modifier,
  block = "ticket-info",
  date,
}) {
  return (
    <div className={`${block} ${block}--${modifier}`}>
      <div className={`${block}-container ${block}-container--left`}>
        <span className={`${block}__time ${block}__time--${modifier}`}>
          {formatTime(time[0])}
        </span>
        {date ? (
          <span className={`${block}__date ${block}__date--${modifier}`}>
            {date.left}
          </span>
        ) : null}
        <span className={`${block}__city ${block}__city--${modifier}`}>
          {city[0]}
        </span>
        <span className={`${block}__station ${block}__station--${modifier}`}>
          {station[0]} вокзал
        </span>
      </div>
      <span className={`${block}__duration ${block}__duration--${modifier}`}>
        {block === "seat-selector__info"
          ? formatTime(duration, true)
          : formatTime(duration)}
      </span>
      <div className={`${block}-container ${block}-container--right`}>
        <span className={`${block}__time ${block}__time--${modifier}`}>
          {formatTime(time[1])}
        </span>
        {date ? (
          <span className={`${block}__date ${block}__date--${modifier}`}>
            {date.right}
          </span>
        ) : null}
        <span className={`${block}__city ${block}__city--${modifier}`}>
          {city[1]}
        </span>
        <span className={`${block}__station ${block}__station--${modifier}`}>
          {station[1]} вокзал
        </span>
      </div>
    </div>
  );
}

TimeInfo.propTypes = {
  time: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  station: PropTypes.array.isRequired,
  city: PropTypes.array.isRequired,
  modifier: PropTypes.string.isRequired,
  block: PropTypes.string,
  date: PropTypes.object,
};
