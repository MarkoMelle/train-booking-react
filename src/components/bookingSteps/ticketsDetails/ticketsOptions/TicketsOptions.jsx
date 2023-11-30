import "./TicketsOptions.css";
import Switch from "@mui/base/Switch";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  fetchRoutes,
  resetPagination,
} from "../../../../redux/features/searchResultsSlice";

export default function TicketsOptions() {
  const filters = useSelector((state) => state.searchResults);
  const {
    haveFirstClass,
    haveSecondClass,
    haveThirdClass,
    haveFourthClass,
    haveWifi,
    isExpress,
  } = useSelector((state) => state.searchResults);
  const { isSelectSeats } = useSelector((state) => state.seats);

  const dispatch = useDispatch();

  const handleSwitchChange = (optionName, currentValue) => {
    dispatch(
      setFilter({
        [optionName]: !currentValue,
      })
    );
    if (!isSelectSeats) {
      const updatedFilters = {
        ...filters,
        [optionName]: !currentValue,
      };
      dispatch(resetPagination());
      dispatch(fetchRoutes({ ...updatedFilters, offset: 0 }));
    }
  };

  return (
    <ul className="options">
      <li className="option">
        <span className="option__text option__text--kupe">Купе</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={haveSecondClass}
          onChange={() =>
            handleSwitchChange("haveSecondClass", haveSecondClass)
          }
        />
      </li>
      <li className="option">
        <span className="option__text option__text--plackart">Плацкарт</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={haveThirdClass}
          onChange={() => handleSwitchChange("haveThirdClass", haveThirdClass)}
        />
      </li>
      <li className="option">
        <span className="option__text option__text--sitting">Сидячий</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={haveFourthClass}
          onChange={() =>
            handleSwitchChange("haveFourthClass", haveFourthClass)
          }
        />
      </li>
      <li className="option">
        <span className="option__text option__text--lux">Люкс</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={haveFirstClass}
          onChange={() => handleSwitchChange("haveFirstClass", haveFirstClass)}
        />
      </li>
      <li className="option">
        <span className="option__text option__text--wifi">Wi-Fi</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={haveWifi}
          onChange={() => handleSwitchChange("haveWifi", haveWifi)}
        />
      </li>
      <li className="option">
        <span className="option__text option__text--express">Экспресс</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
          checked={isExpress}
          onChange={() => handleSwitchChange("isExpress", isExpress)}
        />
      </li>
    </ul>
  );
}
