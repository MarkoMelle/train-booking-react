import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    if (pageNumbers.length <= 4) return pageNumbers;

    const startPage = 1;
    const endPage = pageNumbers.length;

    if (currentPage <= 3) {
      return [1, 2, 3, "...", endPage];
    } else if (currentPage >= pageNumbers.length - 2) {
      return [startPage, "...", endPage - 2, endPage - 1, endPage];
    } else {
      return [
        startPage,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        endPage,
      ];
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={handlePrevious} className="page-link">
            {arrowSvg}
          </a>
        </li>
        {renderPageNumbers().map((number, idx) => (
          <li
            key={idx}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            {number === "..." ? (
              <span className="page-link dots">{number}</span>
            ) : (
              <a onClick={() => onPageChange(number)} className="page-link">
                {number}
              </a>
            )}
          </li>
        ))}
        <li className="page-item">
          <a onClick={handleNext} className="page-link page-link--next">
            {arrowSvg}
          </a>
        </li>
      </ul>
    </nav>
  );
}

const arrowSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="29"
    viewBox="0 0 18 29"
    fill="none"
  >
    <path
      d="M6.33625 14.5C9.82076 11.0945 13.1201 7.89424 16.3731 4.72332C17.2669 3.85207 17.1987 2.34671 16.3094 1.47083C15.4416 0.616038 14.1195 0.686134 13.2516 1.54092C9.06317 5.66637 4.86165 9.80466 0.72327 13.8808C0.325571 14.2725 0.325472 14.9137 0.723293 15.3053C4.70972 19.2293 8.86225 23.2984 12.9949 27.3844C13.8955 28.2748 15.2685 28.3485 16.1445 27.4338C16.9987 26.5419 17.0517 25.0479 16.1744 24.1785C13.0758 21.1078 9.80952 17.8945 6.33625 14.5Z"
      fill="currentColor"
    />
  </svg>
);

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;


