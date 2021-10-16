import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, Image, TouchableHighlight, FlatList } from 'react-native';

const mangaURL = "https://api.mangadex.org/manga/8f8b7cb0-7109-46e8-b12c-0448a6453dfa";
const coverURL = "https://api.mangadex.org/cover/"
const displayCoverURL = "https://uploads.mangadex.org//covers/";



const App = () => {
  const [status, setStatus] = useState("Home");
  
  return (
    <View style={styles.container}>
      <Header header={status}/>
      <Content />
      <NavBar toLibrary={() => setStatus("Library")} toHome={() => setStatus("Home")} toSearch={() => setStatus("Search")}/>
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
          <TouchableHighlight underlayColor={'gray'} onPress={props.toSearch} style={StyleSheet.create({
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
  const [coverFile, setCoverFile] = useState("");
  const [coverId, setCoverId] = useState("")
  const [titleId, setTitleId] = useState("")
  const [title, setTitle] = useState("");

  useEffect(() => {
      fetch(mangaURL,{
        method: 'GET',
        'Content-Type': 'application/json'
      })
      .then((response) => response.json())
      .then((json) => {
        setCoverId(json.data.relationships[2].id);
        setTitleId(json.data.id);
        setTitle(json.data.attributes.altTitles[0].en)
        console.log('coverid, titleid, & title obtained')
        fetch(coverURL + coverId, {
          method: 'GET',
          'Content-Type': 'application/json'
        })
        .then((response) => response.json())
        .then((json) => {
          setCoverFile(json.data.attributes.fileName)
          console.log('coverFile obtained')
        })
        .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

      return () => {
        console.log('api cleaned')
      }
    
  }, [])

  return (
    <View>
      <Image source={{uri: displayCoverURL + titleId + "/" + coverFile}}    style={StyleSheet.create({
          width: 180,
          height: 270,
          borderRadius: 5
        })}></Image>
      <Text style={styles.seriesTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#394352',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
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
  },
  seriesTitle: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  }
});

export default App;