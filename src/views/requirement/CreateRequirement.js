import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {Ultils} from '../../config/Ultils';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from '../../components/Button';
import {actions} from './action';
import {connect} from 'react-redux';
import Picker from '../../components/Picker';
import {actions as actionsAuth} from '../authentication/action';
import ImageView from 'react-native-image-viewing';
import {StoreKey} from '../../core/constanst';
import {formatData} from '../../core/utils';
const ios = Platform.OS === 'ios';
import {
  translateCode,
  getCodes,
  translateCodeByCodeValue,
  getListSource,
} from '../../core/services';
import {isError, formatDate, getSessionKey} from '../../core/utils';
import {ModuleInfos} from '../../core/moduleList';
import {colors} from '../../config/colors';

class CreateRequirement extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.left}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}>
          <Icon name={'arrow-left'} size={16} color={'#fff'} />
        </TouchableOpacity>
        <Text style={[styles.fs16, {color: '#fff', fontWeight: 'bold'}]}>
          Tạo phản ánh
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: colors.main,
    },
    title: '',
  });

  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      RequestType: '',
      DepId: '1',
      Content: '',
      ProductCode: 'A0001',
      Images: '',
      images: [],
      visibleType: false,
      valueType: null,
      visibleDep: false,
      valueDep: null,
      visibleApart: false,
      valueApart: null,
      indexImage: null,
      visibleImage: false,
      requestTypeList: [],
    };
    this.openImage = this.openImage.bind(this);
    this.onSelectRequestType = this.onSelectRequestType.bind(this);
    this.onSelectDep = this.onSelectDep.bind(this);
    this.onSelectApart = this.onSelectApart.bind(this);
    this.addRequest = this.addRequest.bind(this);
    this.validate = this.validate.bind(this);
    this.alert = this.alert.bind(this);
    this.viewImage = this.viewImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  async componentDidMount() {
    // const UserName = await Ultils.username();
    // const data = {
    //     "modId":"R03114",
    //     "submod":"MMN",
    //     "moduleData":{
    //         UserName
    //     }
    // };
    // this.props.onGetApartment(data)
    this.getListSourceApartmentType();
  }

  componentWillUnmount() {
    const {images_request} = this.props;
    if (images_request.length > 0) {
      images_request.forEach(e => {
        // this.props.onDeleteImages({fileName: e});
        clearTimeout();
      });
    }
  }

  onSelectRequestType(item) {
    this.setState({visibleType: false, valueType: item});
  }

  onSelectDep(item) {
    this.setState({visibleDep: false, valueDep: item});
  }

  onSelectApart(item) {
    this.setState({visibleApart: false, valueApart: item});
  }

  openImage() {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
    })
      .then(images => {
        images.forEach(e => {
          let data = {};
          const fileName = ios ? e.filename : Ultils.getFileNameAndroid(e.path);
          data.FileName = fileName;
          // data.FileType = Ultils.getFileType(fileName).toLowerCase();
          data.FileType = fileName.slice(-4).toLowerCase();
          data.FileData = e.data;
          // upload image
          // console.warn("openImage -> data", data);

          this.props.onUploadImages(data);
        });
        this.setState({images});
      })
      .catch(e => {
        console.log({e});
        if (e.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(
            'Thông báo',
            'Ứng dụng không được phép truy cập thư viện ảnh. Hãy truy cập phần cài đặt để cho phép ứng dụng truy cập thư viện ảnh',
            [
              {text: 'Huỷ'},
              {
                text: 'Cài đặt',
                onPress: () => Linking.openURL('app-settings:'),
              },
            ],
          );
        }
      });
  }

  alert(message) {
    Alert.alert('Thông báo', message);
  }

  validate() {
    const {Title, Content, valueType, valueApart} = this.state;
    const isEmpty = '';
    if (Title === isEmpty) {
      this.alert('Vui lòng nhập tiêu đề');
      return false;
    } else if (valueType?.CdValue === isEmpty || !valueType) {
      this.alert('Vui lòng chọn loại phản ánh');
      return false;
    } else if (valueApart === isEmpty) {
      this.alert('Vui lòng chọn căn hộ');
      return false;
    } else if (Content === isEmpty) {
      this.alert('Vui lòng nhập nội dung');
      return false;
    } else {
      return true;
    }
  }

  async addRequest() {
    const {
      Title,
      RequestType,
      Content,
      ProductCode,
      Images,
      valueType,
      valueDep,
      valueApart,
      requestTypeList,
    } = this.state;
    const {images_request} = this.props;
    // const { getRequest } = this.props.navigation.state.params;
    // const UserName = JSON.parse(await AsyncStorage.getItem(StoreKey.Session))
    //   .DisplayName;
    if (this.validate()) {
      const data = {
        values: [
          {
            FieldID: 'L01',
            FieldType: 'STR',
            Value: valueApart?.VALUE.toString() || '',
          },
          {
            FieldID: 'L02',
            FieldType: 'STR',
            Value: Title,
          },
          {
            FieldID: 'L03',
            FieldType: 'STR',
            Value: Content,
          },
          {
            FieldID: 'L04',
            FieldType: 'STR',
            Value: images_request.toString(), //Images[]
          },
          {
            FieldID: 'L05',
            FieldType: 'DEC',
            Value: valueType?.VALUE.toString() || '',
          },
        ],
        moduleInfo: {
          ModuleID: '02507',
          SubModule: 'MAD',
        },
        // modId: "R02108",
        // submod: "MAD",
        // moduleData: {
        //     UserName,
        //     Title,
        //     RequestType: valueType?.CdValue,
        //     // DepId: valueDep?.CdValue,
        //     Content,
        //     ProductCode: valueApart.AP_CODE,
        //     Images: images_request.toString()
        // }
      };
      this.props.onAddRequest(data);
    }
  }

  viewImage(index) {
    this.setState({visibleImage: true, indexImage: index});
  }

  removeImage(index) {
    const images = this.state.images.filter((e, i) => i !== index - 1);
    const {images_request} = this.props;
    this.setState({images}, () => {
      // this.props.onDeleteImages({ fileName: images_request[index] });
    });
  }
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
    }
    this.setState({
      departments: lst.result,
    });
  }
  render() {
    const {navigation, images_request, apartments} = this.props;
    let {
      images,
      visibleType,
      valueType,
      Title,
      visibleImage,
      indexImage,
      visibleApart,
      valueApart,
      requestType,
    } = this.state;
    let view_images = [];
    images.forEach(e => {
      view_images.push({uri: e.path});
    });
    images = formatData([{type: 'btn_add'}].concat(images), 3);
    // const departments = codes.filter(
    //   (e) => e.CdType === "REQUEST" && e.CdName === "DEPARTMENT"
    // );
    const {requestTypeList} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ScrollView
          style={{padding: 16, flex: 1}}
          keyboardDismissMode={'on-drag'}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.txtLabel}>Tiêu đề</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={'Nhập tiêu đề'}
            placeholderTextColor={'#888'}
            returnKeyLabel={'Done'}
            returnKeyType={'done'}
            value={Title}
            onChangeText={Title => this.setState({Title})}
          />
          <Text style={styles.txtLabel}>Căn hộ</Text>
          <TouchableOpacity
            style={[styles.row, styles.picker]}
            onPress={() => this.setState({visibleApart: true})}>
            <Text style={styles.placeholder}>
              {valueApart ? valueApart.TEXT : 'Căn hộ'}
            </Text>
            <Icon name={'caret-down'} />
          </TouchableOpacity>
          <Picker
            title={'Căn hộ'}
            data={this.state.departments}
            onSelect={this.onSelectApart}
            value={valueApart?.VALUE}
            visible={visibleApart}
            onRequestClose={() => this.setState({visibleApart: false})}
          />
          <Text style={styles.txtLabel}>Loại yêu cầu</Text>
          <TouchableOpacity
            style={[styles.row, styles.picker]}
            onPress={() => this.setState({visibleType: true})}>
            <Text style={styles.placeholder}>
              {valueType ? valueType.TEXT : 'Loại yêu cầu'}
            </Text>
            <Icon name={'caret-down'} />
          </TouchableOpacity>
          <Picker
            title={'Loại yêu cầu'}
            data={requestTypeList}
            onSelect={this.onSelectRequestType}
            value={valueType?.TEXT}
            visible={visibleType}
            onRequestClose={() => this.setState({visibleType: false})}
          />
          <Text style={styles.txtLabel}>Nội dung</Text>
          <TextInput
            multiline={true}
            style={{
              width: '100%',
              height: 100,
              textAlignVertical: 'top',
              color: '#323232',
              marginVertical: 16,
            }}
            borderBottomColor={'#ddd'}
            borderBottomWidth={1}
            placeholder={'Nội dung'}
            placeholderTextColor={styles.placeholder.color}
            onChangeText={Content => this.setState({Content})}
          />
          <Text style={styles.txtLabel}>File đính kèm</Text>

          <View style={{marginVertical: 16}}>
            <FlatList
              data={images}
              renderItem={({item, index}) => {
                if (item.empty) {
                  return <View style={{flex: 1, margin: 5}} />;
                }
                if (item.type === 'btn_add') {
                  return (
                    <View
                      style={{
                        flex: 1,
                        margin: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          margin: 5,
                          // paddingVertical: 16,
                          backgroundColor: '#EAF2FF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#3784FF',
                          borderStyle: 'dashed',
                        }}
                        onPress={this.openImage}>
                        <Icon name="camera" color="#3784FF" size={30} />
                        <Text
                          style={{
                            color: '#3784FF',
                            fontSize: 16,
                            marginTop: 5,
                          }}>
                          Thêm ảnh
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
                return (
                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={this.viewImage.bind(this, index)}
                      style={{margin: 5}}>
                      <Image
                        source={{uri: item.path}}
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 6,
                          marginBottom: 6,
                          borderRadius: 8,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeImage}
                      onPress={this.removeImage.bind(this, index)}>
                      <Icon name={'times'} color={'#eee'} size={16} />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </View>
        </ScrollView>
        <View style={{marginHorizontal: 16}}>
          <Button title={'Gửi phản ánh'} onPress={this.addRequest} />
        </View>
        <ImageView
          images={view_images}
          imageIndex={indexImage}
          visible={visibleImage}
          onRequestClose={() => this.setState({visibleImage: false})}
          backgroundColor={'#00000080'}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  name: {color: '#323232', fontWeight: 'bold'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  txtLabel: {color: '#444', fontWeight: 'bold'},
  placeholder: {color: '#888', fontWeight: '500'},
  left: {flexDirection: 'row', alignItems: 'center'},
  btnBack: {paddingHorizontal: 16, paddingVertical: 8},
  fs16: {fontSize: 16},
  input: {
    width: '100%',
    color: '#000',
    fontWeight: 'bold',
    height: 32,
    marginVertical: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  inputAndroid: {
    width: '100%',
    color: '#000',
    fontWeight: '500',
    paddingVertical: 8,
    marginVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  picker: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 16,
  },
  removeImage: {
    backgroundColor: '#00000090',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

const mstp = state => ({
  apartment: state.AuthReducer.apartment,
  images_request: state.RequestReducer.images_request,
  apartments: state.RequestReducer.apartments,
});
const mdtp = dispatch => ({
  onAddRequest: data => dispatch(actions.addRequest(data)),
  onGetApartment: data => dispatch(actions.getUserApartment(data)),
  onUploadImages: data => dispatch(actions.uploadImages(data)),
  onDeleteImages: fileName => dispatch(actions.deleteImage(fileName)),
});

export default connect(mstp, mdtp)(CreateRequirement);
