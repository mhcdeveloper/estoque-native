import { StyleSheet } from 'react-native';

import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    containerScroll: {
        width: '100%'
    },
    container: {
        paddingRight: 40,
        paddingLeft: 40,
        marginBottom: 15,
    },
    containerSecondary: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBtn: {
        marginTop: 10,
        marginLeft: '20%',
        marginRight: '20%',
    },
    containerCarrinho: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20,
        paddingTop: 10,
    },
    label: {
        fontSize: Fonts.medium,
        fontWeight: '500',
        color: Colors.secondary,
        marginBottom: 10,
    }
});

export default styles;