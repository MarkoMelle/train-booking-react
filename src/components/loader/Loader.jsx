import loadingGift from "../../assets/animation.gif";
import "./Loader.css";
import PropTypes from "prop-types";

export default function Loader({ isTicketsLoading = false }) {
  if (isTicketsLoading) {
    return (
      <div className="loadingio-spinner-double-ring-w2fh93lf2h">
        <div className="ldio-09h2cf3h28gf">
          <div></div>
          <div></div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="loader wrapper">
      <p className="loader__text">Идет поиск</p>
      <img className="loader__img" src={loadingGift} alt="loading" />
    </div>
  );
}

Loader.propTypes = {
  isTicketsLoading: PropTypes.bool,
};
