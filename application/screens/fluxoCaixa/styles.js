import { StyleSheet } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        marginBottom: 20,
    },
    containerInput: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    label: {
        fontSize: Fonts.big,
        fontWeight: '500',
        color: Colors.secondary,
        marginBottom: 10,
    }
});

export default styles;