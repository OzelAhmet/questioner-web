import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, ScrollView, Button, CheckBox, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import * as Server from "../api/server";
import Input from "../components/Input";
import Card from "../components/Card";
import Icon from "../components/Icon";
import {ThemeContext} from "../constants/ThemeProvider";

const AddQuestionScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const [title, setTitle] = useState("");
    const [questionSentence, setQuestionSentence] = useState("");
    const [answer, setAnswer] = useState(null);
    const [choiceList, setChoiceList] = useState([]);

    const [choiceListChange, setChoiceListChange] = useState(0); //To understand choices is changed
    const [answerCheckBox, setAnswerCheckBox] = useState(false); // there is answer or not

    const addQuestionHandler = () => {
        // Control form
        if (title.trim() === ""){
            Alert.alert("Error", "Title cannot be empty."); return;
        }
        if (questionSentence.trim() === ""){
            Alert.alert("Error", "Question Sentence cannot be empty."); return;
        }
        if (answer && answer.trim() === ""){
            Alert.alert("Error", "Title cannot be empty."); return;
        }
        if (answer===null && choiceList.length === 0){
            Alert.alert("Error", "There must be answer or choices or both."); return;
        }
        if (answerCheckBox && choiceList.length > 0 && !choiceList.includes(answer)){
            Alert.alert("Error", "Answer must be one of choices."); return;
        }
        if (choiceList.length === 1){
            Alert.alert("Error", "There must be zero or multiple choices."); return;
        }
        if (choiceList.length > 0 && choiceList.includes("")){
            Alert.alert("Error", "There cannot be empty choices."); return;
        }

        const question = {
            title: title,
            questionSentence: questionSentence,
            answer: answer,
            choices: choiceList.map(c => {return  {choice: c}})
        };
        // TODO: fix below
        Server.addQuestion(question).then(response => {
            Server.addQuestionToCollection(props.navigation.getParam("collectionId"), response.body.id).then(response2 => {
                Alert.alert("Added", response2.body);
                props.navigation.state.params.onGoBack();
                props.navigation.goBack();
            });
        });
    };

    const cancelHandler = () => {
        props.navigation.goBack();
    };

    const answerCheckBoxHandler = (value) => {
        setAnswerCheckBox(value);
        setAnswer(null);
    };

    const addChoiceHandler = () => {
        choiceList.push("");
        setChoiceListChange(choiceListChange+1);
    };
    const deleteChoiceHandler = (index) => {
        choiceList.splice(index, 1);
        setChoiceListChange(choiceListChange+1);
    };
    const changeChoiceHandler = (index, value) => {
        choiceList[index] = value;
        setChoiceListChange(choiceListChange+1);
    };

    let choices = choiceList.map((choice, index) => {
        return (
            <View key={index} style={styles.answerContainer}>
                <Icon
                    name={"close"}
                    onPress={deleteChoiceHandler.bind(this, index)}
                />
                <Input
                    blurOnSubmit
                    multiline
                    style={styles.input}
                    value={choiceList[index]}
                    onChangeText={(value) => changeChoiceHandler(index, value)}
                />
            </View>
        );
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <View style={styles.screen}>
                    <Input
                        blurOnSubmit
                        style={styles.input}
                        placeholder={"Title"}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Input
                        blurOnSubmit
                        multiline
                        style={styles.input}
                        placeholder={"Question Sentence"}
                        value={questionSentence}
                        onChangeText={setQuestionSentence}
                    />
                    <View style={styles.answerContainer}>
                        <CheckBox
                            value={answerCheckBox}
                            onValueChange={answerCheckBoxHandler}
                        />
                        <Input
                            blurOnSubmit
                            multiline
                            placeholder={answerCheckBox ? "Answer" : "No Answer"}
                            editable={answerCheckBox}
                            style={styles.input}
                            value={answer}
                            onChangeText={setAnswer}
                        />
                    </View>
                    <Card style={styles.choicesCard}>
                        <ScrollView>
                            {choices}
                            <Button title={"Add Choice"} color={theme.primary} onPress={addChoiceHandler}/>
                        </ScrollView>
                    </Card>
                    <View style={styles.buttonGroup}>
                        <View style={styles.button}>
                            <Button title={"Cancel"} color={theme.danger} onPress={cancelHandler}/>
                        </View>
                        <View style={styles.button}>
                            <Button title={"Add"} color={theme.primary} style={styles.button} onPress={addQuestionHandler}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

AddQuestionScreen.navigationOptions = ({navigation}) => {
    return {
        title: "Add New Question"
    };
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "90%",
        padding: 5
    },
    answerContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    choicesCard :{
        width: "90%",
        margin: 10
    },
    buttonGroup: {
        width: "90%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    button: {
        width: "40%"
    }
});

export default AddQuestionScreen;
