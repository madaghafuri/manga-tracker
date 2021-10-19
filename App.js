import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Pressable } from 'react-native';

const mangaURL = "https://api.mangadex.org/manga/8f8b7cb0-7109-46e8-b12c-0448a6453dfa";
const coverURL = "https://api.mangadex.org/cover/"
const displayCoverURL = "https://uploads.mangadex.org//covers/";



const App = () => {
  const [status, setStatus] = useState("Home");

  const displaySearch = () => {
    fetch('https://api.mangadex.org/manga',{
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json.data[10])
    })
    .catch(error => console.log(error));
  }
  
  return (
    <View style={styles.container}>
      <Header header={status}/>
      <Content />
      <NavBar toLibrary={() => setStatus("Library")} toHome={() => setStatus("Home")} toSearch={() => setStatus("Search")}/>
    </View>
  );
}

const NavBar = ({
  
}) => {
    const [selected, setSelected] = useState('Home');
    const selectedColor = '#007AFF'
    
    return (
      <View style={styles.navBarContainer}>
        <View style={styles.navBarIconContainer}>
          <TouchableHighlight onPress={() => {setSelected('Library')}}>
            <Image source={{uri: 'https://cdn.discordapp.com/attachments/776395062233923626/897737152727748608/unknown.png'}} style={selected == 'Library' ? styles.navBarIconSelected : styles.navBarIcon}></Image>
          </TouchableHighlight>
          <Text style={selected == 'Library' ? {color:selectedColor} : {color: '#a6a5ad'}}>Library</Text>
        </View>
        <View style={styles.navBarIconContainer}>
          <TouchableHighlight onPress={() => {setSelected('Home')}}>
            <Image source={{uri: 'https://cdn.discordapp.com/attachments/776395062233923626/897411587672014858/unknown.png'}} style={selected == 'Home' ? styles.navBarIconSelected : styles.navBarIcon}></Image>
          </TouchableHighlight>
          <Text style={selected == 'Home' ? {color:selectedColor} : {color: '#a6a5ad'}}>Home</Text>
        </View>
        <View style={styles.navBarIconContainer}>
          <TouchableHighlight onPress={() => {setSelected('Search')}}>
            <Image source={require('./assets/loupe.png')} style={selected == 'Search' ? styles.navBarIconSelected : styles.navBarIcon}></Image>
          </TouchableHighlight>
          <Text style={selected == 'Search' ? {color:selectedColor} : {color: '#a6a5ad'}}>Search</Text>
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

const Content = (props) => {
  const [coverFile, setCoverFile] = useState("");
  const [titleId, setTitleId] = useState("")
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(mangaURL,{
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then((response) => response.json())
    .then((json) => {
      const coverId = json.data.relationships[2].id;
      const titleId = json.data.id;
      setTitleId(titleId)
      const seriesTitle = json.data.attributes.altTitles[0].en;
      setTitle(seriesTitle)
      console.log('coverid, titleid, & title obtained')
      return fetch(coverURL + coverId, {
        method: 'GET',
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then((json) => {
      const coverFile = json.data.attributes.fileName
      setCoverFile(coverFile)
      console.log('coverFile obtained')
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <View style={{
      // alignItems: 'center',
      padding: 10,
      backgroundColor: 'black',
    }}>
      <Pressable >
      <Image source={{uri: displayCoverURL + titleId + "/" + coverFile + ".512.jpg"}}    style={StyleSheet.create({
          width: 180,
          height: 270,
          borderRadius: 5,
        })}></Image>
      </Pressable>
      <Text style={styles.seriesTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323236',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  headerContainer: {
    position: 'absolute',
    top: 25,
    padding: 10,
    width: '100%',
    flex: 1
  },
  headerText: {
    color: '#a6a5ad',
    position: 'relative',
    left: 0,
    fontSize: 30
  },
  seriesTitle: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  navBarContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    width: '100%',
    flex: 1
  },
  navBarIcon: {
    width: 28,
    height: 28,
    tintColor: '#a6a5ad'
  },
  navBarIconContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  navBarIconSelected: {
    width: 28,
    height: 28,
    tintColor: '#007AFF'
  },
});

export default App;