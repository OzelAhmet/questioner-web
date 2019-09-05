import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import QuestionItem from "../components/QuestionItem";
import Colors from "../constants/Colors";

const CollectionScreen = (props) => {

    const questionList = [
        { id: 1, title: 'Q1' },
        { id: 2, title: 'Q2' },
        { id: 3, title: 'Q3' },
        { id: 4, title: 'Q4' },
        { id: 5, title: 'Q5' },
        { id: 6, title: 'Q6' },
        { id: 7, title: 'Q7' },
        { id: 8, title: 'Q8' },
        { id: 9, title: 'Q9' },
        { id: 10, title: 'Q10' },
        { id: 11, title: 'Q11' },
        { id: 12, title: 'Q12' },
        { id: 13, title: 'Q13' },
        { id: 14, title: 'Q14' },
        { id: 15, title: 'Q15' },
        { id: 16, title: 'Q16' },
        { id: 17, title: 'Q17' },
        { id: 18, title: 'Q18' },
        { id: 19, title: 'Q19' },
        { id: 20, title: 'Q20' },
    ];

    const openQuestionHandler = (questionId) => {
        props.navigation.navigate( "Question", {
                questionId: questionId,
                questionList: questionList.map(question => question.id)
            }
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={questionList}
                renderItem={(questionList) => (
                    <QuestionItem
                        index={questionList.index+1}
                        title={questionList.item.title}
                        onPress={openQuestionHandler.bind(this, questionList.item.id)}
                    />
                )}
            />
        </View>
    );
};

CollectionScreen.navigationOptions = ({navigation}) => {
    return {
        title: ("Collection id: " + navigation.getParam("collectionId"))
        // header: <Text>Header</Text>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.theme.background,
    }
});

export default CollectionScreen;
