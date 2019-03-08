import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,    
} from 'react-native';
import { Colors } from '../../styles/Colors';

class RoundedButton extends Component {
    render() {
        const {
            text,
            loading,
            disabled,
            textColor,
            textSize,
            textWeight,
            textAlign,
            borderColor,
            background,
            handleOnPress
        } = this.props;
        const backgroundColor = background || 'transparent';
        const color = textColor || Colors.dark;
        const fontSize = textSize || 16;
        const fontWeight = textWeight || '600';
        const alignPosition = textAlign || 'center';
        const border = borderColor || Colors.white;
        const opacityStyle = disabled || loading ? 0.7 : 1;
        
        const ButtonComponent = (buttonProps) => {
            if (Platform.OS === 'ios') {
                return (
                    <TouchableOpacity
                        style={[{ opacity: opacityStyle, backgroundColor, borderColor: border }, styles.iosWrapper]}
                        onPress={handleOnPress}
                        activeOpacity={0.6}
                        disabled={disabled || loading}
                    >
                        {buttonProps.children}
                    </TouchableOpacity>
                );
            }
            return (
                <View style={[styles.androidWrapper, { borderColor: border }]}>
                    <TouchableOpacity
                        onPress={handleOnPress}
                        disabled={disabled || loading}
                        style={[{ opacity: opacityStyle, backgroundColor, borderColor: border }, styles.iosWrapper]}                        
                        activeOpacity={0.6}
                    >
                        {buttonProps.children}                        
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <ButtonComponent>
                <View style={styles.buttonTextWrapper}>
                    <Text style={[{
                        color, fontSize, fontWeight, textAlign: alignPosition,
                    }, styles.buttonText]}
                    >
                        {text}
                    </Text>                    
                </View>
            </ButtonComponent>
        )
    }
}

RoundedButton.propTypes = {
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    textSize: PropTypes.number,
    textWeight: PropTypes.string,
    textAlign: PropTypes.string,
    background: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.object,
    iconPosition: PropTypes.string,
    handleOnPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};


const styles = StyleSheet.create({
    iosWrapper: {
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
        alignItems: 'center',
    },
    androidWrapper: {
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
    },
    androidButtonText: {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 5,
        paddingBottom: 5,
        alignItems: 'center',
        margin: 5,
    },
    buttonTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        width: '100%',
    },
    loaderContainer: {
        width: 90,
        height: 90,
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -45,
        marginTop: -45,
    },
    loaderImage: {
        width: 40,
        height: 40,
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        marginLeft: -20,
        top: '50%',
        marginTop: -20,
    },
})

export default RoundedButton;