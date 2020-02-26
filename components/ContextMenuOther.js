import React, {useState} from "react";
import {StyleSheet, Text,  View, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, AppRegistry} from "react-native";
import Colors from "../constants/Colors";

/**
 *
 * Similar to "Alert.alert"
 * To use this component use "ContextMenuOther.openMenu(options: Array)"
 *
 * Example:
 * ContextMenuOther.openMenu([
 *     {
 *          text: "Delete",
 *          onPress: () => console.log("delete_action")
 *     }
 * ])
 *
 */
const ContextMenuOther = (props) => {
    const styles = createStyle(Colors.light);

    const [open, setOpen] = useState(true);
    const [actions, setActions] = useState(props.actions);
    ContextMenuOther.setOpen = setOpen;
    ContextMenuOther.setActions = setActions;

    const closeMenu = () => {
        setOpen(false);

    };

    const onPressOption = (action) => {
        action();
        setOpen(false);
    };

    let options = actions.map((option, index) => {
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
                visible={open}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.outerView}>

                        <TouchableWithoutFeedback>
                            <View style={styles.menu}>
                                <ScrollView>
                                    {options}
                                </ScrollView>
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
        justifyContent: "center",
        height: 0
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
        maxHeight: 225, // 4.5 option max
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

// open menu by calling this function
ContextMenuOther.openMenu = (actions) => {
    if ( AppRegistry.getAppKeys().includes("ContextMenuOther") === false ){
        AppRegistry.registerComponent("ContextMenuOther", () => ContextMenuOther);
        AppRegistry.runApplication("ContextMenuOther", {
            // Don't know how to choose this number
            rootTag: 15,
            initialProps: {actions: actions}
        });
    } else {
        ContextMenuOther.setOpen(true);
        ContextMenuOther.setActions(actions);
    }
};


export default ContextMenuOther;