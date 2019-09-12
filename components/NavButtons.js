import React from 'react';
import {StyleSheet, View} from 'react-native';

import Icon from "./Icon";
import {withTheme} from "../constants/ThemeProvider";

const NavButtons = (props) => {
    const styles = createStyle(props.theme);

    return (
            <View style={styles.container}>
                <Icon
                    disabled={props.leftDisabled} onPress={props.onPressLeft}
                    name={"arrow-dropleft-circle"}
                    style={styles.icon}
                />
                <Icon
                    disabled={props.rightDisabled} onPress={props.onPressRight}
                    name={"arrow-dropright-circle"}
                    style={styles.icon}
                />
            </View>
    );
};

const createStyle = (theme) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginRight: 10
    },
    icon: {
        paddingHorizontal: 5,
    }
});

export default withTheme(NavButtons);