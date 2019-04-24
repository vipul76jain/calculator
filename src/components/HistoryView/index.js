import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

export default class HistoryView extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            return true;
        }
        return false
    }

    _onClear = () => {
        this.props.onClear();
    }

    render() {
        let bEmpty = false;
        if (this.props.data.length === 0) {
            bEmpty = true;
        }

        return (
            <View style={styles.container}>
                <View style={styles.clearCont}>
                    <Text
                        onPress={() => this._onClear()}
                        style={styles.txtClear}>
                        CLEAR HISTORY
                    </Text>
                </View>
                {!bEmpty ?
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>


                        {
                            this.props.data.map((history, index) => (
                                <View key={index} style={styles.historyCont}>
                                    <View style={styles.placeHolderHistory}>
                                        <View style={styles.expressionCont}>
                                            <Text style={styles.txtExpression}>{history[0]}</Text>
                                        </View>
                                        <View style={styles.resultCont}>
                                            <Text style={styles.txtResult}>{'=' + history[1]}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    :
                    <View style={styles.emptyHistoryCont}>
                        <Text style={styles.txtEmptyHistory}>NO HISTORY</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    clearCont: {
        height: 60,
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingTop: 40,
        justifyContent: 'center'
    },

    txtClear: {
        color: 'grey',
        fontFamily: 'Helvetica-Light',
        fontSize: 15
    },

    txtExpression: {
        color: '#27ae60',
        fontFamily: 'Helvetica-Light',
        fontSize: 15
    },

    txtResult: {
        color: '#27ae60',
        fontFamily: 'Helvetica-Light',
        fontSize: 15
    },

    historyCont: {
        flex: 1,
        flexDirection: 'column'
    },

    placeHolderHistory: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        borderTopWidth: 0.7,
        borderColor: '#000'
    },

    expressionCont: {
        flex: 0.7,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },

    resultCont: {
        flex: 0.3,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },

    emptyHistoryCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtEmptyHistory: {
        color: '#7f8c8d',
        fontFamily: 'Helvetica-Light',
        fontSize: 15
    }
});