import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, Image, TouchableHighlight, FlatList } from 'react-native';

const mangaURL = "https://api.mangadex.org/cover/";
const coverURL = "https://uploads.mangadex.org//covers/";

const getManga = () =>{
  fetch(mangaURL)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data[0]);
  })
  .catch((error) => console.log(error));
}

const App = () => {
  const [status, setStatus] = useState("");
  
  return (
    <View style={styles.container}>
      <Header header={status}/>
      <View>
        
      </View>
      <NavBar toLibrary={() => setStatus("Library")} toHome={() => setStatus("Home")} toSearch={getManga}/>
    </View>
  );
}

const NavBar = (props) => {


    return (
      <View style={[styles.containerNavBar, styles.flexRow]}>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} onPress={props.toLibrary} style={StyleSheet.create({
            borderRadius: 5,
          })}>
            <Image 
            style={styles.tinyIcon}
            source={{uri: 'https://cdn.discordapp.com/attachments/776395062233923626/897737152727748608/unknown.png'}}></Image>
          </TouchableHighlight>
          <Text>Library</Text>
        </View>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} onPress={props.toHome} style={StyleSheet.create({
            borderRadius: 5,
          })}>
            <Image 
            style={styles.tinyIcon} 
            source={require('./assets/homeIcon.png')}
            ></Image>
          </TouchableHighlight>
          <Text>Home</Text>
        </View>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} onPress={getManga} style={StyleSheet.create({
            borderRadius: 5,
          })}>
            <Image 
            style={styles.tinyIcon}
            source={require('./assets/loupe.png')}></Image>
          </TouchableHighlight>
          <Text>Search</Text>
        </View>
      </View>
    )
  
}

const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.header}</Text>
    </View>
  )
}

const Content = () => {
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#394352',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tinyIcon: {
    width: 28,
    height: 28
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 10,
    bottom: 0
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  containerNavBar: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 25,
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
  },
  headerText: {
    color: 'black',
    position: 'relative',
    left: 0,
    fontSize: 30
  }
});

export default App;