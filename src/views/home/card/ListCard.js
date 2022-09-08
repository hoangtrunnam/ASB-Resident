import React from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from "../../../config/colors";

class ListCard extends React.Component {

    static navigationOptions = ({navigation}) => ({
       headerLeft: () => (
           <View style={styles.left}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
                   <Icon name={'arrow-left'} size={16} color={'#fff'}/>
               </TouchableOpacity>
               <Text style={[styles.fs16, {color: '#fff'}]}>Quản lý thẻ xe</Text>
           </View>
       ),
        headerRight: () => (
            <TouchableOpacity style={{paddingHorizontal: 16}}>
                <Icon name={'exchange-alt'} size={20} color={'#fff'}/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: colors.main,
        },
        title: '',
    });

    constructor(props) {
        super(props);
    }

    render() {
        const data = [
            {name: 'Nguyen Van A', number: '29A-12312', department: 'P502 T5 River Side', id: '#VMX12345'},
            {name: 'Nguyen Van B', number: '29A-12312', department: 'P502 T5 River Side', id: '#VMX12345'},
            {name: 'Nguyen Van C', number: '29A-12312', department: 'P502 T5 River Side', id: '#VMX12345'},
        ];
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => (
                        <TouchableOpacity style={styles.cardMenu} onPress={() => navigation.navigate('InformationCard', {item})}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Căn hộ</Text>
                                <Text>{item.department}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Biển số</Text>
                                <Text>{item.number}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Thẻ xe</Text>
                                <Text>{item.id}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {flex: 1},
    cardMenu: {
        backgroundColor: '#fff', marginTop: 16, marginHorizontal: 16, padding: 16, borderRadius: 8, justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {color: '#323232', fontWeight: 'bold'},
    row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16},
    label: {color: '#666'},
    left: {flexDirection: 'row', alignItems: 'center'},
    btnBack: {paddingHorizontal: 16, paddingVertical: 8},
    fs16: {fontSize: 16}
})

export default ListCard;
