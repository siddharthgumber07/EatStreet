import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './verify.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("orderId");
      const success = searchParams.get("success");

      try {
        const res = await axios.post(`${url}/api/order/verify`, { orderId, success });
        navigate(res.data.success ? "/myorders" : "/");
      } catch {
        navigate("/");
      }
    };
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner" />
    </div>
  );
};

export default Verify;
