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

const NavBar = (props) => {
    const [selected, setSelected] = useState('')
    
    const changeColor = () => {
      
    }

    return (
      <View style={[styles.containerNavBar, styles.flexRow]}>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} onPress={() => setSelected('Library')} style={{borderRadius: 5}}>
            <Image 
            style={selected === 'Library' ? {
              width: 28,
              height: 28,
              tintColor: '#1e68b3'
            } : styles.tinyIcon}
            source={{uri: 'https://cdn.discordapp.com/attachments/776395062233923626/897737152727748608/unknown.png'}}></Image>
          </TouchableHighlight>
          <Text style={selected === 'Library' ? {color: '#1e68b3'} : {color: '#a6a5ad'}}>Library</Text>
        </View>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} onPress={() => setSelected('Home')} style={{borderRadius: 5}}>
            <Image 
            style={selected === 'Home' ? {
              width: 28,
              height: 28,
              tintColor: '#1e68b3'
            } : styles.tinyIcon} 
            source={require('./assets/homeIcon.png')}
            ></Image>
          </TouchableHighlight>
          <Text style={selected === 'Home' ? {color: '#1e68b3'} : {color: '#a6a5ad'}}>Home</Text>
        </View>
        <View style={styles.flexColumn}>
          <TouchableHighlight underlayColor={'gray'} style={{borderRadius: 5}}>
            <Image 
            style={styles.tinyIcon}
            source={require('./assets/loupe.png')}></Image>
          </TouchableHighlight>
          <Text style={{color: '#a6a5ad'}}>Search</Text>
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
    <View>
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
  tinyIcon: {
    width: 28,
    height: 28,
    tintColor: '#a6a5ad'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 10,
    bottom: 0,
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  containerNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 25,
    padding: 10,
    width: '100%',
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
  }
});

export default App;