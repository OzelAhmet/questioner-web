import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

const CollectionItem = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        marginVertical: 5,
        padding: 5,
        paddingLeft: 30,
        justifyContent: "center",
        backgroundColor: Colors.theme.tabIconSelected,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    text: {
        fontSize: 25,
        color: "#fff"
        // color: Colors.theme.textColor
    }
});

export default CollectionItem;