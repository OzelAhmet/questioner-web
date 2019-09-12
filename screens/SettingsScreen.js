import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import {ThemeContext, withTheme} from "../constants/ThemeProvider";

const SettingsScreen = () => {
    const {theme, themes, setTheme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const themeHandler = () => {
        if (theme===themes.dark) {
            setTheme(themes.light);
        } else {
            setTheme(themes.dark);
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.option}>
                    <Text style={styles.text}>Dark Theme (Not Works Properly)</Text>
                    <Switch
                        value={theme===themes.dark}
                        thumbColor={theme.tabIconSelected}
                        trackColor={{true: theme.tabIconSelectedLight}}
                        ios_backgroundColor={theme.tabIconSelectedLight}
                        onChange={themeHandler}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    },
    option: {
        width: "100%",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.secondBackGround,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey"
    },
    text: {
        fontSize: 20,
        color: theme.textColor
    }
});

SettingsScreen.navigationOptions = {
    title: 'Settings',
};

export default SettingsScreen;