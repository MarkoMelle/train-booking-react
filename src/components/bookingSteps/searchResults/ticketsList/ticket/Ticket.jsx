import TimeInfo from "../../../timeInfo/TimeInfo";
import SitClassInfo from "./sitClassInfo/SitClassInfo";
import PropTypes from "prop-types";
import { trainIconSvg } from "./trainIconSvg";
import "./Ticket.css";

export default function Ticket({
  ticket,
  handleSeatSelection,
  setCurrentTrip,
  handleTripChange,
  isVerification = false,
}) {
  return (
    <div
      className={isVerification ? "ticket" : "ticket booking-steps__container"}
    >
      <div className="ticket__train-info">
        <div className="ticket__train-info-icon">{trainIconSvg}</div>
        <div className="ticket__train-info__train-number">
          {ticket.departure.train.name.includes("undefined")
            ? ticket.departure.train.name.replace("undefined", "Поезд")
            : ticket.departure.train.name}
        </div>
        <span className="ticket__train-info__direction">
          {ticket.departure.from.city.name}
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
          {ticket.departure.to.city.name}
        </span>
      </div>
      <div className="ticket__body">
        <TimeInfo
          modifier="departure"
          time={[ticket.departure.from.datetime, ticket.departure.to.datetime]}
          duration={ticket.departure.duration}
          city={[
            ticket.departure.from.city.name,
            ticket.departure.to.city.name,
          ]}
          station={[
            ticket.departure.from.railway_station_name,
            ticket.departure.to.railway_station_name,
          ]}
        />
        {Object.prototype.hasOwnProperty.call(ticket, "arrival") ? (
          <TimeInfo
            modifier="arrival"
            time={[ticket.arrival.to.datetime, ticket.arrival.from.datetime]}
            duration={ticket.arrival.duration}
            city={[ticket.arrival.to.city.name, ticket.arrival.from.city.name]}
            station={[
              ticket.arrival.to.railway_station_name,
              ticket.arrival.from.railway_station_name,
            ]}
          />
        ) : null}
      </div>
      <div className="ticket__price-info">
        <SitClassInfo
          {...{
            handleSeatSelection,
            setCurrentTrip,
            ticket,
            isVerification,
            handleTripChange,
          }}
        />
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  handleSeatSelection: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
  isVerification: PropTypes.bool,
  handleTripChange: PropTypes.func,
};
