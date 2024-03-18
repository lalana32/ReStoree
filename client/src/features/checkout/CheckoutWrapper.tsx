import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch } from '../../app/store/configureStore';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { setBasket } from '../basket/basketSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';

const stripePromise = loadStripe(
  'pk_test_51Oai03HeyRGeqtkZNpvo8Av6jgUUmUzNsmt6JzXlcuV87Vw1Psx8MxuHdezNVFKKr42kacbvpA30YVsvPR1re0CE00730Y3GZx'
);

const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentsIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message='Loading checkout...' />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
