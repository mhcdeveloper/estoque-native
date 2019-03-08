import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Easing,
    Animated,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureInput: props.inputType === 'text' || props.inputType === 'numeric' ? false : true,
            scaleCheckmarkValue: new Animated.Value(0),
        };
    }

    scaleCheckmark = (value) => {
        Animated.timing(
            this.state.scaleCheckmarkValue,
            {
                toValue: value,
                duration: 400,
                easing: Easing.easeOutBack,
            },
        ).start();
    }

    toggleShowPassword = () => {
        this.setState({ secureInput: !this.state.secureInput });
    }

    onChangeText = (text) => {
        this.props.onChangeText(text);
        this.setState({ inputValue: text });
    }

    render() {
        const {
            labelText,
            labelTextSize,
            labelColor,
            textColor,
            borderBottomColor,
            inputType,
            customStyle,
            showCheckmark,
            autoFocus,
            autoCapitalize,
            placeholder,
            inputStyle,
            labelTextWeight,
            disabled,
            type,
            defaultValue,
            value
        } = this.props;
        const { secureInput, scaleCheckmarkValue, inputValue } = this.state;
        const fontSize = labelTextSize || 14;
        const fontWeight = labelTextWeight || '700';
        const color = labelColor || Colors.white;
        const inputColor = textColor || Colors.white;
        const borderBottom = borderBottomColor || 'transparent';
        const keyboardType = inputType === 'numeric' ? 'numeric' : 'default';
        let customInputStyle = inputStyle || {};
        if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
            customInputStyle.paddingBottom = 5;
        }
        const iconScale = scaleCheckmarkValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.01, 1.6, 1]
        });
        const scaleValue = showCheckmark ? 1 : 0;
        this.scaleCheckmark(scaleValue);
        return (
            <View style={[customStyle, styles.container]}>
                <Text style={[{ fontWeight, fontSize, color }, styles.label]}>{labelText}</Text>
                {inputType === 'password' ?
                    <TouchableOpacity
                        style={styles.showButton}
                        onPress={this.toggleShowPassword}>
                        <Text style={styles.showButtonText}>{secureInput ? 'Mostrar' : 'Ocultar'}</Text>
                    </TouchableOpacity>
                    : null}
                <Animated.View style={[{ transform: [{ scale: iconScale }] }, styles.checkmarkContainer]}>
                    {type === 'edit'
                        ?
                        <Icon
                            name="edit"
                            color={Colors.green}
                            size={20} />
                        :
                        <Icon
                            name="check"
                            color={Colors.green}
                            size={20} />
                    }
                </Animated.View>
                <TextInput
                    autoCorrect={false}
                    style={[{ color: inputColor, borderBottomColor: borderBottom }, inputStyle, styles.inputField]}
                    secureTextEntry={secureInput}
                    onChangeText={this.onChangeText}
                    keyboardType={keyboardType}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor={Colors.regular}
                    defaultValue={defaultValue}
                    value={value === '' ? defaultValue : value}
                    editable={disabled}
                />
            </View>
        )
    }
};

InputField.protoTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    showCheckmark: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    labelTextWeight: PropTypes.string,
    inputStyle: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    label: {
        marginBottom: 20,
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
    },
    showButton: {
        position: 'absolute',
        right: 0,
    },
    showButtonText: {
        color: Colors.red,
        fontWeight: '700',
    },
    checkmarkContainer: {
        position: 'absolute',
        right: 0,
        bottom: 12,
    },
})

export default InputField;