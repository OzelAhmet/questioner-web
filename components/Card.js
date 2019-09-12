import React from "react";
import {StyleSheet,  View} from "react-native";
import {withTheme} from "../constants/ThemeProvider";

const Card = (props) => {
    const styles = createStyle(props.theme);

    return (
        <View {...props} style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const createStyle = (theme) => StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: theme.background,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10
    }
});

export default withTheme(Card);