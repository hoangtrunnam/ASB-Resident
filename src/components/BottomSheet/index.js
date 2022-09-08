import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from './ModalBaseScene';
import DefaultModalContent from './DefaultModalContent';
import PropTypes from 'prop-types';
const propTypes = {
  title: PropTypes.string,
};
class BottomSheet extends ModalBaseScene {
  state = {
    isVisible: false,
  };
  open = () => {
    this.setState({ isVisible: true });
  };
  close = () => {
    this.setState({ isVisible: false });
  };
  // renderModal
  render() {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.state.isVisible} //this.isVisible()
        onSwipeComplete={this.close}
        swipeDirection={['down']}
        onBackdropPress={this.close}
        propagateSwipe={true}
        style={styles.view}>
        <DefaultModalContent onPress={this.close} title={this.props.title}>
          {this.props.children}
        </DefaultModalContent>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BottomSheet;
