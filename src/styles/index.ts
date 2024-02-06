import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  avatar: {
    backgroundColor: 'grey',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
  },
  cardContainer: {
    width: '50%',
  },
  card: {
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardDesc: {
    fontSize: 14,
    color: 'grey',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfoText: {
    color: 'grey',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
