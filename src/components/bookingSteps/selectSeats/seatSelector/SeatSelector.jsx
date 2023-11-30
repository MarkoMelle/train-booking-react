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
import { setSelectSeats } from "../../../../redux/features/seatsSlice";
import { addSeatsToWagons, classifySeats } from "../../../../utils";
import { sitting, platzcart, coupe, lux } from "./wagonType/iconsSvg";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getAvailableWagonTypes = (wagons) => {
  const availableTypes = new Set();
  wagons.forEach((wagon) => {
    availableTypes.add(wagon.coach.class_type);
  });
  return Array.from(availableTypes);
};

const wagonTypes = [
  { type: "fourth", icon: sitting, title: "Сидячий" },
  { type: "third", icon: platzcart, title: "Плацкарт" },
  { type: "second", icon: coupe, title: "Купе" },
  { type: "first", icon: lux, title: "Люкс" },
];

export default function SeatSelector({
  direction = "departure",
  currentRoute,
  routeId,
  seatsInfo,
  setSeatsInfo,
  setSelectedSeats,
  resetRoute,
  selectedSeatsLocal,
  setSelectedSeatsLocal,
  passengerCounts,
  setPassengerCounts,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [activeType, setActiveType] = useState(null);
  const [activeWagonId, setActiveWagonId] = useState(null);
  const [filteredWagonTypes, setFilteredWagonTypes] = useState(wagonTypes);

  useEffect(() => {
    setTotalPrice(0);
    setSelectedSeatsLocal([]);
  }, [activeType, activeWagonId]);

  const initialServicesState = {
    wifi: false,
    linens: false,
  };
  const [services, setServices] = useState(initialServicesState);

  const updateService = (serviceName, value) => {
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
    }),
    [
      searchResults.haveFirstClass,
      searchResults.haveSecondClass,
      searchResults.haveThirdClass,
      searchResults.haveFourthClass,
      searchResults.haveWifi,
      searchResults.haveAirConditioning,
    ]
  );

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true);
      try {
        const data = await apiClient.getSeatsInfo(routeId);
        dispatch(setSeatsInfo(data));
        const availableTypes = getAvailableWagonTypes(data);
        const firstAvailableType = availableTypes.length > 0 ? availableTypes[0] : null;
        setActiveType(firstAvailableType);
        const wagonsOfFirstType = data.filter(
          (wagon) => wagon.coach.class_type === firstAvailableType
        );
        setActiveWagonId(wagonsOfFirstType.length > 0 ? wagonsOfFirstType[0].coach._id : null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeats();
  }, [routeId, dispatch]);
  

  useEffect(() => {
    const filterWagons = () => {
      if (!Array.isArray(seatsInfo)) {
        return [];
      }
  
      return seatsInfo.filter((wagon) => {
        const classType = wagon.coach.class_type;

        const isClassSelected =
          seatsFilter.haveFirstClass ||
          seatsFilter.haveSecondClass ||
          seatsFilter.haveThirdClass ||
          seatsFilter.haveFourthClass;
        const classMatch =
          !isClassSelected ||
          (seatsFilter.haveFirstClass && classType === "first") ||
          (seatsFilter.haveSecondClass && classType === "second") ||
          (seatsFilter.haveThirdClass && classType === "third") ||
          (seatsFilter.haveFourthClass && classType === "fourth");

        const wifiMatch =
          !seatsFilter.haveWifi ||
          wagon.coach.have_wifi === seatsFilter.haveWifi;
        const airConditioningMatch =
          !seatsFilter.haveAirConditioning ||
          wagon.coach.have_air_conditioning === seatsFilter.haveAirConditioning;

        return classMatch && wifiMatch && airConditioningMatch;
      });
    };
    const newFilteredSeats = filterWagons();
    const addSeats = addSeatsToWagons(newFilteredSeats);
    const classifiedSeats = addSeats.map((wagon) => classifySeats(wagon));
    setFilteredSeats(classifiedSeats);
    const firstAvailableType = filteredWagonTypes[0] || wagonTypes[0];
    setActiveType(firstAvailableType);
    let wagonsOfFirstType = [];
   if (!Array.isArray(seatsInfo)) {
     wagonsOfFirstType = []
   } else {
     wagonsOfFirstType = seatsInfo.filter(
      (wagon) => wagon.coach.class_type === firstAvailableType.type
    );
    }
    setActiveWagonId(
      wagonsOfFirstType.length > 0 ? wagonsOfFirstType[0].coach._id : null
    );
    setFilteredWagonTypes(wagonTypes.filter((wagonType) =>
      getAvailableWagonTypes(newFilteredSeats).includes(wagonType.type)
    ));
  }, [seatsInfo, seatsFilter]);


  const changePrice = (price, type) => {
    
    if (typeof price !== "number") {
      console.error("Ошибка: price должно быть числом");
      return;
    }

    if (type !== "add" && type !== "remove") {
      console.error(
        "Ошибка: неверный тип операции (должно быть 'add' или 'remove')"
      );
      return;
    }

    let newTotalPrice =
      type === "add" ? totalPrice + price : totalPrice - price;
    if (newTotalPrice < 0) {
      console.error("Ошибка: итоговая сумма не может быть меньше 0");
      newTotalPrice = 0;
    }
    setTotalPrice(newTotalPrice);
  };

  const prevAdults = usePrevious(passengerCounts.adults);
  const prevChildren = usePrevious(passengerCounts.children);

  useEffect(() => {
    const difference = (prev, current) => prev - current;
    handleSeatsChange("adult", difference(prevAdults, passengerCounts.adults));
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      infants: Math.min(prevCounts.infants, prevCounts.adults),
    }));
  }, [passengerCounts.adults,  prevAdults]);

  useEffect(() => {
    const difference = (prev, current) => prev - current;
    handleSeatsChange("child", difference(prevChildren, passengerCounts.children));
  }, [passengerCounts.children, prevChildren]);

  const handleAdultsChange = (e, value) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      adults: value,
      infants: Math.min(prevCounts.infants, value), 
    }));
  };

  const handleChildrenChange = (e, value) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      children: value,
    }));
  };

  const handleInfantsChange = (e, value) => {
    const maxInfants = passengerCounts.adults;
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      infants: value > maxInfants ? maxInfants : value,
    }));
  };
  

  const determineSeatType = () => {
    let adultSeats = selectedSeatsLocal.filter(
      (seat) => seat.type === "adult"
    ).length;
    let childSeats = selectedSeatsLocal.filter(
      (seat) => seat.type === "child"
    ).length;

    if (adultSeats < passengerCounts.adults) {
      return "adult";
    } else if (childSeats < passengerCounts.children) {
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
          console.log(newSelectedSeats);
          const priceOfSeatToRemove = newSelectedSeats[indexToRemove].price;
          newSelectedSeats.splice(indexToRemove, 1);
          changePrice(priceOfSeatToRemove, "remove");
          count--;
        }
      }
      setSelectedSeatsLocal(newSelectedSeats);
    }
  };
  
  const handleSelectSeat = (seatNumber, wagonId, price) => {
    let type = determineSeatType();
    const isSeatAlreadySelected = selectedSeatsLocal.some(
      (seat) => seat.seatNumber === seatNumber && seat.wagonId === wagonId
    );
  
    if (type && !isSeatAlreadySelected) {
      const resultPrice = type === "child" ? Math.round(price / 2) : price;
      const newSeat = { seatNumber, type, wagonId, resultPrice, infant: false };
  
      if (type === "adult") {
        const infantCount = passengerCounts.infants - selectedSeatsLocal.filter(seat => seat.infant).length;
        if (infantCount > 0) {
          newSeat.infant = true;
        }
      }
  
      setSelectedSeatsLocal([...selectedSeatsLocal, newSeat]);
      changePrice(resultPrice, "add");
    }
  };
  
  const handleDeselectSeat = (seatNumber, wagonId, price) => {
    const seatToDeselect = selectedSeatsLocal.find(
      (seat) => seat.seatNumber === seatNumber && seat.wagonId === wagonId
    );
  
    if (seatToDeselect) {
      if (seatToDeselect.type === "adult" && seatToDeselect.infant) {
        seatToDeselect.infant = false;
      }
  
      setSelectedSeatsLocal(
        selectedSeatsLocal.filter(
          (seat) => !(seat.seatNumber === seatNumber && seat.wagonId === wagonId)
        )
      );
      changePrice(seatToDeselect.type === "child" ? Math.round(price / 2) : price, "remove");
    }
  };
  
  

  const handleBack = () => {
    dispatch(resetRoute());
    dispatch(setSelectSeats(false));
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
              value={passengerCounts.adults}
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
              value={passengerCounts.children}
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
              value={passengerCounts.infants}
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
        changePrice={changePrice}
        activeType={activeType}
        setActiveType={setActiveType}
        activeWagonId={activeWagonId}
        setActiveWagonId={setActiveWagonId}
        filteredWagonTypes={filteredWagonTypes}
      />
      <div className="seat-selector__sum">
        <span className="seat-selector__sum-text">Итого:</span>
        <span className="seat-selector__sum-count">{totalPrice}</span>
        <span className="seat-selector__sum-currency">{currency}</span>
      </div>
    </div>
  );
}
