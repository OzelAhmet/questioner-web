import React from "react";
import {StyleSheet,  View} from "react-native";
import Colors from "../constants/Colors";

const Card = (props) => {
    return (
        <View {...props} style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: Colors.theme.background,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10
    }
});

export default Card;