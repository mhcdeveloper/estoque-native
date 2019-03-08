import { 
    Dimensions
} from 'react-native';

const IphoneSize = () => {
    const windowWidth = Dimensions.get('window').width;
    if(windowWidth === 320) {
        return 'small'; //Iphone se
    } else if(windowWidth === 414) {
        return 'large'; //Iphone Plus
    } 
    return 'medium'; // Iphone 6/7
}

export default IphoneSize;