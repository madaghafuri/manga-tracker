
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Pressable, Button } from 'react-native';
import Card from './components/SeriesCard';
import NavTool from './components/Navigation';

const mangaURL = "https://api.mangadex.org/manga/8f8b7cb0-7109-46e8-b12c-0448a6453dfa";
const coverURL = "https://api.mangadex.org/cover/"
const displayCoverURL = "https://uploads.mangadex.org//covers/";



const App = () => {
  const [status, setStatus] = useState("Home");

  const displaySearch = () => {
    fetch('https://api.mangadex.org/auth/login',{
      method: 'POST'
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch(error => console.log(error));
  }
  
  return (
    <View style={styles.container}>
      <Header header={status}/>
      <Button title="authLogin" onPress={displaySearch}></Button>
      <Content />
      <NavBar toLibrary={() => setStatus("Library")} toHome={() => setStatus("Home")} toSearch={() => setStatus("Search")}/>
    </View>
  );
}

const NavBar = (props) => {
    const [selected, setSelected] = useState('Home');
    const selectedColor = '#007AFF'
    
    return (
      <View style={styles.navBarContainer}>
        <NavTool onClick={() => setSelected('Library')} iconStyle={selected == 'Library' ? styles.navBarIconSelected : styles.navBarIcon} textStyle={selected == 'Library' ? {color: selectedColor} : {color: '#a6a5ad'}} iconText={"Library"} iconSource={'https://cdn.discordapp.com/attachments/776395062233923626/897737152727748608/unknown.png'}/>
        <NavTool onClick={() => setSelected('Home')} iconStyle={selected == 'Home' ? styles.navBarIconSelected : styles.navBarIcon} textStyle={selected == 'Home' ? {color: selectedColor} : {color: '#a6a5ad'}} iconText={"Home"} iconSource={'https://cdn.discordapp.com/attachments/776395062233923626/897411587672014858/unknown.png'}/>
        <NavTool onClick={() => setSelected('Search')} iconStyle={selected == 'Search' ? styles.navBarIconSelected : styles.navBarIcon} textStyle={selected == 'Search' ? {color: selectedColor} : {color: '#a6a5ad'}} iconText={"Search"} iconSource={'https://cdn.discordapp.com/attachments/776395062233923626/901135118566051930/loupe.png'}/>
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
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      let coverId = json.data.relationships[2].id;
      let titleId = json.data.id;
      setTitleId(titleId)
      let seriesTitle = json.data.attributes.altTitles[0].en;
      setTitle(seriesTitle)
      console.log('coverid, titleid, & title obtained')
      return fetch(coverURL + coverId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
    .then(response => response.json())
    .then((json) => {
      let coverFile = json.data.attributes.fileName
      setCoverFile(coverFile)
      console.log('coverFile obtained')
    })
    .catch(error => console.log(error))
  }, [])
  return (
      <Card coverLink={displayCoverURL + titleId + "/" + coverFile} seriesTitle={title}></Card>
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