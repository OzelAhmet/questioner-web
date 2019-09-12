import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, Alert} from 'react-native';

import Card from "../components/Card";
import Choice from "../components/Choice";
import NavButtons from "../components/NavButtons";
import * as Server from "../api/server";
import {ThemeContext} from "../constants/ThemeProvider";

const QuestionType = {
    NONE: "none",
    ANSWER: "answer",
    SURVEY: "survey",
    CLASSIC: "classic"
};

const QuestionScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const [questionId, setQuestionId] = useState(props.navigation.getParam("questionId"));
    const [question, setQuestion] = useState({choices: []});
    const [questionType, setQuestionType] = useState(QuestionType.NONE);
    const [showAnswer, setShowAnswer] = useState(false);
    const [choiceSelected, setChoiceSelected] = useState(false);

    useEffect(() => {
        getQuestionFromServer(props.navigation.getParam("questionId"))
    }, []);

    QuestionScreen.changeQuestionHandler = (questionId) => {
        getQuestionFromServer(questionId);
        setQuestionId(questionId);
        setChoiceSelected(false);
        setShowAnswer(false);
        props.navigation.setParams({"questionId": questionId});
        /*
        props.navigation.goBack();
        props.navigation.navigate("Question", {
                questionId: questionId,
                questionList: questionList
            }
        );
         */
    };

    const getQuestionFromServer = (questionId) => {
        Server.getQuestionById(questionId).then(response => {
            setQuestion(response.body);
            props.navigation.setParams({"questionTitle": response.body.title});
            // set question type
            if (response.body.choices){
                if (response.body.answer) {
                    setQuestionType(QuestionType.ANSWER)
                } else {
                    setQuestionType(QuestionType.SURVEY)
                }
            } else {
                setQuestionType(QuestionType.CLASSIC)
            }
        });
    };

    const choiceSelectionHandler = (choice) => {
        setChoiceSelected(choice);
        question.choices.map(c => {if (c.choice===choice) c.count++;});
        Server.incrementAnswer(questionId, choice);
    };

    const choiceStyler = (choice) => {
        let style = styles.choice;
        if (choice === choiceSelected){ //pressed choice
            style = {...style, borderWidth: 3};
        }
        if (questionType===QuestionType.ANSWER && choiceSelected!==false){
            if (choice===question.answer){ // correct choice
                style = {...style, borderColor: theme.correctAnswer};
            }
            else { // wrong choice
                style = {...style, borderColor: theme.wrongAnswer};
            }
        }
        return style;
    };


    // Set Bottom Card (Answer Card)
    let bottomCard = null;
    if (question.choices) {
        bottomCard = question.choices.map(choiceItem => (
            <Choice
                key={choiceItem.id}
                style={choiceStyler(choiceItem.choice)}
                onPress={choiceSelectionHandler.bind(this, choiceItem.choice)}
                disabled={choiceSelected!==false}
            >
                {question.choices.indexOf(choiceItem)}. {choiceItem.choice} {choiceSelected && "("+choiceItem.count+")"}
            </Choice>
        ));
    } else if (questionType===QuestionType.CLASSIC) {
        bottomCard = (
            <View>
                {!showAnswer && <Button title={showAnswer ? "Hide answer": "Show Answer"} onPress={() => setShowAnswer(~showAnswer)} />}
                {showAnswer && <Text style={styles.answerText}>Answer:{"\n"}{question.answer}</Text>}
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.questionCard}>
                <ScrollView>
                    <Text style={styles.questionSentence}>
                        {question.questionSentence}
                    </Text>
                </ScrollView>
            </Card>
            <Card style={styles.choicesCard}>
                <ScrollView>
                    {bottomCard}
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
        title: (navigation.getParam("questionTitle")),
        headerRight: (
            <NavButtons
                leftDisabled={prevId === undefined}
                rightDisabled={nextId === undefined}
                onPressLeft={() => QuestionScreen.changeQuestionHandler(prevId)}
                onPressRight={() => QuestionScreen.changeQuestionHandler(nextId)}
            />
        )
    };
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    },
    questionCard: {
        maxHeight: "43%",
        marginTop: 10,
        marginHorizontal: 10,
    },
    questionSentence: {
        color: theme.textColor,
        fontSize: 20
    },
    choicesCard: {
        maxHeight: "51%",
        margin: 10
    },
    choice: {
        fontSize: 10,
    },
    answerText: {
        color: theme.textColor,
        fontSize: 20,
        padding: 10
    }
});

export default QuestionScreen;
