import React from 'react';
import {StyleSheet, View } from 'react-native';
import {withTheme} from "../constants/ThemeProvider";

const Divider = (props) => {
    const styles = createStyle(props.theme);

    return (
        <View style={styles.divider}>
        </View>
    );
};

const createStyle = (theme) => StyleSheet.create({
    divider: {
        borderWidth:0.5,
        borderColor: "grey",
        height:0,
        width: "100%"
    }
});

export default withTheme(Divider);