import React, {useEffect, useState, useContext} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import CollectionItem from "../components/CollectionItem";
import Divider from "../components/Divider";
import * as Server from "../api/server";
import Icon from "../components/Icon";
import ContextMenu from "../components/ContextMenu";
import {ThemeContext} from "../constants/ThemeProvider";

export default function HomeScreen(props) {
    const {theme} = useContext(ThemeContext);
    const styles = createStyle(theme);

    const [collectionList, setCollectionList] = useState([]);
    const [listChanged, setListChanged] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuCollection, setMenuCollection] = useState(null);

    // componentDidMount
    useEffect(() => {
        Server.getAllCollections().then(response => {
            setCollectionList(response.body);
            setListChanged(false);
        });
    }, [listChanged]);

    const openCollectionHandler = (collectionId, collectionName) => {
        props.navigation.navigate("Collection", {
                collectionId: collectionId,
                collectionName: collectionName
            }
        );
    };

    const addCollectionHandler = () => {
        props.navigation.navigate("AddCollection", {
            onGoBack: () => setListChanged(true),
        });
    };

    const deleteCollectionHandler = (collection) => {
        const deleteAction = () => {
            Server.deleteCollection(collection.id).then(response => {
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
            `Are you sure that you want to delete ${collection.name} collection?
            \n You will lose all the questions in it.`,
            [ // buttons
                {text: 'Cancel', style: 'cancel'},
                {text: 'Yes', onPress: deleteAction},
            ],
            {cancelable: false},
        );
    };

    const collectionOptionsHandler = (collection) => {
        setMenuCollection(collection);
        setMenuOpen(true);
    };


    let collections = collectionList.map(collectionItem => (
        <CollectionItem
            key={collectionItem.id}
            onPress={openCollectionHandler.bind(this, collectionItem.id, collectionItem.name)}
            onLongPress={collectionOptionsHandler.bind(this, collectionItem)}
        >
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
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={styles.collectionsText}>Collections</Text>
                    <Icon // Add collection button
                        onPress={addCollectionHandler}
                        name={"add-circle"}
                        style={{paddingHorizontal: 15}}
                    />
                </View>
                <Divider/>
                <ScrollView style={styles.collectionsScrollView} contentContainerStyle={styles.contentContainer}>
                    {collections}
                </ScrollView>
                {/* make menu visible when necessary and use question state to set its content */}
                <ContextMenu
                    options={[
                        {text:"Delete", onPress: () => deleteCollectionHandler(menuCollection)}
                    ]}
                    visible={menuOpen}
                    closeMenu={() => setMenuOpen(!menuOpen)}
                />
            </View>

        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null
};

const createStyle = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
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
        fontWeight: "bold",
        color: "#373c42",
        textShadowColor: "rgba(55,60,66,0.4)",
        textShadowOffset: {width: -2, height: 0},
        textShadowRadius: 6,
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
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        backgroundColor: theme.secondBackGround,
        // paddingVertical: 20,
    },
    collectionsText: {
        color: theme.textColor,
        fontWeight: "bold",
        marginLeft: 20,
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
