import React, { useState, useEffect } from "react";
import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

function CheckoutForm({ stripe, elements }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { planId } = location.search
    ? Object.fromEntries(new URLSearchParams(location.search))
    : {};

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [trainerId, setTrainer] = useState("");
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [subscriptionError, setSubscriptionError] = useState(false);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getplanbyid/${planId}`);
        const { name, price, user_id, duration } = response.data;

        setName(name);
        setPrice(price);
        setTrainer(user_id);
        setDuration(duration);
      } catch (error) {
        console.error("Error fetching plan details:", error);
        // Handle the error appropriately
      }
    };

    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

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
      setSubscriptionError(false); // Clear subscription error
    } else {
      // Continue with the rest of your code
      setErrorMessage(""); // Clear any previous error message

      // Handle amount
      if (paymentMethod) {
        const { id } = paymentMethod;

        // Pass the price to the backend
        try {
          const response = await axios.post("http://localhost:8080/payment", {
            amount: price * 100, // Assuming price is in dollars, convert to cents
            id,
            plan_id: planId,
            trainer_id: trainerId,
            months: duration, 
          });
          // console.log("response",response);
          if (response.data.success) {
            setSuccessMessage("Payment successful!"); // Set success message

            // Redirect to the home page after successful payment
            navigate('/'); // You can replace '/' with the actual home page path
          } else {
            if (response.data.message === "User already has an active subscription") {
              setSubscriptionError(true); // Set subscription error
            } else {
              console.log("Payment failed:", response.data.message);
              // Handle other failure cases appropriately
            }
          }
        } catch (error) {
          console.error("Error during payment:", error);
          setErrorMessage("An error occurred during payment. Please try again.");
          setSuccessMessage("");
          setSubscriptionError(false);
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
        <h3 className="product-title text-center">{`Plan : ${name}`}</h3>
        <h4 className="product-price text-center">{`Price : $${price}`}</h4>
      </div>
     
      <form onSubmit={handleSubmit}>
        <CardSection />
        <div className="flex justify-center">
        <button
  className="btn-pay p-3 h-8 bg-gradient-to-r bg-red-700 text-white rounded-xl hover:bg-black transition-all duration-300 my-4 mt-12 flex items-center justify-center"
>
  Buy Now
</button>

        </div>
      </form>
   
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
      {subscriptionError && (
        <div className="popup-message">
          User already has an active subscription. Please check your subscription status.
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;