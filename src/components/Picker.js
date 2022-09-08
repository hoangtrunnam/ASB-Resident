import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Picker = ({
  title,
  data,
  onSelect,
  value,
  visible,
  onRequestClose,
  ...rest
}) => {
  return (
    <Modal
      visible={visible}
      animated={true}
      animationType={'fade'}
      onRequestClose={onRequestClose}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {/*<Text onPress={() => clear(id)}>Xóa</Text>*/}
            </View>
            <View style={styles.headerTitle}>
              <Text style={{fontWeight: '500', color: '#000'}}>{title}</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={styles.iconRight}>
                <Icon name={'times'} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.listItem}>
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() => onSelect(item)}>
                  <Text>{item.CdValueName || item.AP_CODE || item.TEXT}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={rest}
              ListEmptyComponent={
                <View style={{padding: 15, alignItems: 'center'}}>
                  <Text>Không có dữ liệu</Text>
                </View>
              }
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    paddingLeft: 15,
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLeft: {flex: 0.5},
  headerTitle: {flex: 1, alignItems: 'center'},
  headerRight: {flex: 0.5, alignItems: 'flex-end'},
  listItem: {flex: 1},
  item: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconRight: {paddingRight: 16},
});
export default Picker;
