import PropTypes from "prop-types";

export default function NameForm({
  lastName,
  firstName,
  middleName,
  setLastName,
  setFirstName,
  setMiddleName,
}) {
  return (
    <div className="passenger-card__name">
      <label className="passenger-card__label">
        Фамилия:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label className="passenger-card__label">
        Имя:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label className="passenger-card__label">
        Отчество:
        <input
          className="booking-steps__input
                passenger-card__input"
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </label>
    </div>
  );
}

NameForm.propTypes = {
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setMiddleName: PropTypes.func.isRequired,
};
