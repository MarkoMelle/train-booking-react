import PropTypes from "prop-types";
import arrowBig from "../../../../assets/icons/arrow-seat-big.svg";
import TimeInfo from "../../timeInfo/TimeInfo";
import WagonTypes from "./wagonType/WagonTypes";
import SelectSeatComponent from "./selectSeatComponent/SelectSeatComponent";
import { currency } from "./wagonType/iconsSvg";
import "./SeatSelector.css";
import { apiClient } from "../../../../api/apiClient";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import { toggleSelectSeats } from "../../../../redux/features/seatsSlice";
import { addSeatsToWagons , classifySeats} from "../../../../utils";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function SeatSelector({
  direction = "departure",
  currentRoute,
  routeId,
  seatsInfo,
  selectedSeats,
  setSeatsInfo,
  setSelectedSeats,
  resetRoute,
}) {
  console.log("seatsInfo", seatsInfo);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedSeatsLocal, setSelectedSeatsLocal] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredSeats, setFilteredSeats] = useState([]);

  const initialServicesState = {
    wifi: false,
    linens: false,
  };
  const [services, setServices] = useState(initialServicesState);

  const updateService = (serviceName, value) => {
    console.log(serviceName, value);
    setServices((prevServices) => ({
      ...prevServices,
      [serviceName]: value,
    }));
  };

  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.searchResults);

  const seatsFilter = useMemo(
    () => ({
      haveFirstClass: searchResults.haveFirstClass,
      haveSecondClass: searchResults.haveSecondClass,
      haveThirdClass: searchResults.haveThirdClass,
      haveFourthClass: searchResults.haveFourthClass,
      haveWifi: searchResults.haveWifi,
      haveAirConditioning: searchResults.haveAirConditioning,
      // isExpress: searchResults.isExpress,
    }),
    [
      searchResults.haveFirstClass,
      searchResults.haveSecondClass,
      searchResults.haveThirdClass,
      searchResults.haveFourthClass,
      searchResults.haveWifi,
      searchResults.haveAirConditioning,
      searchResults.isExpress,
    ]
  );

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true);
      try {
        const data = await apiClient.getSeatsInfo(routeId);
        dispatch(setSeatsInfo(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeats();
  }, [routeId]);

  useEffect(() => {
    const filterWagons = () => {
      if (!Array.isArray(seatsInfo)) {
        return [];
      }
  
      return seatsInfo.filter(wagon => {
        const classType = wagon.coach.class_type;
  
        const isClassSelected = seatsFilter.haveFirstClass || seatsFilter.haveSecondClass || seatsFilter.haveThirdClass || seatsFilter.haveFourthClass;
        const classMatch = !isClassSelected || 
          (seatsFilter.haveFirstClass && classType === "first") ||
          (seatsFilter.haveSecondClass && classType === "second") ||
          (seatsFilter.haveThirdClass && classType === "third") ||
          (seatsFilter.haveFourthClass && classType === "fourth");
  
        const wifiMatch = !seatsFilter.haveWifi || wagon.coach.have_wifi === seatsFilter.haveWifi;
        const airConditioningMatch = !seatsFilter.haveAirConditioning || wagon.coach.have_air_conditioning === seatsFilter.haveAirConditioning;
  
        return classMatch && wifiMatch && airConditioningMatch;
      });
    };
  
    const newFilteredSeats = filterWagons();
    const addSeats = addSeatsToWagons(newFilteredSeats);
    const classifiedSeats = addSeats.map((wagon) => classifySeats(wagon));
    console.log("classifySeats", classifiedSeats);
    setFilteredSeats(classifiedSeats);
  }, [seatsInfo, seatsFilter]);
  
  

  const prevAdults = usePrevious(adults);
  const prevChildren = usePrevious(children);

  useEffect(() => {
    const difference = (prev, current) => prev - current;
    handleSeatsChange("adult", difference(prevAdults, adults));
  }, [adults, selectedSeatsLocal, prevAdults]);

  useEffect(() => {
    const difference = (prev, current) => prev - current;
    handleSeatsChange("child", difference(prevChildren, children));
  }, [children, selectedSeatsLocal, prevChildren]);

  const handleAdultsChange = (e, value) => {
    setAdults(value);
  };

  const handleChildrenChange = (e, value) => {
    setChildren(value);
  };

  const handleInfantsChange = (e, value) => {
    setInfants(value);
  };

  const determineSeatType = () => {
    let adultSeats = selectedSeatsLocal.filter(
      (seat) => seat.type === "adult"
    ).length;
    let childSeats = selectedSeatsLocal.filter(
      (seat) => seat.type === "child"
    ).length;

    if (adultSeats < adults) {
      return "adult";
    } else if (childSeats < children) {
      return "child";
    }
  };

  const handleSeatsChange = (type, count) => {
    if (count > 0) {
      let newSelectedSeats = [...selectedSeatsLocal];
      while (count > 0 && newSelectedSeats.some((seat) => seat.type === type)) {
        const indexToRemove = newSelectedSeats
          .map((seat) => seat.type)
          .lastIndexOf(type);
        if (indexToRemove !== -1) {
          newSelectedSeats.splice(indexToRemove, 1);
          count--;
        }
      }
      setSelectedSeatsLocal(newSelectedSeats);
    }
  };

  const handleSelectSeat = (seatNumber, wagonId) => {
    let type = determineSeatType();
    if (
      type &&
      !selectedSeatsLocal.some(
        (seat) => seat.seatNumber === seatNumber && seat.wagonId === wagonId
      )
    ) {
      setSelectedSeatsLocal([
        ...selectedSeatsLocal,
        { seatNumber, type, wagonId },
      ]);
    }
  };

  const handleDeselectSeat = (seatNumber, wagonId) => {
    setSelectedSeatsLocal(
      selectedSeatsLocal.filter(
        (seat) => !(seat.seatNumber === seatNumber && seat.wagonId === wagonId)
      )
    );
  };

  const handleSubmit = () => {
    if (selectedSeatsLocal.length === adults + children) {
      dispatch(setSelectedSeats(selectedSeatsLocal));
    } else {
      console.log("Не все места выбраны");
    }
  };

  const handleBack = () => {
    dispatch(resetRoute());
    dispatch(toggleSelectSeats());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-steps__container seat-selector">
      <div
        className={`seat-selector__header seat-selector__header--${direction}`}
      >
        <img
          className={`seat-selector__arrow seat-selector__arrow--${direction}`}
          src={arrowBig}
          alt="arrow"
        />
        <button
          className="seat-selector__btn
        secondary-btn
        "
          onClick={handleBack}
        >
          Выбрать другой поезд
        </button>
      </div>
      <div className="seat-selector__info">
        <div className="seat-selector__info-train">
          <div className="info-train__number">
            {currentRoute.train.name.includes("undefined")
              ? currentRoute.train.name.replace("undefined", "Поезд")
              : currentRoute.train.name}
          </div>
          <span className="info-train__direction">
            {currentRoute.from.city.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
            >
              <path
                d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="info-train__direction">
            {currentRoute.to.city.name}
          </span>
        </div>
        <TimeInfo
          modifier={direction}
          duration={currentRoute.duration}
          time={
            direction === "departure"
              ? [currentRoute.from.datetime, currentRoute.to.datetime]
              : [currentRoute.to.datetime, currentRoute.from.datetime]
          }
          city={
            direction === "departure"
              ? [currentRoute.from.city.name, currentRoute.to.city.name]
              : [currentRoute.to.city.name, currentRoute.from.city.name]
          }
          station={
            direction === "departure"
              ? [
                  currentRoute.from.railway_station_name,
                  currentRoute.to.railway_station_name,
                ]
              : [
                  currentRoute.to.railway_station_name,
                  currentRoute.from.railway_station_name,
                ]
          }
          block="seat-selector__info"
        />
      </div>
      <div className="seat-selector__quantity">
        <h3 className="seat-selector__quantity-title">Количество билетов</h3>
        <div className="seat-selector__quantity-container">
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              onChange={handleAdultsChange}
              option={[
                { label: "Взрослых — 0", value: 0 },
                { label: "Взрослых — 1", value: 1 },
                { label: "Взрослых — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 пассажира
            </p>
          </div>
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              onChange={handleChildrenChange}
              option={[
                { label: "Детских — 0", value: 0 },
                { label: "Детских — 1", value: 1 },
                { label: "Детских — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
              взрослых, но дешевле в среднем на 50-65%
            </p>
          </div>
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              onChange={handleInfantsChange}
              option={[
                { label: "Детских «без места» — 0", value: 0 },
                { label: "Детских «без места» — 1", value: 1 },
                { label: "Детских «без места» — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 младенца до 2 лет. Без места. Скидка 100%
            </p>
          </div>
        </div>
      </div>
      <WagonTypes
        currentTrip={currentRoute}
        seatsInfo={filteredSeats}
        seatsFilter={seatsFilter}
        handleSelectSeat={handleSelectSeat}
        handleDeselectSeat={handleDeselectSeat}
        selectedSeats={selectedSeatsLocal}
        services={services}
        updateService={updateService}
      />
      <div className="seat-selector__sum">
        <span className="seat-selector__sum-text">Итого:</span>
        <span className="seat-selector__sum-count">{totalPrice}</span>
        <span className="seat-selector__sum-currency">{currency}</span>
      </div>
    </div>
  );
}

[
  {
    coach: {
      _id: "641037ec5c49ea004632f116",
      name: "КЛССЖ-47",
      class_type: "third",
      have_wifi: true,
      have_air_conditioning: true,
      price: 0,
      top_price: 4510,
      bottom_price: 4155,
      side_price: 4420,
      linens_price: 77,
      wifi_price: 299,
      is_linens_included: false,
      available_seats: 40,
      train: "641037f05c49ea004632f801",
    },
    seats: [
      {
        index: 1,
        available: true,
      },
      {
        index: 2,
        available: true,
      },
    ],
  },
  {
    coach: {
      _id: "641037ec5c49ea004632f117",
      name: "ЙОЕ-74",
      class_type: "first",
      have_wifi: true,
      have_air_conditioning: true,
      price: 3065,
      top_price: 3870,
      bottom_price: 4915,
      side_price: 0,
      linens_price: 107,
      wifi_price: 230,
      is_linens_included: true,
      available_seats: 10,
      train: "641037f05c49ea004632f801",
    },
    seats: [
      {
        index: 1,
        available: true,
      },
      {
        index: 2,
        available: true,
      },
    ],
  },
  {
    coach: {
      _id: "641037ec5c49ea004632f118",
      name: "ЖНЕЙ-13",
      class_type: "fourth",
      have_wifi: false,
      have_air_conditioning: false,
      price: 0,
      top_price: 854,
      bottom_price: 591,
      side_price: 0,
      linens_price: 0,
      wifi_price: 195,
      is_linens_included: false,
      available_seats: 54,
      train: "641037f05c49ea004632f801",
    },
    seats: [
      {
        index: 1,
        available: true,
      },
      {
        index: 2,
        available: true,
      },
    ],
  },
  {
    coach: {
      _id: "641037ec5c49ea004632f119",
      name: "БРАВ-95",
      class_type: "second",
      have_wifi: false,
      have_air_conditioning: false,
      price: 0,
      top_price: 2502,
      bottom_price: 2493,
      side_price: 0,
      linens_price: 198,
      wifi_price: 210,
      is_linens_included: true,
      available_seats: 24,
      train: "641037f05c49ea004632f801",
    },
    seats: [
      {
        index: 1,
        available: true,
      },
      {
        index: 2,
        available: true,
      },
    ],
  },
];
