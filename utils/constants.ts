import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');
export const FULL_HEIGHT = initialWindowMetrics?.frame.height ?? height;

export enum NavigationRoutes {
  LIST = 'List',
}
