import { timeDifference } from "../../../../../../utils";
import PropTypes from "prop-types";

export default function TimeInfo({ time, station, city, modifier }) {
  return (
    <div className={`ticket-info ticket-info--${modifier}`}>
      <div
        className={`ticket-info-container ticket-info-container--${modifier}`}
      >
        <span className={`ticket-info__time ticket-info__time--${modifier}`}>
          {time[0]}
        </span>
        <span className={`ticket-info__city ticket-info__city--${modifier}`}>
          {city[0]}
        </span>
        <span
          className={`ticket-info__station ticket-info__station--${modifier}`}
        >
          {station[0]}
        </span>
      </div>
      <span
        className={`ticket-info__duration ticket-info__duration--${modifier}`}
      >
        {timeDifference(time[0], time[1])}
      </span>
      <div
        className={`ticket-info-container ticket-info-container--${modifier}`}
      >
        <span className={`ticket-info__time ticket-info__time--${modifier}`}>
          {time[1]}
        </span>
        <span className={`ticket-info__city ticket-info__city--${modifier}`}>
          {city[1]}
        </span>
        <span
          className={`ticket-info__station ticket-info__station--${modifier}`}
        >
          {station[1]}
        </span>
      </div>
    </div>
  );
}

TimeInfo.propTypes = {
  time: PropTypes.array.isRequired,
  station: PropTypes.array.isRequired,
  city: PropTypes.array.isRequired,
  modifier: PropTypes.string.isRequired,
};