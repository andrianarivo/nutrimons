import {StyleSheet} from 'react-native';
import {colors} from './colors';

export default StyleSheet.create({
  avatar: {
    backgroundColor: colors.darkGrey,
    borderStyle: 'solid',
    borderColor: colors.lightGrey,
    borderWidth: 2,
  },
  cardContainer: {
    width: '50%',
  },
  card: {
    borderStyle: 'solid',
    borderColor: colors.grey,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  cardTitle: {
    fontSize: 18,
    color: colors.black,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.textGrey,
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardInfoText: {
    color: colors.textGrey,
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 15,
    backgroundColor: colors.navyBlue,
  },
  buttonTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  halfw: {
    width: '50%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
  },
});

export {colors};
