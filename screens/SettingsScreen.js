import React, {useState} from 'react';
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import Colors from "../constants/Colors";

export default function SettingsScreen() {
    const [theme, setTheme] = useState(false);

    const themeHandler = () => {
        if (theme) {
            setTheme(false);
            // Colors.theme = Colors.dark;
        } else {
            // TODO: set true
            setTheme(true);
            // Colors.theme = Colors.dark;
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.option}>
                    <Text style={styles.text}>No Setting</Text>
                    <Switch
                        value={theme}
                        thumbColor={Colors.theme.tabIconSelected}
                        trackColor={{true: Colors.theme.tabIconSelectedLight}}
                        ios_backgroundColor={Colors.theme.tabIconSelectedLight}
                        onChange={themeHandler}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.theme.background,
    },
    option: {
        width: "100%",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.theme.secondBackGround,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey"
    },
    text: {
        fontSize: 20,
        color: Colors.theme.textColor
    }
});

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
