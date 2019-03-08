import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,                
        backgroundColor: Colors.secondary,        
    },
    image: {
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,        
    },
    scrollView: {
        flex: 1,        
        position: 'absolute',
        paddingLeft: 30,
        paddingRight: 30,
        top: '10%',
        bottom: '10%',
    },
    loginHeader: {
        color: Colors.secondary,
        fontWeight: '300',
        marginTop: 20,
        marginBottom: 30,
    },
    forgotPasswordSubheading: {
        color: Colors.secondary,
        fontWeight: '300',
        fontSize: 15, 
        marginBottom: 10,       
    },
    logoContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
});

export default styles;
