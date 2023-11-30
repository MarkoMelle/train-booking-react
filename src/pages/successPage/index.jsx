import { useEffect } from "react";
import Header from "../../components/header/Header";
import OrderSuccess from "../../components/orderSuccess/OrderSuccess";
import { useNavigate, useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.totalPrice;

  useEffect(() => {
    if (!data) {
      console.log(data);
      navigate("/404");
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  return (
    <>
      <Header />
      <OrderSuccess totalPrice={data} />
    </>
  );
}
