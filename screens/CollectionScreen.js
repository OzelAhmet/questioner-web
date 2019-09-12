import React, {useEffect, useState, useContext} from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';
import QuestionItem from "../components/QuestionItem";
import * as Server from "../api/server";
import Icon from "../components/Icon";
import ContextMenu from "../components/ContextMenu";
import {ThemeContext} from "../constants/ThemeProvider";

const CollectionScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const [collection, setCollection] = useState({questionList:[]});
    const [listChanged, setListChanged] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuQuestion, setMenuQuestion] = useState(null);

    // componentDidMount
    useEffect(() => {
        const collectionId = props.navigation.getParam("collectionId");
        Server.getCollectionById(collectionId).then(response => {
            setCollection(response.body);
            setListChanged(false);
        });
    }, [listChanged]);

    const openQuestionHandler = (questionId, questionTitle) => {
        props.navigation.navigate("Question", {
                questionId: questionId,
                questionTitle: questionTitle,
                questionList: collection.questionList.map(question => question.id)
            }
        );
    };

    CollectionScreen.addQuestionHandler = () => {
        props.navigation.navigate("AddQuestion", {
            collectionId: props.navigation.getParam("collectionId"),
            onGoBack: () => setListChanged(true),
        });
    };

    const deleteQuestionHandler = (question) => {
        const deleteAction = () => {
            Server.deleteQuestion(question.id).then(response => {
                if (response.responseCode === 200){
                    Alert.alert("Deleted", response.message);
                    setListChanged(true);
                } else {
                    Alert.alert("Error", response.message+"\n"+response.errorList);
                }
            });
        };

        Alert.alert(
            'Confirm',
            `Are you sure that you want to delete ${question.title} question?`,
            [ // buttons
                {text: 'Cancel', style: 'cancel'},
                {text: 'Yes', onPress: deleteAction},
            ],
            {cancelable: false},
        );
    };

    const questionOptionsHandler = (question) => {
        setMenuQuestion(question);
        setMenuOpen(true);
    };

    return (
        <View style={styles.screen}>
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={collection.questionList}
                renderItem={(questionList) => (
                    <QuestionItem
                        index={questionList.index + 1}
                        title={questionList.item.title}
                        onPress={openQuestionHandler.bind(this, questionList.item.id, questionList.item.title)}
                        onLongPress={questionOptionsHandler.bind(this, questionList.item)}
                    />
                )}
            />
            {/* make menu visible when necessary and use question state to set its content */}
            <ContextMenu
                options={[
                    {text:"Delete", onPress: () => deleteQuestionHandler(menuQuestion)}
                ]}
                visible={menuOpen}
                closeMenu={() => setMenuOpen(!menuOpen)}
            />
        </View>
    );
};

CollectionScreen.navigationOptions = ({navigation}) => {
    return {
        title: (navigation.getParam("collectionName")),
        headerRight: (
            <Icon // Add collection button
                onPress={() => CollectionScreen.addQuestionHandler()}
                name={"add-circle"}
                style={{paddingHorizontal: 15}}
            />
        )
    };
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    }
});

export default CollectionScreen;
