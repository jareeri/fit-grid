import React, { useState } from "react";
import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

function CheckoutForm({ stripe, elements }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price } = location.search
    ? Object.fromEntries(new URLSearchParams(location.search))
    : {};

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate the form fields
    if (!validateForm()) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(""); // Clear success message if there was an error
    } else {
      // Continue with the rest of your code
      setErrorMessage(""); // Clear any previous error message

      // Handle amount
      if (paymentMethod) {
        const { id } = paymentMethod;

        // Pass the price to the backend
        const response = await axios.post("http://localhost:8080/payment", {
          amount: price * 100, // Assuming price is in dollars, convert to cents
          id,
        });

        if (response.data.success) {
          setSuccessMessage("Payment successful!"); // Set success message

          // Redirect to the home page after successful payment
          navigate('/'); // You can replace '/' with the actual home page path
        } else {
          console.log("Payment failed");
          // Handle failure appropriately
        }
      } else {
        console.log("Payment method is undefined");
        // Handle undefined paymentMethod
      }
    }
  };

  // Basic form validation function
  const validateForm = () => {
    // You can add more sophisticated validation as needed
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Please enter card information");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  return (
    <div>
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <h4 className="product-price">{`$${price}`}</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button className="btn-pay">Buy Now</button>
      </form>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
    </div>
  );
}

export default CheckoutForm;
