import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../../../redux/features/notificationsSlice";

export default function NameForm({
  firstName,
  lastName,
  patronymic,
  setLastName,
  setFirstName,
  setPatronymic,
}) {
  const dispatch = useDispatch();

  const handleInputChange = (value, setValue) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setValue(capitalizedValue);
    } else {
      dispatch(
        showSnackBar({
          message: "Используйте только латинские буквы",
          type: "info",
        })
      );
    }
  };

  return (
    <div className="passenger-card__name">
      <label className="passenger-card__label">
        Фамилия:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={lastName}
          onChange={(e) => handleInputChange(e.target.value, setLastName)}
        />
      </label>
      <label className="passenger-card__label">
        Имя:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={firstName}
          onChange={(e) => handleInputChange(e.target.value, setFirstName)}
        />
      </label>
      <label className="passenger-card__label">
        Отчество:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={patronymic}
          onChange={(e) => handleInputChange(e.target.value, setPatronymic)}
        />
      </label>
    </div>
  );
}

NameForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setPatronymic: PropTypes.func.isRequired,
};
