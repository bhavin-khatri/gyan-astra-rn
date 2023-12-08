import {StripeProvider} from '@stripe/stripe-react-native';
import {CheckOutPage} from './CheckOutPage';

export function Payment() {
  //secret key :- sk_test_51LwrSPSAVqByLrShuSgGTzZW4s9fATSBwlGph1PzKhySvG9SYAYrj8HcLkhClzKrkM5SNKHEh1RxY2oWLJInsQej00ppGKdcGD
  //publishableKey :- pk_test_51LwrSPSAVqByLrShxT1jdk9c8CPUbDW79MLodqzY11Gj7gRMVPRMRsx9omZcmRdd5SKaRHNjHFjREaXALaEyCQKf00eHMi72sg
  return (
    <StripeProvider
      publishableKey="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      {/*// Your app code here*/}
      <CheckOutPage />
    </StripeProvider>
  );
}
