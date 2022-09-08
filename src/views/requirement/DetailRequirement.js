import React, {Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Linking,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {Ultils} from '../../config/Ultils';
import {CONST} from '../../constant/const';
import {connect} from 'react-redux';
import {actions} from './action';
import ActionSheet from 'react-native-actionsheet';
import Collapsible from '../../components/Collapsible';
import {translateCodeByCodeValue} from '../../core/services';
const ios = Platform.OS === 'ios';
import styles from './styles';
import {KeyboardAccessoryView} from '@react-native-keyboard-accessory';
import {searchModule} from '../../core/modules/search';
import {ModuleInfos} from '../../core/moduleList';
import {phonecall} from '../../core/libs/react-native-communications';
import {apiUrl} from '../../core/constanst';
import {colors} from '../../config/colors';
const Message = ({item}) => {
  let images = item.CONTENT.split(',');
  if (item.CONTENT_TYPE === 'TEXT') {
    return <Text>{item.CONTENT}</Text>;
  } else if (item.CONTENT_TYPE === 'IMG') {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={images}
          horizontal={true}
          renderItem={({item}) => (
            <Image
              source={{uri: apiUrl + item}}
              style={{
                width: 60,
                height: 60,
                marginTop: 8,
                marginHorizontal: 6,
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  } else {
    return (
      <Fragment>
        {/* <Text>{item.CONTENT}</Text> */}
        <FlatList
          data={images}
          renderItem={({item}) => (
            <Image
              source={{uri: apiUrl + item}}
              style={{width: 100, height: 100, marginTop: 8}}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Fragment>
    );
  }
};

class DetailRequirement extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.left}>
        <TouchableOpacity
          style={{paddingHorizontal: 16}}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} color={'#fff'} size={16} />
        </TouchableOpacity>
        <Text style={[styles.fs16, {color: '#fff'}]}>Chi tiết phản ánh</Text>
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
      images: [],
      expand: false,
      indexImage: null,
      visibleImage: false,
      NotificationRequest: {},
    };
    this.openImage = this.openImage.bind(this);
    this.viewImage = this.viewImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._scrollToEnd = this._scrollToEnd.bind(this);
  }

  async componentDidMount() {
    this._scrollToEnd();
    this.onLoadData();
    this.interval = setInterval(() => {
      this.onLoadData();
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    const {images_request} = this.props;
    if (images_request.length > 0) {
      images_request.forEach(e => {
        this.props.onDeleteImages({fileName: e});
        clearTimeout();
      });
    }
  }

  onLoadData = () => {
    const {params} = this.props.navigation.state;
    const requestId = params?.request?.REQ_ID || params.id;
    this.getDetailRequest(requestId);

    const data = {
      modId: '03508',
      submod: 'MMN',
      Value: requestId,
    };
    this.props.onGetRequestRep(data);
  };

  getDetailRequest = async requestId => {
    try {
      const pageSize = 1;
      const values = [];
      const conditions = [
        {
          ConditionID: 'D01',
          Operator: '003',
          Value: requestId,
          ID: 1,
        },
      ];
      let response = await searchModule.executeSearch(
        ModuleInfos.getRequestList,
        values,
        pageSize,
        conditions,
      );
      const data = response.result.data;
      this.setState({NotificationRequest: data[0]});
    } catch (error) {
      console.log('getDetailRequest -> error', error);
    }
  };

  _scrollToEnd() {
    setTimeout(() => {
      this.scrollView.scrollToEnd({animated: true});
    }, 500);
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
          this.props.onUploadImages(data);
        });
        this.setState({images: this.state.images.concat(images)});
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

  openCamera() {
    ImagePicker.openCamera({
      includeBase64: true,
      // useFrontCamera: true
    })
      .then(image => {
        const e = image;
        let data = {};
        const fileName = ios
          ? e.filename || Ultils.getFileNameAndroid(e.path)
          : Ultils.getFileNameAndroid(e.path);
        data.fileName = fileName;
        // data.fileType = Ultils.getFileType(fileName).toLowerCase();
        data.FileType = fileName.slice(-4).toLowerCase();
        data.fileData = e.data;
        // upload image
        this.props.onUploadImages(data);
        //set image da select vao state images
        let images = [];
        images.push(image);
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

  viewImage(index) {
    this.setState({visibleImage: true, indexImage: index});
  }

  removeImage(index) {
    const images = this.state.images.filter((e, i) => i !== index);
    const {images_request} = this.props;
    this.setState({images}, () => {
      this.props.onDeleteImages({fileName: images_request[index]});
    });
  }

  async onSend() {
    const request =
      this.props.navigation.state.params.request ||
      this.state.NotificationRequest;
    console.log('onSend -> request', request);

    let {images_request, Content} = this.props;
    console.log({images_request});
    let TYPE_MESSAGE = 'TEXT';
    if (images_request.length) {
      TYPE_MESSAGE = 'IMG';
      Content = images_request.toString();
    }
    let CONTENT_TYPE = '';
    if (images_request.length) {
      CONTENT_TYPE = 'IMG';
    } else {
      CONTENT_TYPE = 'TEXT';
    }
    const data = {
      values: [
        {
          FieldID: 'C01',
          FieldType: 'DEC',
          Value: request?.REQ_ID + '',
        },
        {
          FieldID: 'C02',
          FieldType: 'STR',
          Value: TYPE_MESSAGE,
        },
        {
          FieldID: 'C03',
          FieldType: 'STR',
          Value: Content,
        },
      ],
      REPLY_BY: request?.REQUEST_BY,
      CONTENT_TYPE: CONTENT_TYPE,
      moduleInfo: {
        ModuleID: '02508',
        SubModule: 'MAD',
      },
    };
    this._scrollToEnd();
    this.props.onAddReply(data);
  }

  render() {
    const {expand, NotificationRequest} = this.state;
    const {navigation, replies, images_request, Content} = this.props;

    let request = navigation.state.params?.request || NotificationRequest;
    let images_arr = [];
    try {
      images_arr = request?.IMAGES.split(',');
    } catch (error) {}

    let view_images = [];
    images_arr.forEach(e => {
      view_images.push({uri: apiUrl + e});
    });

    return (
      <View style={styles.container}>
        <View
          style={{flex: 1}}
          keyboardDismissMode={'on-drag'}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.cardMenu]}>
            <View style={styles.topCard}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 16,
                  color: Ultils.getStatusRequest(request?.STATUS)?.color,
                  fontSize: 18,
                }}>
                {request?.TITLE}
              </Text>
              <Text style={{color: '#888888'}}>
                ({request?.APARTMENT_CODE} {request?.PROJECT_NAME})
              </Text>
            </View>
            <View style={styles.center}>
              <Text style={{color: '#888888'}}>Trạng thái</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Ultils.getStatusRequest(request?.STATUS)?.color,
                }}>
                {/* {Ultils.getStatus(codes, request.STATUS, "REQUEST", "STATUS")} */}
                {translateCodeByCodeValue(
                  ':BMS_REQUEST.STATUS',
                  request?.STATUS,
                )}
              </Text>
            </View>
            <Collapsible collapsed={!this.state.expand}>
              <View style={styles.center}>
                <Text style={{color: '#888888'}}>Thời gian yêu cầu</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {Ultils.converDateTime(request?.REQUEST_DATE)}
                </Text>
              </View>
              {request?.STAFF_ID ? (
                <View style={styles.center}>
                  <Text style={{color: '#888888'}}>Nhân viên xử lý</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#3784FF',
                        marginHorizontal: 12,
                      }}>
                      {request?.PROCESS_BY}
                    </Text>
                    {request?.STAFF_PHONE ? (
                      <TouchableOpacity
                        onPress={() => phonecall(request?.STAFF_PHONE, true)}>
                        <Icon name={'phone'} size={20} color={'#3784FF'} />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ) : null}
              <View
                style={[
                  styles.center,
                  {flexDirection: 'column', alignItems: 'flex-start'},
                ]}>
                <Text style={{color: '#888888'}}>Nội dung</Text>
                <Text
                  style={{fontWeight: 'bold', marginTop: 5, color: '#323232'}}>
                  {request?.CONTENT}
                </Text>
              </View>
              {images_arr.length ? (
                <View style={{backgroundColor: '#fff', paddingTop: 4}}>
                  <FlatList
                    data={images_arr}
                    renderItem={({item, index}) => (
                      <View>
                        <TouchableOpacity
                          onPress={this.viewImage.bind(this, index)}>
                          <Image
                            source={{uri: apiUrl + item}}
                            style={{
                              width: Ultils.dimensions.width / 3.5,
                              height: Ultils.dimensions.width / 3.5,
                              marginLeft: 6,
                              marginBottom: 6,
                              marginHorizontal: 6,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                  />
                </View>
              ) : null}
            </Collapsible>

            <Button
              title={
                expand ? (
                  <Text>
                    Thu gọn <Icon name={'chevron-up'} />
                  </Text>
                ) : (
                  <Text>
                    Mở rộng <Icon name={'chevron-down'} />
                  </Text>
                )
              }
              styleButton={styles.btn}
              styleTitle={{color: colors.main, fontWeight: 'bold'}}
              activeOpacity={0.8}
              onPress={() => this.setState({expand: !this.state.expand})}
            />
          </View>

          {/*render messgage*/}
          <View style={{flex: 1, padding: 16}}>
            <FlatList
              ref={view => {
                this.scrollView = view;
              }}
              data={replies}
              renderItem={({item}) => {
                let isCuDan = request?.REQUEST_BY === item.REPLY_BY;
                return isCuDan ? (
                  <View style={{alignItems: 'flex-end', marginVertical: 6}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <View style={styles.msgLeft}>
                        <Message item={item} />
                      </View>
                      <View style={styles.userLeft}>
                        {/* <Icon name={"user"} color={"#FF6000"} /> */}
                        <Image
                          source={require('../../assets/images/left_icon.png')}
                          style={{width: 25, height: 25}}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{alignItems: 'flex-start', marginBottom: 6}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <View style={styles.userRight}>
                        <Icon name={'users'} color={'#3784FF'} />
                      </View>
                      <View style={styles.msgRight}>
                        <Message item={item} />
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.REPLY_ID + ''}
              extraData={this.state}
            />
          </View>
        </View>
        <View>
          <View style={{backgroundColor: '#fff', paddingTop: 4}}>
            <FlatList
              data={images_request}
              renderItem={({item, index}) => {
                let uri = apiUrl + item;
                return (
                  <View>
                    <TouchableOpacity
                      onPress={this.viewImage.bind(this, index)}>
                      <Image
                        source={{
                          uri: uri,
                        }}
                        style={{
                          width: 60,
                          height: 60,
                          marginLeft: 6,
                          marginBottom: 6,
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
              horizontal={true}
            />
          </View>
          <KeyboardAccessoryView
            // inSafeAreaView
            androidAdjustResize
            avoidKeyboard={true}
            alwaysVisible={true}
            hideBorder={true}
            style={styles.bg_white}>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={{paddingHorizontal: 12}}
                disabled={images_request.length < 5 ? false : true}
                onPress={() => this.ActionSheet.show()}>
                <Icon name={'paperclip'} size={20} color="#666666" />
              </TouchableOpacity>
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#F8F8F8',
                  padding: 8,
                  paddingHorizontal: 12,
                  borderRadius: 7,
                  color: '#000',
                }}
                placeholder={'Phản hồi...'}
                placeholderTextColor={'#666666'}
                value={Content}
                onChangeText={Content => this.props.onChangeContent(Content)}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 12}}
                onPress={this.onSend}
                disabled={images_request.length === 0 && Content === ''}>
                <Icon name={'paper-plane'} size={20} color={'#3784FF'} />
              </TouchableOpacity>
            </View>
          </KeyboardAccessoryView>
        </View>
        {/* <ImageView
          images={view_images}
          imageIndex={indexImage}
          visible={visibleImage}
          onRequestClose={() => this.setState({ visibleImage: false })}
          backgroundColor={"#00000080"}
        /> */}
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={'Chọn thư viện ảnh hoặc ?'}
          options={['Thư viện ảnh', 'Huỷ']} //"Máy ảnh",
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={index => {
            console.log({index});
            if (index) {
              this.openCamera();
            } else {
              this.openImage();
            }
          }}
        />
      </View>
    );
  }
}

const mstp = state => ({
  codes: state.AppReducer.codes,
  replies: state.RequestReducer.replies,
  images_request: state.RequestReducer.images_request,
  Content: state.RequestReducer.Content,
});
const mdtp = dispatch => ({
  onGetRequestRep: data => dispatch(actions.getRequestRep(data)),
  onUploadImages: data => dispatch(actions.uploadImages(data)),
  onAddReply: data => dispatch(actions.addReply(data)),
  onChangeContent: Content =>
    dispatch({type: 'CHANGE_CONTENT', payload: Content}),
  onDeleteImages: fileName => dispatch(actions.deleteImage(fileName)),
});

export default connect(mstp, mdtp)(DetailRequirement);
