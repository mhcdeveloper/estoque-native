import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    containerInfo: {
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginBottom: 20,
    },
    containerBtn: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInput: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    btn: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
    },
    label: {
        fontSize: Fonts.bigger,
        fontWeight: '500',
        color: Colors.secondary,
        marginBottom: 10,
    },
    labelEmpty: {
        fontSize: Fonts.regular,
        color: Colors.regular,
        textAlign: 'center',
    }
});

export default styles;