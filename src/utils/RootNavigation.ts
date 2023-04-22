import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export const navigate = (name: string, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

export const push = (name: string, params?: any) => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

export const goBack = (name?: string) => {
  navigationRef.current?.goBack(name);
};

export const reset = (name: string) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: name}],
    }),
  );
};
