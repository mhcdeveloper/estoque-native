import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    containerProdutoInfo: {
        flex: 1,
        margin: 10,
    },
    containerFloatButton: {
        flex: 1,
        top: 20,
    },
    cardDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerNome: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width,
        height: 400,
    },
    titleCard: {
        fontSize: Fonts.medium,
        color: Colors.secondary,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail: {
        fontSize: Fonts.larger,
        color: 'grey'
    },
    labelUnidadeMedida: {
        color: Colors.thirth,
        fontSize: Fonts.larger
    },
});

export default styles;