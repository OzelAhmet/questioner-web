import React, {useContext} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {ThemeContext} from "../constants/ThemeProvider";

export default function LinksScreen() {
  const {theme} = useContext(ThemeContext);
  const styles = createStyle(theme);

  return (
    <ScrollView style={styles.container}>
      <ExpoLinksView />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const createStyle = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: theme.background,
  },
});
