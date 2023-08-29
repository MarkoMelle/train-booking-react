import TimeInfo from "./timeInfo/TimeInfo";
import SitClassInfo from "./sitClassInfo/SitClassInfo";
import PropTypes from "prop-types";
import { trainIconSvg } from "./trainIconSvg";
import "./Ticket.css";

export default function Ticket({ ticket, setIsSelectSeats }) {
  return (
    <div className="ticket">
      <div className="ticket__train-info">
        <div className="ticket__train-info-icon">{trainIconSvg}</div>
        <div className="ticket__train-info__train-number">
          {ticket.trainNumber}
        </div>
        <span className="ticket__train-info__direction">
          {ticket.direction[0]}&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
          >
            <path
              d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="ticket__train-info__direction">
          {ticket.direction[1]}
        </span>
      </div>
      <div className="ticket__body">
        <TimeInfo
          modifier="departure"
          time={ticket.departureTime}
          city={ticket.direction}
          station={ticket.departureStation}
        />
        <TimeInfo
          modifier="arrival"
          time={ticket.arrivalTime}
          city={ticket.direction}
          station={ticket.arrivalStation}
        />
      </div>
      <div className="ticket__price-info">
        <SitClassInfo sitClasses={ticket.sitClasses} {...{ setIsSelectSeats }} />
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  setIsSelectSeats: PropTypes.func.isRequired,
};
