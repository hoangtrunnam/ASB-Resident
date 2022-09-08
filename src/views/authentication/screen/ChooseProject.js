import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {actions} from '../action';
import {connect} from 'react-redux';
import {getListSource} from '../../../core/services';
import {getSessionKey, isError} from '../../../core/utils';
import AsyncStorage from '@react-native-community/async-storage';
import {CONST} from '../../../constant/const';
import {SafeAreaView} from 'react-navigation';

class ChooseProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
    };
  }

  async componentDidMount() {
    await this.getListSourceApartmentType();
  }

  componentWillUnmount() {
    clearTimeout();
  }

  selectDepartment = department => {
    AsyncStorage.setItem(
      CONST.DEPARTMENT,
      JSON.stringify(department.VALUE),
      () => {
        AsyncStorage.setItem(CONST.DEPARTMENT_NAME, department.TEXT, () => {
          setTimeout(() => {
            this.props.navigation.navigate('MainApp');
          }, 500);
        });
      },
    );
  };

  renderDepartments = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.department}
        onPress={this.selectDepartment.bind(this, item)}>
        <Text>{item.TEXT}</Text>
      </TouchableOpacity>
    );
  };

  async getListSourceApartmentType() {
    const lst = await getListSource({
      moduleInfo: {ModuleID: '02507', SubModule: 'MAD'},
      data: {
        FieldId: 'L01',
        ListSource: 'PKG_RESIDENT.SOURCE_USER_APARTMENT(:SESSIONINFO_USERNAME)',
      },
      sessionId: await getSessionKey(),
      values: [],
      conditions: [],
    });
    if (isError(lst)) {
      alert(JSON.stringify(lst));
      return;
    }
    this.setState({
      departments: lst.result,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Chọn căn hộ</Text>
          </View>
          <FlatList
            data={this.state.departments}
            renderItem={this.renderDepartments}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  left: {flexDirection: 'row', alignItems: 'center'},
  textLeft: {fontSize: 16, color: '#fff'},
  department: {
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

const mstp = state => ({});

const mdtp = dispatch => ({});

export default connect(mstp, mdtp)(ChooseProject);
