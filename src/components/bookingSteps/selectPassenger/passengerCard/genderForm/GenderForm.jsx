import PropTypes from "prop-types";

export default function GenderForm({ gender, setGender, index }) {
  const maleId = `male-${index}`;
  const femaleId = `female-${index}`;
  return (
    <div className="passenger-card__gender">
      <label className="passenger-card__label passenger-card__label--gender">
        Пол
      </label>
      <div className="passenger-card__gender-radio">
        <input
          type="radio"
          name="gender"
          value="male"
          id={maleId}
          checked={gender === "male"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor={maleId} className="gender-label male-label">
          М
        </label>
        <input
          type="radio"
          name="gender"
          value="female"
          id={femaleId}
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor={femaleId} className="gender-label female-label">
          Ж
        </label>
      </div>
    </div>
  );
}

GenderForm.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
