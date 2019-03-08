import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../../styles/Colors';
import { transparentHeaderStyle } from '../../routes/HeaderStyle';
import InputField from '../../components/inputs/InputField';
import IphoneSize from '../../helpers/iphoneSize';
import Loader from '../../components/loader';
import RoundedButton from '../../components/buttons/RoundedButton';
import styles from './styles';
import Logo from '../../components/logo';

import AuthActions from '../../stores/ducks/auth';

const size = IphoneSize();
let headingTextSize = 34;

if (size === 'small') {
    headingTextSize = 28;
}

class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: transparentHeaderStyle,
        headerTintColor: Colors.primary,
    });

    constructor(props) {
        super(props);
        this.state = {
            formValid: true,
            validCodigo: false,
            matricula: '',
            senha: '',
            validSenha: false,
        }
    }

    handleNextButton = () => {
        const { matricula, senha } = this.state;
        const { loginAuth, navigation } = this.props;
        loginAuth(matricula, senha, navigation);
    }

    handleMatriculaChange = (matricula) => {
        this.setState({ matricula, validCodigo: true });
    }

    handlePasswordChange = (senha) => {
        this.setState({ senha });
        if (!this.state.validSenha) {
            if (senha.length > 2) {
                this.setState({ validSenha: true });
            }
        } else {
            if (senha.length < 3) {
                this.setState({ validSenha: false });
            }
        }
    }

    toggleNextButtonState = () => {
        const { validCodigo, validSenha } = this.state;
        if (validCodigo && validSenha) {
            return false;
        }
        return true;
    }

    render() {
        const { loading } = this.props.auth;
        const { validCodigo, validSenha } = this.state;
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView
                    style={styles.container}>
                    <ScrollView
                        style={styles.scrollView}>
                        <Logo />
                        <InputField
                            labelText="Código"
                            labelTextSize={16}
                            labelColor={Colors.primary}
                            textColor={Colors.white}
                            borderBottomColor={Colors.primary}
                            inputType="numeric"
                            customStyle={{ marginBottom: 30 }}
                            onChangeText={this.handleMatriculaChange.bind(this)}
                            showCheckmark={validCodigo}
                            autoFocus={true}
                            autoCapitalize="none"
                        />
                        <InputField
                            labelText="Senha"
                            labelTextSize={16}
                            labelColor={Colors.primary}
                            textColor={Colors.white}
                            borderBottomColor={Colors.primary}
                            inputType="password"
                            customStyle={{ marginBottom: 30 }}
                            onChangeText={this.handlePasswordChange.bind(this)}
                            showCheckmark={validSenha}
                            autoCapitalize="none"
                        />
                        <RoundedButton
                            text="Acessar"
                            textColor={Colors.secondary}
                            textAlign="center"
                            textSize={22}
                            background={Colors.white}
                            borderColor="transparent"
                            iconPosition="right"
                            disabled={this.toggleNextButtonState()}
                            loading={false}
                            handleOnPress={this.handleNextButton.bind(this)}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
                {loading
                    ?
                    <Loader />
                    :
                    null
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);