import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class NavbarButton extends Component {
    render() {
        const { location, color, text, icon, handleButtonPress } = this.props;
        const marginPosition = location === 'right' ? { marginRight: 10 } : { marginLeft: 10 };
        let content;
        if(text) {
            content = <Text style={[{color}, marginPosition, styles.buttonText]}>{text}</Text>
        } else if (icon) {
            content = <View style={marginPosition}>{icon}</View>
        }
        return (
            <TouchableOpacity
                onPress={handleButtonPress}
                style={marginPosition}>
                {content}
            </TouchableOpacity>
        )
    }
};

NavbarButton.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.object,
    handleButtonPress: PropTypes.func.isRequired,
    location: PropTypes.string,
    color: PropTypes.string,
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
    },
});

export default NavbarButton;