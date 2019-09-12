import React from 'react';
import {Platform, TouchableOpacity} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import {withTheme} from "../constants/ThemeProvider";

const Icon = (props) => {
    const theme = props.theme;

    return (
        <TouchableOpacity {...props} activeOpacity={0.4} disabled={props.disabled} onPress={props.onPress}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-'+props.name : 'md-'+props.name}
                size={26}
                color={props.disabled ? theme.tabIconDefault : theme.tabIconSelected}
            />
        </TouchableOpacity>
    );
};

export default withTheme(Icon);
