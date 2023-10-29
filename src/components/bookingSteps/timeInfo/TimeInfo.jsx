import { timeDifference } from "../../../utils";
import PropTypes from "prop-types";

export default function TimeInfo({
  time,
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
          {time[0]}
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
          {station[0]}
        </span>
      </div>
      <span className={`${block}__duration ${block}__duration--${modifier}`}>
        {block === "seat-selector__info"
          ? timeDifference(time[0], time[1], true)
          : timeDifference(time[0], time[1])}
      </span>
      <div className={`${block}-container ${block}-container--right`}>
        <span className={`${block}__time ${block}__time--${modifier}`}>
          {time[1]}
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
  block: PropTypes.string,
  date: PropTypes.object,
};
