import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      userId: localStorage.getItem("userId"),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { redirectUrl } = response.data;
        window.location.replace(redirectUrl);
      } else {
        alert("Order failed: " + (response.data.message || "An error occurred while placing your order."));
      }
    } catch (error) {
      console.error("Order error:", error);

      const redirectUrl = error?.response?.data?.redirectUrl;
      const message = error?.response?.data?.message || error.message || "Unknown error occurred.";

      if (redirectUrl) {
        window.location.replace(redirectUrl);
      } else {
        alert("Order failed: " + message);
      }
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name'/>
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last Name'/>
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} placeholder='Email' />
        <input required name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} placeholder='City'/>
          <input required name='state' value={data.state} onChange={onChangeHandler} placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zip Code'/>
          <input required name='country' value={data.country} onChange={onChangeHandler} placeholder='Country'/>
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
