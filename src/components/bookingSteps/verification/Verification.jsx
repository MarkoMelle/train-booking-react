import "./Verification.css";
import { useNavigate } from "react-router-dom";
import Ticket from "../searchResults/ticketsList/ticket/Ticket";
import StateContext from "../../../StateContext";
import PassengerList from "./passengerList/PassengerList";
import { useContext } from "react";

export default function Verification() {
  // eslint-disable-next-line no-unused-vars
  const { state, setState } = useContext(StateContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/success");
  };

  return (
    <div className="verification">
      <div className="booking-steps__container verification__ticket">
        <div className="verification__header">
          <h2 className="verification__title">Поезд</h2>
        </div>
        <Ticket ticket={state.currentTrip} isVerification={true} />
      </div>
      <PassengerList />
      <div className="booking-steps__container verification__payment">
        <div className="verification__header">
          <h2 className="verification__title">Способ оплаты</h2>
        </div>
        <div className="verification__payment-container">
          <p className="verification__payment-method">Наличными</p>
          <div className="verification__aside">
            <button className="secondary-btn verification__payment-btn">
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
