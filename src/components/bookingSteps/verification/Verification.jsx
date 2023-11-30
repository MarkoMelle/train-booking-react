import "./Verification.css";
import { useNavigate } from "react-router-dom";
import Ticket from "../searchResults/ticketsList/ticket/Ticket";
import PassengerList from "./passengerList/PassengerList";
import { useSelector, useDispatch } from "react-redux";
import {formatPassengerData} from "../../../utils";
import { apiClient } from "../../../api/apiClient";
import { showSnackBar } from "../../../redux/features/notificationsSlice";


export default function Verification(
  {setActiveStep, handleSeatSelection}
) {
  const dispatch = useDispatch();
  const {routeId, routeIdBack } = useSelector((state) => state.seats);
  const currentTrip = useSelector((state) => state.seats.currentTrip);
  const {user} = useSelector((state) => state.order);
  const passengers = useSelector((state) => state.order.passengers);
  const {orderPassengers} = useSelector((state) => state.order);
  const paymentMethod = useSelector((state) => state.order.user.payment_method);
  const {totalPrice} = useSelector((state) => state.seats.passengersInfo);

  const passengersData = passengers.map((passenger) => {
    return formatPassengerData(passenger);
  }
  );



  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const departure = {
      route_direction_id: routeId,
      seats: orderPassengers
    }
    let arrival = null;
    if (routeIdBack) {
      arrival = {
        route_direction_id: routeIdBack,
        seats: orderPassengers
      }
  }
  apiClient.orderSeats(user, departure, arrival ? arrival : null)
  .then(response => {
    navigate("/success");
  })
  .catch(error => {
    console.error("Ошибка при выполнении запроса: ", error);
    dispatch(showSnackBar({ message: "Ошибка при бронировании мест. Пожалуйста, попробуйте еще раз.", type: "error" }));
  });

    
  };

  const handleTripChange = () => {
    handleSeatSelection(false);
    setActiveStep(1);
  }

  const handlePassengerChange = () => {
    setActiveStep(2);
  }

  const handlePaymentChange = () => {
    setActiveStep(3);
  }

  return (
    <div className="verification">
      <div className="booking-steps__container verification__ticket">
        <div className="verification__header">
          <h2 className="verification__title">Поезд</h2>
        </div>
        <Ticket ticket={currentTrip} isVerification={true} handleTripChange={handleTripChange} setActiveStep={setActiveStep}/>
      </div>
      <PassengerList passengers={passengersData} totalPrice={totalPrice} handlePassengerChange={handlePassengerChange}/>
      <div className="booking-steps__container verification__payment">
        <div className="verification__header">
          <h2 className="verification__title">Способ оплаты</h2>
        </div>
        <div className="verification__payment-container">
          <p className="verification__payment-method">
            {paymentMethod === "cash" ? "Наличные" : "Онлайн"}
          </p>
          <div className="verification__aside">
            <button className="secondary-btn verification__payment-btn"
              onClick={handlePaymentChange}>
              Изменить
            </button>
          </div>
        </div>
      </div>
      <button
        className="primary-btn primary-btn--white verification__btn"
        onClick={handleSubmit}
      >
        Подтвердить
      </button>
    </div>
  );
}
