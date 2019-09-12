import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Button, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import * as Server from "../api/server";
import Input from "../components/Input";
import {ThemeContext} from "../constants/ThemeProvider";

const AddCollectionScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const [collectionName, setCollectionName] = useState("");

    const addCollectionHandler = () => {
        if (collectionName.trim() === ""){
            Alert.alert("Error", "Collection name cannot be empty.");
            return;
        }
        Server.addCollection({name: collectionName}).then(response => {
            Alert.alert("Added", response.message);
            props.navigation.state.params.onGoBack();
            props.navigation.goBack();
        });
    };

    const cancelHandler = () => {
        props.navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Input
                    blurOnSubmit
                    style={styles.input}
                    value={collectionName}
                    onChangeText={setCollectionName}
                />
                <View style={styles.buttonGroup}>
                    <View style={styles.button}>
                        <Button title={"Cancel"} color={theme.danger} onPress={cancelHandler}/>
                    </View>
                    <View style={styles.button}>
                        <Button title={"Add"} color={theme.primary} style={styles.button} onPress={addCollectionHandler}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

AddCollectionScreen.navigationOptions = ({navigation}) => {
    return {
        title: "Add New Collection"
    };
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        top: 0,
        height: "75%",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "90%",
        padding: 10
    },
    buttonGroup: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    button: {
        width: "40%"
    }
});

export default AddCollectionScreen;
