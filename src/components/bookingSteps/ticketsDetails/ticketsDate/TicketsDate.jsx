import DataPickerComponent from "../../../dataPicker/DataPickerComponent";
import "./TicketsDate.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  fetchRoutes,
  resetPagination,
} from "../../../../redux/features/searchResultsSlice";
import { stringifyDate } from "../../../../utils";
import { useCallback } from "react";
import { debounce } from "../../../../utils";

export default function TicketsDate() {
  const filters = useSelector((state) => state.searchResults);
  const { dateStartArrival: departureString, dateEndArrival: returnString } =
    useSelector((state) => state.searchResults);
  const departureDate = departureString ? new Date(departureString) : "";
  const returnDate = returnString ? new Date(returnString) : "";
  const dispatch = useDispatch();

  const debouncedFetchRoutes = useCallback(
    debounce((updatedFilters) => {
      dispatch(resetPagination());
      dispatch(fetchRoutes({ ...updatedFilters, offset: 0 }));
    }, 500),
    []
  );

  const setDepartureDate = (date) => {
    let newDate;
    if (date === null) {
      newDate = "";
      dispatch(
        setFilter({
          dateStartArrival: newDate,
        })
      );
    } else {
      newDate = stringifyDate(date);
      dispatch(
        setFilter({
          dateStartArrival: newDate,
        })
      );
    }
    debouncedFetchRoutes({
      ...filters,
      dateStartArrival: newDate,
    });
  };

  const setReturnDate = (date) => {
    let newDate;
    if (date === null) {
      newDate = "";
      dispatch(
        setFilter({
          dateEndArrival: newDate,
        })
      );
    } else {
      newDate = stringifyDate(date);
      dispatch(
        setFilter({
          dateEndArrival: newDate,
        })
      );
    }
    debouncedFetchRoutes({
      ...filters,
      dateEndArrival: newDate,
    });
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
