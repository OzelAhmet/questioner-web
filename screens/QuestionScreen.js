import React from 'react';
import {ScrollView, StyleSheet, Text, View,} from 'react-native';

import Card from "../components/Card";
import Choice from "../components/Choice";
import NavButtons from "../components/NavButtons";
import Colors from "../constants/Colors";

const QuestionScreen = (props) => {

    QuestionScreen.changeQuestionHandler = (questionId, questionList) => {
        props.navigation.navigate("Question", {
                questionId: questionId,
                questionList: questionList
            }
        );
    };


    const question = {
        id: 1,
        title: 'Q1',
        questionString: "Capital city of Turkey?",
        choices: [
            {choice: "Izmir"},
            {choice: "Ankara"},
            {choice: "Istanbul"},
            {choice: "Kutahya"}
        ]
    };

    let choices = question.choices.map(choiceItem => (
        <Choice
            key={question.choices.indexOf(choiceItem)}
            style={styles.choice}
        >
            {question.choices.indexOf(choiceItem)}. {choiceItem.choice}
        </Choice>
    ));

    return (
        <View style={styles.screen}>
            <Card style={styles.questionCard}>
                <ScrollView>
                    <Text style={styles.questionString}>
                        {question.questionString}
                    </Text>
                </ScrollView>
            </Card>
            <Card style={styles.choicesCard}>
                <ScrollView>
                    {choices}
                </ScrollView>
            </Card>
        </View>
    );
};

QuestionScreen.navigationOptions = ({navigation}) => {
    const questionId = navigation.getParam("questionId");
    const questionList = navigation.getParam("questionList");
    const prevId = questionList[questionList.indexOf(questionId) - 1];
    const nextId = questionList[questionList.indexOf(questionId) + 1];

    return {
        title: ("Question id: " + navigation.getParam("questionId")),
        headerRight: (
            <NavButtons
                leftDisabled={prevId === undefined}
                rightDisabled={nextId === undefined}
                onPressLeft={() => QuestionScreen.changeQuestionHandler(prevId, questionList)}
                onPressRight={() => QuestionScreen.changeQuestionHandler(nextId, questionList)}
            />
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.theme.background,

    },
    questionCard: {
        maxHeight: "43%",
        marginTop: 10,
        marginHorizontal: 10,
    },
    questionString: {
        fontSize: 20
    },
    choicesCard: {
        maxHeight: "51%",
        margin: 10
    },
    choice: {
        fontSize: 10,
    }


});

export default QuestionScreen;
