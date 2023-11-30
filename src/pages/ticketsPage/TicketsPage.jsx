/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/header/Header";
import BookingSteps from "../../components/bookingSteps/BookingSteps";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOrder } from "../../redux/features/orderSlice";
import { resetFilters } from "../../redux/features/searchResultsSlice";
import { resetSeats } from "../../redux/features/seatsSlice";

export default function TicketsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetState = () => {
    dispatch(resetOrder());
    dispatch(resetFilters());
    dispatch(resetSeats());
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [navigate, dispatch]);

  return (
    <>
      <Header />
      <BookingSteps />
    </>
  );
}
