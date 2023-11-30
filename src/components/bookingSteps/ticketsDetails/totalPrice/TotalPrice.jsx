import "./TotalPrice.css";
import PropTypes from "prop-types";

export default function TotalPrice({ passengersInfo }) {
  return (
    <div className="total-price">
      <div className="total-price__wrapper">
        <div className="total-price__title">Итого</div>
        <div className="total-price__price">{`${passengersInfo.totalPrice}`}</div>
      </div>
    </div>
  );
}

TotalPrice.propTypes = {
  passengersInfo: PropTypes.object.isRequired,
};
