import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Platform, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from '../../components/loader';
import styles from './styles';
import Colors from '../../styles/Colors';
import RoundedButton from '../../components/buttons/RoundedButton';
import StoriesActions from '../../stores/ducks/stories';
import { getUser } from '../../services/auth';
import StorieItem from './StorieItem';
import StorieList from './StorieList';

class Stories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    static navigationOptions = () => {
        return {
            headerTitle: (
                <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Status Clientes</Text>
                </View>
            )
        };
    };

    componentDidMount() {
        this.getStoriesByLoja();
    }

    getStoriesByLoja = async () => {
        await getUser().then(user => this.setState({ user: JSON.parse(user) }, _ => {
            this.props.getStories(this.state.user.loja);
        }));
    }

    enviarFechamento = () => {
        const { user } = this.state;
        const { enviarStorie } = this.props;
        const { stories } = this.props.stories;
        if (stories.length > 0) {
            const data = {
                loja: user.loja,
                dtRegistro: moment(new Date()).format('DD/MM/YYYY'),
                stories: JSON.parse(JSON.stringify(stories)),
                idFuncionario: user.idFuncionario
            }
            enviarStorie(data)
        } else {
            Alert.alert(
                'Ocorreu um erro.',
                `É necessário pelo menos uma imagem!`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    removeStorie = (item) => {
        this.props.removeStorie(item);
    }

    removeStorieAtivo = (item) => {
        Alert.alert(
            'Atenção! Aviso importante',
            `Deseja realmente remover o store ?`,
            [
                { text: 'Cancel', onPress: () => null },
                { text: 'OK', onPress: () => this.props.removeStorieAtivo(item) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { navigation } = this.props;
        const { stories, loading, storiesList } = this.props.stories;
        return (
            <View style={styles.wrapper}>
                {loading
                    ?
                    <Loader />
                    :
                    <ScrollView
                        style={styles.wrapper}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={this.getAllCompras}
                            />
                        }>
                        <Text style={[styles.label, { textAlign: 'center' }]}>Stories Ativo</Text>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            style={styles.container}
                            showsHorizontalScrollIndicator={false}>
                            {storiesList.length > 0
                                ?
                                storiesList.map((item, index) => (
                                    <StorieList
                                        key={index}
                                        item={item}
                                        remove={this.removeStorieAtivo.bind(this)}
                                    />
                                ))
                                :
                                <View style={styles.containerInfo}>
                                    <Text style={styles.labelEmpty}>Nenhum Storie encontrado</Text>
                                </View>
                            }

                        </ScrollView>
                        <ScrollView style={styles.containerInput}>
                            <View style={styles.container}>
                                <Text style={[styles.label, { textAlign: 'center' }]}>Novo storie</Text>
                                <View>
                                    {stories.length > 0
                                        ?
                                        stories.map((storie, index) => (
                                            <StorieItem
                                                key={index}
                                                item={storie}
                                                remove={this.removeStorie.bind(this)}
                                            />
                                        ))
                                        :
                                        <Text style={styles.labelEmpty}>Nenhum Storie adicionado</Text>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.containerBtn}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.navigate('StorieCamera')}
                                activeOpacity={0.7}>
                                <Icon name="camera" size={40} color={Colors.secondary} />
                            </TouchableOpacity>
                            <RoundedButton
                                text="Enviar Storie"
                                textColor={Colors.white}
                                textAlign="center"
                                textSize={18}
                                background={Colors.thirth}
                                borderColor="transparent"
                                iconPosition="right"
                                disabled={false}
                                loading={false}
                                handleOnPress={() => this.enviarFechamento()}
                            />
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.stories,
});

const mapDispatchToProps = dispatch => bindActionCreators(StoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stories);