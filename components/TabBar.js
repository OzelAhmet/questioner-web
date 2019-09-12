import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation';
import {withTheme} from "../constants/ThemeProvider";


const TabBar = props => {
    const styles = createStyle(props.theme);

    return (
        <BottomTabBar
            {...props}
            activeTintColor={props.theme.tabIconSelected}
            style={styles.tabBar}
            labelStyle={styles.label}
        />
    );
};

const createStyle = (theme) => StyleSheet.create({
    tabBar: {
        backgroundColor: theme.secondBackGround
    },
    label: {

    },
});

export default withTheme(TabBar);