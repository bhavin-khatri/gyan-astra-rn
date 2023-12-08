import {Button, View} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';

export const PaymentRequest = () => {
  const fetchPaymentIntentClientSecret = async () => {
    const {confirmPayment, loading} = useConfirmPayment();
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    // if (!card) {
    //   return;
    // }

    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();
    console.log('clientSecret::::', clientSecret);
  };

  return (
    <View>
      <CardField
        onCardChange={cardDetails => console.log('cardDetails', cardDetails)}
      />
      // In the onPress handler, request a PaymentIntent from your server and
      store // its client secret
      <Button onPress={() => handlePayPress()} title="Pay" />
    </View>
  );
};
