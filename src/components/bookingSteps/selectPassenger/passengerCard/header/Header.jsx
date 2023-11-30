import { plusCircleIcon, minusCircleIcon } from "../iconSvg";
import PropTypes from "prop-types";

export default function Header({ isOpened, handleToggleOpen, number }) {
  return (
    <div
      className={`passenger-card__header ${
        !isOpened ? "passenger-card__header--closed" : ""
      }`}
    >
      <button
        className={`passenger-card__toggle ${
          !isOpened ? "passenger-card__toggle--closed" : ""
        }`}
        type="button"
        onClick={handleToggleOpen}
      >
        {isOpened ? minusCircleIcon : plusCircleIcon}
      </button>
      <h3 className="passenger-card__title">Пассажир {`${number}`}</h3>
      {/* <button className="passenger-card__delete" type="button">
        {deleteIcon}
      </button> */}
    </div>
  );
}

Header.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};
