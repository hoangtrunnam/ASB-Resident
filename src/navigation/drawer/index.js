import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from '../tab';
import MenuSide from '../../views/menu-side/MenuSide';
export default createAppContainer(createDrawerNavigator({
    Main: {
        screen: Main
    }
}, {
    initialRouteName: 'Main',
    contentComponent: MenuSide,
}))
