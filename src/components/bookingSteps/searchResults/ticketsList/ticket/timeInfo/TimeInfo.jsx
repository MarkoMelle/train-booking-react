import { timeDifference } from "../../../../../../utils";
import PropTypes from "prop-types";

export default function TimeInfo({
  time,
  station,
  city,
  modifier,
  block = "ticket-info",
}) {
  return (
    <div className={`${block} ${block}--${modifier}`}>
      <div className={`${block}-container ${block}-container--${modifier}`}>
        <span className={`${block}__time ${block}__time--${modifier}`}>
          {time[0]}
        </span>
        <span className={`${block}__city ${block}__city--${modifier}`}>
          {city[0]}
        </span>
        <span className={`${block}__station ${block}__station--${modifier}`}>
          {station[0]}
        </span>
      </div>
      <span className={`${block}__duration ${block}__duration--${modifier}`}>
        {block === "ticket-info"
          ? timeDifference(time[0], time[1])
          : timeDifference(time[0], time[1], true)}
      </span>
      <div className={`${block}-container ${block}-container--${modifier}`}>
        <span className={`${block}__time ${block}__time--${modifier}`}>
          {time[1]}
        </span>
        <span className={`${block}__city ${block}__city--${modifier}`}>
          {city[1]}
        </span>
        <span className={`${block}__station ${block}__station--${modifier}`}>
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
