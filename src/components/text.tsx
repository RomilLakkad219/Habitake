import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

//CONSTANT
import { COLORS, FONT_NAME } from '../constants';

interface TextProps {
    style?: StyleProp<TextStyle> | undefined;
    font?: string | undefined;
    color?: string | undefined;
    align?: "auto" | "left" | "right" | "center" | "justify" | undefined;
    size?: number | undefined;
    lineHeight?: number;
    children: any | undefined;
    numberOfLines?: number | undefined;
    onPress?: () => void;
    ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}
function Text(props: TextProps & TextProps) {

    const fontFamily: string | undefined = props.font ? props.font : undefined;
    const fontSize: number = props.size ? props.size : 13;
    const fontColor: string = props?.color ?? COLORS.black;
    const align: "auto" | "left" | "right" | "center" | "justify" | undefined = props?.align ?? 'left'
    const lineHeight: number | undefined = props?.lineHeight;

    return (
        <RNText
            {...props}
            onPress={props.onPress}
            numberOfLines={props.numberOfLines}
            ellipsizeMode={props.ellipsizeMode}
            style={[
                props.style,
                {
                    color: fontColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    textAlign: align,
                    lineHeight: lineHeight,
                },
            ]}>
            {props.children}
        </RNText>
    );
}

Text.defaultValue = {
    style: {},
    size: 13,
    color: '#000',
    font: FONT_NAME.regular,
};

export default Text;
