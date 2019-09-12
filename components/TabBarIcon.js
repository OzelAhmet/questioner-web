import React from 'react';
import {Platform} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import {withTheme} from "../constants/ThemeProvider";

const TabBarIcon = (props) => {
    const theme = props.theme;

    return (
        <Ionicons
            name={props.name}
            size={26}
            color={props.focused ? theme.tabIconSelected : theme.tabIconDefault}
            style={{marginTop: -3}}
        />
    );
};

export default withTheme(TabBarIcon);