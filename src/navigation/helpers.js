import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../config/colors';

export const defaultOptions = ({navigation, title}) => {
  return {
    headerLeft: () => (
      <View style={styles.left}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}>
          <Icon name={'arrow-left'} size={16} color={'#fff'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitleStyle]}>{title}</Text>
      </View>
    ),
    headerStyle: {
      borderBottomColor: '#fff',
      backgroundColor: colors.main,
      borderBottomWidth: 0,
    },
    title: '',
  };
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  left: {flexDirection: 'row', alignItems: 'center'},
  btnBack: {paddingHorizontal: 16, paddingVertical: 8},
  fs16: {fontSize: 16},
  colorWhite: {color: '#fff'},
});
