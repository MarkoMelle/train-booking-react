import "./TicketsDetails.css";
import { useSelector } from "react-redux";
import TicketsDate from "./ticketsDate/TicketsDate";
import TicketsOptions from "./ticketsOptions/TicketsOptions";
import PriceSlider from "./priceSlider/PriceSlider";
import TimeSliders from "./timeSliders/TimeSliders";
import TicketDetails from "./ticketDetails/TicketDetails";
import PassengerDetails from "./passengerDetails/PassengerDetails";
import TotalPrice from "./totalPrice/TotalPrice";
import PropTypes from "prop-types";

export default function TicketsDetails({ activeStep }) {
  const { currentRoute, currentRouteBack } = useSelector(
    (state) => state.seats
  );
  const { passengersInfo } = useSelector((state) => state.seats);

  // const [passengersInfo, setPassengersInfo] = useState({
  //   passengers: {
  //     adult: 0,
  //     children: 0,
  //   },
  //   price: {
  //     adult: 0,
  //     children: 0,
  //   },
  //   totalPrice: 0,
  // });

  //   useEffect(() => {
  //     if (activeStep >= 2) {
  //       setPassengersInfo(calculateTicketInfo(selectedSeats));
  //     }
  //   }, [selectedSeats, activeStep]);

  return (
    <div className="tickets-details">
      {activeStep === 1 && (
        <>
          <TicketsDate />
          <TicketsOptions />
          <PriceSlider />
          <TimeSliders direction="departure" />
          <TimeSliders direction="arrival" />
        </>
      )}
      {activeStep >= 2 && currentRoute && (
        <>
          <h2 className="tickets-details__title">Детали поездки</h2>
          <TicketDetails direction="departure" currentRoute={currentRoute} />
          {currentRouteBack && (
            <TicketDetails
              direction="arrival"
              currentRoute={currentRouteBack}
            />
          )}
          <PassengerDetails passengersInfo={passengersInfo} />
          <TotalPrice passengersInfo={passengersInfo} />
        </>
      )}
    </div>
  );
}

TicketsDetails.propTypes = {
  activeStep: PropTypes.number.isRequired,
  currentTrip: PropTypes.object.isRequired,
};
