import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
const DefaultModalContent = props => (
  <View style={styles.content}>
    <View style={styles.modalHeader}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity style={styles.btnClose} onPress={props.onPress}>
        <Icon name="ios-close" size={35} color="#323232" />
      </TouchableOpacity>
    </View>

    {props.children}
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingVertical: 22,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  btnClose: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  closeImage: {
    width: 16,
    height: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: '#323232',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DefaultModalContent;
