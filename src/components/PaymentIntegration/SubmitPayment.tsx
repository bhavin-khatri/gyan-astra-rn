import {BillingDetails, useConfirmPayment} from '@stripe/stripe-react-native';
import {View} from 'react-native';

export const SubmitPayment = () => {
  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails: BillingDetails = {
      email: 'jenny.rosen@example.com',
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  return <View />;
};
