import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {flex: 1},
  containerCard: {backgroundColor: '#3784FF'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
  },
  cardItem: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  row: {flexDirection: 'row', alignItems: 'center', paddingVertical: 4},
  borderItem: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  left: {flex: 0.5, alignItems: 'flex-end'},
  btnBack: {paddingHorizontal: 16, paddingVertical: 8},
  selectTime: {marginTop: -30},
  pricetext: {fontSize: 16, color: 'green', fontWeight: 'bold'},
  amountText: {fontSize: 20, color: 'green', fontWeight: 'bold'},
  fs16: {fontSize: 16},
  titleText: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  cartHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  listItem: {
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    paddingHorizontal: 10,
  },
  listItemLast: {
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});