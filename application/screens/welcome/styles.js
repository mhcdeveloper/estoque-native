import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    containerAviso: {
        margin: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        backgroundColor: Colors.white,
    },
    containerHeader: {
        position: 'absolute',
        top: height * 0.1,
        right: 10,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
        padding: 5,
    },
    txtWelcome: {
        fontSize: 35,
        fontWeight: '700',
        color: Colors.secondary,
    },
    txtFidelidade: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.red,
        textAlign: 'center',
    },
    containerBtn: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    label: {
        fontSize: Fonts.medium,
        fontWeight: '800',
        color: Colors.secondary,
        textAlign: 'center',
        margin: 10,
    },
    labelAviso: {
        fontSize: Fonts.big,
        color: Colors.thirth,
    },
    mensagemAviso: {
        fontSize: Fonts.regular,
        color: Colors.regular,
    },
});

export default styles;