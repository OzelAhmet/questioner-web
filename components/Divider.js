import React from 'react';
import {StyleSheet, View } from 'react-native';

const Divider = (props) => {
    return (
        <View style={styles.divider}>
        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        borderWidth:0.5,
        borderColor: "grey",
        height:0,
        width: "100%"
    }
});

export default Divider;