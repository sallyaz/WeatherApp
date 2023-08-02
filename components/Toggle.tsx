import {StyleSheet, View} from 'react-native';
import {Switch} from 'react-native-switch';

import React, {useState} from 'react';

interface ToggleProps {
  isImperial: boolean;
  setIsImperial(newValue: boolean): void;
  getData(newValue: boolean): void;
}

const Toggle: React.FC<ToggleProps> = ({
  getData,
  isImperial,
  setIsImperial,
}) => {
  const toggleSwitch = () => {
    setIsImperial(!isImperial);
    getData(!isImperial);
  };
  return (
    <View style={{flexDirection: 'row-reverse', marginHorizontal: 10}}>
      <Switch
        activeText={'°F'}
        inActiveText={'°C'}
        onValueChange={toggleSwitch}
        value={isImperial}
      />
    </View>
  );
};

export default Toggle;
