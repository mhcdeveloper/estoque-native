import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import InputField from '../inputs/InputField';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Modal = ({ title, label, handleChangeText, onSubmit, handleModal, produto }) => (
    <View style={styles.container}>
        <View style={styles.loaderContainer}>
            <Text style={styles.title}>{title}</Text>
            <InputField
                labelText={label}
                labelTextSize={16}
                labelColor={Colors.regular}
                textColor={Colors.regular}
                borderBottomColor={Colors.regular}
                inputType="numeric"
                customStyle={{ marginBottom: 30 }}
                onChangeText={(text) => {
                    if (text) {
                        handleChangeText(text)
                    } else {
                        handleChangeText(0)
                    }
                }}
                showCheckmark={false}
                autoFocus={true}
                autoCapitalize="none"
            />
            <View style={styles.containerBtn}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.lightRed }]}
                    onPress={() => handleModal()}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSubmit(produto)}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Retirar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

export default Modal;

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        height: '100%',
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.thirth,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: Fonts.big,
        fontWeight: '600',
        color: Colors.white,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 5,
        textAlign: 'center',
    },
    loaderContainer: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 20,
        margin: 10,
    },
    title: {
        fontSize: Fonts.bigger,
        fontWeight: '500',
        color: Colors.thirth,
        textAlign: 'center',
        marginBottom: 30,
    }
});
