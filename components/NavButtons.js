import React from 'react';
import {StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const NavButtons = (props) => {

    return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.4} disabled={props.leftDisabled} onPress={props.onPressLeft}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-arrow-dropleft-circle' : 'md-arrow-dropleft-circle'}
                        size={26}
                        style={styles.icon}
                        color={props.leftDisabled ? Colors.theme.tabIconDefault : Colors.theme.tabIconSelected}
                    />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4} disabled={props.rightDisabled} onPress={props.onPressRight}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-arrow-dropright-circle' : 'md-arrow-dropright-circle'}
                        size={26}
                        style={styles.icon}
                        color={props.rightDisabled ? Colors.theme.tabIconDefault : Colors.theme.tabIconSelected}
                    />
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginRight: 10
    },
    icon: {
        paddingHorizontal: 5,
    }
});

export default NavButtons;