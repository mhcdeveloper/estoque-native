import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Platform, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageResizer from 'react-native-image-resizer';

import StoriesActions from '../../stores/ducks/stories';
import Colors from '../../styles/Colors';

class StorieCamera extends Component {
    state = {
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        loading: false
    };

    static navigationOptions = () => {
        return {
            headerTitle: (
                <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Camera Storie</Text>
                </View>
            )
        };
    };

    takePicture = async function () {
        const { setStorie, navigation } = this.props;
        this.setState({ loading: true });
        if (this.camera) {
            const data = await this.camera.takePictureAsync({forceUpOrientation: true, fixOrientation: true});
            if (data) {
                ImageResizer.createResizedImage(data.uri, 600, 800, 'JPEG', 100).then((response) => {
                    const storie = {
                        img: response.uri
                    }
                    setStorie(storie);
                    this.setState({ loading: false });
                    navigation.goBack();
                }).catch((err) => {
                    alert(err)                 
                });
            }
        }
    };

    renderCamera() {
        const { loading, type, autoFocus } = this.state;
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}
                type={type}
                autoFocus={autoFocus}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {loading
                        ?
                        <ActivityIndicator size="large" color="white" />
                        :
                        <TouchableOpacity
                            style={[styles.flipButton, styles.picButton]}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Icon name="camera" size={50} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'transparent',
    },
});

mapDispatchToProps = dispatch => bindActionCreators(StoriesActions, dispatch);

export default connect(null, mapDispatchToProps)(StorieCamera);