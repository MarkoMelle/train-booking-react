import "./ProgressBar.css";
import PropTypes from "prop-types";

export default function ProgressBar({ activeStep, setActiveStep }) {
  const steps = ["Билеты", "Пассажиры", "Оплата", "Проверка"];

  return (
    <div className="progress-bar wrapper" id="progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-bar__item ${
            index + 1 === activeStep ? "progress-bar__item--active" : ""
          } ${index + 1 < activeStep ? "progress-bar__item--completed" : ""}`}
          // onClick={() => setActiveStep(index + 1)}
          onClick={() => {
            if (index + 1 < activeStep) {
              setActiveStep(index + 1);
            }
          }
          }
        >
          <span className="progress-bar__item-number">{index + 1}</span>
          <span className="progress-bar__item-text">{step}</span>
          {index !== steps.length - 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 99"
              fill="currentColor"
              className="progress-bar__item-line"
            >
              <path
                d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
                stroke="#e5e5e5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

ProgressBar.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
