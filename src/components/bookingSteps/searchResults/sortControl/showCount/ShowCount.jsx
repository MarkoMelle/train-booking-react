import PropTypes from "prop-types";

export default function ShowCount({ showCount, setShowCount }) {
  return (
    <div className="sort-control__show">
      показывать по:{" "}
      <button
        className={`show-count-btn ${
          showCount === 5 ? "show-count-btn--active" : ""
        }`}
        onClick={() => setShowCount(5)}
      >
        5
      </button>
      <button
        className={`show-count-btn ${
          showCount === 10 ? "show-count-btn--active" : ""
        }`}
        onClick={() => setShowCount(10)}
      >
        10
      </button>
      <button
        className={`show-count-btn ${
          showCount === 20 ? "show-count-btn--active" : ""
        }`}
        onClick={() => setShowCount(20)}
      >
        20
      </button>
    </div>
  );
}

ShowCount.propTypes = {
  showCount: PropTypes.number.isRequired,
  setShowCount: PropTypes.func.isRequired,
};
