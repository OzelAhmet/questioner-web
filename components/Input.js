import React from 'react';
import {StyleSheet,  TextInput} from "react-native";
import {withTheme} from "../constants/ThemeProvider";

const Input = (props) => {
    const styles = createStyle(props.theme);

    return (
        <TextInput
            {...props}
            style={{...styles.input, ...props.style}}
        />
    );
};

const createStyle = (theme) => StyleSheet.create({
    input: {
        fontSize: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default withTheme(Input);