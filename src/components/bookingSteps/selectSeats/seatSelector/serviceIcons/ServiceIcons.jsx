import PropTypes from "prop-types";
import { climate, wifi, linen } from "./icons";

export default function ServiceIcons({
  wagon,
  services,
  updateService,
  changePrice,
}) {
  return (
    <ul className="seat-selector__options-list">
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.have_air_conditioning ? "selected--disabled" : "disabled"
        }`}
      >
        {climate}
      </li>
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.have_wifi
            ? services.wifi
              ? "selected"
              : "not-selected"
            : "disabled"
        }`}
        onClick={
          wagon.have_wifi
            ? () => {
                changePrice(
                  wagon.wifi_price,
                  !services.wifi ? "add" : "remove"
                );
                updateService("wifi", !services.wifi);
              }
            : null
        }
      >
        {wifi}
      </li>
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.is_linens_included
            ? "selected--disabled"
            : services.linens
            ? "selected"
            : "not-selected"
        }`}
        onClick={
          !wagon.is_linens_included
            ? () => {
                changePrice(
                  wagon.linens_price,
                  !services.linens ? "add" : "remove"
                );
                updateService("linens", !services.linens);
              }
            : null
        }
      >
        {linen}
      </li>
      {/* {type === "drinks" && drinks} */}
    </ul>
  );
}

ServiceIcons.propTypes = {
  wagon: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
  updateService: PropTypes.func.isRequired,
  changePrice: PropTypes.func.isRequired,
};
