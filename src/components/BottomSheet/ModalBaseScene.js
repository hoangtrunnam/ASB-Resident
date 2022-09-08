import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

class ModalBaseScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  open = () => this.setState({ visible: true });
  close = () => this.setState({ visible: false });
  isVisible = () => this.state.visible;
  renderButton() {
    return (
      <Button
        testID={'modal-open-button'}
        onPress={this.open}
        title="Open"
        style={{ backgroundColor: 'red' }}
      />
    );
  }
  render() {
    return (
      <View style={styles.view}>
        {this.renderButton()}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default ModalBaseScene;
