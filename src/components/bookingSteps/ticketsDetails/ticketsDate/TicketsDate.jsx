import DataPickerComponent from "../../../dataPicker/DataPickerComponent";
import "./TicketsDate.css";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/features/searchResultsSlice";
import { stringifyDate } from "../../../../utils";

export default function TicketsDate() {
  const { dateStartArrival: departureString, dateEndArrival: returnString } =
    useSelector((state) => state.searchResults);
  const departureDate = departureString ? new Date(departureString) : "";
  const returnDate = returnString ? new Date(returnString) : "";

  const dispatch = useDispatch();

  const setDepartureDate = (date) => {
    dispatch(
      setFilter({
        dateStartArrival: stringifyDate(date),
      })
    );
  };

  const setReturnDate = (date) => {
    dispatch(
      setFilter({
        dateEndArrival: stringifyDate(date),
      })
    );
  };

  return (
    <div className="tickets-details__dates">
      <div className="tickets-details__date">
        <h3 className="tickets-details__date-title">Дата поездки</h3>
        <DataPickerComponent
          date={departureDate}
          setDate={setDepartureDate}
          block="tickets-details"
          minDate={new Date()}
        />
      </div>
      <div className="tickets-details__date">
        <h3 className="tickets-details__date-title">Дата возвращения</h3>
        <DataPickerComponent
          date={returnDate}
          setDate={setReturnDate}
          block="tickets-details"
          minDate={departureDate || new Date()}
        />
      </div>
    </div>
  );
}
