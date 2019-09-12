import React from "react";
import {StyleSheet, Text,  View, Modal, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {withTheme} from "../constants/ThemeProvider";

const ContextMenu = (props) => {
    const styles = createStyle(props.theme);

    const onPressOption = (action) => {
        action();
        props.closeMenu();
    };

    let options = props.options.map((option, index) => {
        return (
            <TouchableOpacity key={index} onPress={onPressOption.bind(this, option.onPress)}>
                <View style={styles.option}>
                    <Text style={styles.optionText}>{option.text}</Text>
                </View>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.modal}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visible}
                onRequestClose={() => props.closeMenu()}
            >
                <TouchableWithoutFeedback onPress={() => props.closeMenu()}>
                    <View style={styles.outerView}>

                        <TouchableWithoutFeedback>
                            <View style={styles.menu}>
                                {options}
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    );
};

const createStyle = (theme) => StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    outerView: {
        backgroundColor: "rgba(0,0,0,0.5)", // 50% opacity
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    menu: {
        backgroundColor: theme.background,
        width: "90%",
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 1
    },
    option: {
        justifyContent: "center",
        backgroundColor: theme.tabIconDefault,
        width: "100%",
        height: 50,
        borderBottomColor: theme.textColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.textColor,
        borderTopWidth: StyleSheet.hairlineWidth

    },
    optionText: {
        marginHorizontal: 20,
        fontSize: 20
    }
});

export default withTheme(ContextMenu);