import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvisosActions from '../../stores/ducks/avisos';
import styles from './styles';
import Perfil from '../../components/perfil';
import Colors from '../../styles/Colors';
import { getUser } from '../../services/auth';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisos: [],
            user: {}
        }
    }

    componentDidMount() {
        //Verifico se caso a tab compras estiver em focus eu chamo o metodo getAllCompras, e caso seja busca de compras por produto 
        //eu chamo getComprasPorProduto
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.getAllAvisos()),            
        ];
        this.getAllAvisos();

    }

    getAllAvisos = async () => {
        const { getAvisos } = this.props;
        const [avisos, user] = await Promise.all([
            getAvisos(),       
            getUser()
                .then(user => this.setState({ user: JSON.parse(user) }))                 
        ]);
    }

    render() {
        const { user } = this.state;
        const { navigation } = this.props;
        const { avisos, loading } = this.props.avisos;
        return (
            <View style={styles.wrapper}>
                <Perfil navigation={navigation} user={user} />
                <Text style={styles.label}>Avisos</Text>
                <ScrollView style={styles.wrapper}>
                    {loading
                        ?
                        <ActivityIndicator size="large" color={Colors.secondary} />
                        :
                        avisos.length > 0 
                        ?
                        avisos.map(aviso => (
                            <View
                                key={aviso.id}
                                style={styles.containerAviso}>
                                <Text style={styles.labelAviso}>{aviso.nome}</Text>
                                <Text style={styles.mensagemAviso}>{aviso.mensagem}</Text>
                            </View>
                        ))
                        :
                        <Text style={[styles.mensagemAviso, { textAlign: 'center' }]}>Nenhum aviso encontrado</Text>
                        }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    avisos: state.avisos,
    auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(AvisosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);