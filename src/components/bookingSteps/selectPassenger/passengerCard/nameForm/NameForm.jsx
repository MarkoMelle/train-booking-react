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
          setValue(value);
        } else {
          dispatch(showSnackBar("Используйте только латинские буквы"));
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
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setMiddleName: PropTypes.func.isRequired,
};


// import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { showSnackBar } from "../../../../../redux/features/notificationsSlice";

// export default function NameForm({
//   lastName,
//   firstName,
//   middleName,
//   setLastName,
//   setFirstName,
//   setMiddleName,
// }) {
//   const dispatch = useDispatch();

//   const handleInputChange = (value, setValue) => {
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setValue(value);
//     } else {
//       dispatch(showSnackBar("Используйте только латинские буквы"));
//     }
//   };

//   return (
//     <div className="passenger-card__name">
//       {/* Остальной код */}
//       <input
//         type="text"
//         value={firstName}
//         onChange={(e) => handleInputChange(e.target.value, setFirstName)}
//       />
//       {/* Повторите для lastName и middleName */}
//     </div>
//   );
// }

// NameForm.propTypes = {
//   lastName: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   middleName: PropTypes.string.isRequired,
//   setLastName: PropTypes.func.isRequired,
//   setFirstName: PropTypes.func.isRequired,
//   setMiddleName: PropTypes.func.isRequired,
// };
