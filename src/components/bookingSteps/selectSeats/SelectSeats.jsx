import PropTypes from "prop-types";

export default function SelectSeats({ setActiveStep }) {
   console.log(setActiveStep);
  return (
    <div className="select-seats">
      <h2>Выбор мест</h2>
      <div className="select-seats__seats">
        <button className="seats__change-train-btn">
          Выбрать другой поезд
        </button>
        <div className="seats__ticket-info">Инфо о билете</div>
        <div className="seats__ticket-quantity">
          <h3 className="seats__ticket-quantity__title">Количество билетов</h3>
        </div>
         <div className="seats__scheme">Тип вагона</div>

      </div>
    </div>
  );
}

SelectSeats.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};
