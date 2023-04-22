import {CardField, useStripe} from '@stripe/stripe-react-native';
import React, {Component} from 'react';
import {View} from 'react-native';

export function CheckOutPage() {
  const {confirmPayment} = useStripe();
  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </View>
  );
}
