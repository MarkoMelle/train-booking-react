import "./ProgressBar.css";

export default function ProgressBar() {
  return (
    <div className="progress-bar">
      <div className="progress-bar__item progress-bar__item--active">
        <span className="progress-bar__item-number">1</span>
        <span className="progress-bar__item-text">Билеты</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 99"
          fill="currentColor"
          className="progress-bar__item-line"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="progress-bar__item">
        <span className="progress-bar__item-number">2</span>
        <span className="progress-bar__item-text">Пассажиры</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 99"
          fill="currentColor"
          className="progress-bar__item-line"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="progress-bar__item">
        <span className="progress-bar__item-number">3</span>
        <span className="progress-bar__item-text">Оплата</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 99"
          fill="currentColor"
          className="progress-bar__item-line"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="progress-bar__item">
        <span className="progress-bar__item-number">4</span>
        <span className="progress-bar__item-text">Проверка</span>
      </div>
    </div>
  );
}
