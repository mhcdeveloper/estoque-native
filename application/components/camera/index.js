import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RNCamera } from "react-native-camera";

import ProdutosActions from '../../stores/ducks/produtos';
import BarCodeFinder from "./BarCodeFinder";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: ""
        };
    }

    onBarCodeRead = (e) => {
        const { navigation, getQrcode } = this.props;
        getQrcode(e.data)
        navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => (this.camera = cam)}
                >
                    <BarCodeFinder width={280} height={220} borderColor={'red'} borderWidth={2} />
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => bindActionCreators(ProdutosActions, dispatch);
export default connect(null, mapDispatchToProps)(Scanner);