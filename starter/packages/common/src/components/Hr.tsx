import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ViewStyle,
    StyleProp,
    TextStyle
} from 'react-native';
import R from '@app/res/R';


interface Props{
    lineStyle?: StyleProp<ViewStyle>
    text?: string
    textStyle?: StyleProp<TextStyle>
    marginLeft?: number
    marginRight?:number
    marginTop?: number
    marginBottom?:number
}

class Hr extends Component<Props,Object> {
    constructor(props:Props) {
        super(props);

        this.renderLine = this.renderLine.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderInner = this.renderInner.bind(this);
    }

    renderLine(key:any) {
        return <View key={key} style={[styles.line, this.props.lineStyle]} />
    }

    renderText(key:any) {
        return (
            <View key={key} >
            <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
            </View>
        )
    }

    renderInner() {
        if (!this.props.text) {
            return this.renderLine(1)
        }
        return [
            this.renderLine(1),
            this.renderText(2),
            this.renderLine(3)
        ]
    }

    render() {

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: this.props.marginLeft, marginRight: this.props.marginRight }}>
                {this.renderInner()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: R.colors.border
    },
    text: {
        flex: 1,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    }
});

export default Hr;
