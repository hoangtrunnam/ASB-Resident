import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import {Ultils} from '../config/Ultils';
import Icon from 'react-native-vector-icons/FontAwesome5';

class ContainerChoose extends React.Component {
    constructor(props) {
        super(props);
    }

    checkItem(step, item) {
        switch (step) {
            case 1: return item.ProjectName;
            case 2: return item.BuildingCode;
            case 3: return item.FloorName;
            case 4: return item.ApartmentCode;
            default:
                return item.ProjectName
        }
    }

    render() {
        const {data, onSelect, children, location, onChangeText, step} = this.props;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/bg_red.png')} style={styles.imgBg}>
                    {children}
                    {/* <View style={styles.bottom}>
                        <Text style={styles.location}>Bạn đang ở {location} nào?</Text>
                        <View style={styles.search}>
                            <Icon name={'search'} color={'#888'}/>
                            <TextInput
                                placeholder={'Tìm kiếm'}
                                placeholderTextColor={'#888'}
                                style={Ultils.ios ? styles.input : styles.inputAndroid}
                                onChangeText={text => onChangeText(text)}
                            />
                        </View>
                    </View> */}
                </ImageBackground>
                <ScrollView
                    style={{flex: 1, zIndex: -1}}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={'always'}
                >
                    <FlatList
                        data={data}
                        renderItem={({item, index}) => (
                            <TouchableOpacity style={styles.item} onPress={() => onSelect(item)} key={index}>
                                <Icon name={'circle'} color={'#DC9D2B'} solid/>
                                <Text style={{marginLeft: 12}}>{this.checkItem(step, item)}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.props}
                        ListHeaderComponent={
                            <Text style={{fontWeight: '600', marginTop: 30, marginLeft: 16}}>Kết quả</Text>
                        }
                    />
                </ScrollView>
                <Image source={require('../assets/images/bg.png')} style={styles.bg} resizeMode={'contain'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    imgBg: {width: Ultils.dimensions.width, height: 91}, //161
    item: {flexDirection: 'row', alignItems: 'center', paddingVertical: 16, marginHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#ddd'},
    bottom: {position: 'absolute', bottom: -20, left: 0, right: 0, marginHorizontal: 16, zIndex: 2},
    location: {fontSize: 16, color: '#fff'},
    search: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', height: 40, paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10
    },
    bg: {position: 'absolute', bottom: -30, right: '-40%' , width: Ultils.dimensions.width, height: Ultils.dimensions.width / 1.5, zIndex: -1},
    input: {width: '100%', color: '#000', fontWeight: '500', height: 32, marginVertical: 16},
    inputAndroid: {width: '100%', color: '#000', fontWeight: '500', paddingVertical: 8, marginVertical: 8},
});

export default ContainerChoose;
