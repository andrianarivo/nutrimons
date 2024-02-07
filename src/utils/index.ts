import {Dimensions} from 'react-native';
import {ellipsis} from './string';
import {deepCopy} from './copy';
import {readableDate} from './date';

const screenDimensions = Dimensions.get('screen');

export {screenDimensions, ellipsis, deepCopy, readableDate};
