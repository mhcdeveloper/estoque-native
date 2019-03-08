import { StyleSheet } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    containerLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: Fonts.big,
        color: Colors.regular,
        textAlign: 'center',
    }
});

export default styles;