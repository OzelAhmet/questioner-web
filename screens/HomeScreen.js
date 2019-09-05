import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CollectionItem from "../components/CollectionItem";
import Divider from "../components/Divider";
import Colors from "../constants/Colors";

export default function HomeScreen(props) {

    const openCollectionHandler = (collectionId) => {
        props.navigation.navigate( "Collection", {
                collectionId: collectionId
            }
        );
    };

    const tempCollections = [
        {id: 1, name: "c1"}, {id: 2, name: "c2"}, {id: 3, name: "c3"}, {id: 4, name: "c4"}, {id: 5, name: "c5"},
    ];

    let collections = tempCollections.map(collectionItem => (
        <CollectionItem key={collectionItem.id} onPress={openCollectionHandler.bind(this, collectionItem.id)}>
            {collectionItem.name}
        </CollectionItem>
    ));

    return (
        <View style={styles.screen}>
            <View style={styles.welcomeContainer}>
                <Image
                    source={require('../assets/images/question-mark.png')}
                    style={styles.questionMarkImage}
                />
                <Text style={styles.questionerText}>QUESTIONER</Text>
            </View>

            <View style={styles.collectionsContainer}>
                <Text style={styles.collectionsText}>Collections</Text>
                <Divider/>
                <ScrollView style={styles.collectionsScrollView} contentContainerStyle={styles.contentContainer} >
                    {collections}
                </ScrollView>
            </View>

        </View>
    );
}

HomeScreen.navigationOptions = {
    header: <Text>Header</Text>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.theme.background,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    questionMarkImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    questionerText: {
        fontSize: 50,
        color: "#373c42"
    },
    collectionsContainer: {
        height: "55%",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        backgroundColor: Colors.theme.secondBackGround,
        // paddingVertical: 20,
    },
    collectionsText: {
        color: Colors.theme.textColor,
        marginLeft: 10,
        fontSize: 40,
    },
    collectionsScrollView: {
        right: 0,
        width: "100%",
    },
    contentContainer: {
        width: "90%",
    }
});
