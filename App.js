
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Pressable, Button, ScrollView } from 'react-native';
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
      {/* <Button title="authLogin" onPress={displaySearch}></Button> */}
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

  const dataList = [
    {image: 'https://uploads.mangadex.org//covers/077a3fed-1634-424f-be7a-9a96b7f07b78/52c4a943-9c8d-4487-83dc-4bec977ba10c.jpg', namae: 'Kingdom'},
    {image: 'https://uploads.mangadex.org//covers/ce7cd7b0-e595-4f0d-98e8-447da10d652d/a6ff599f-17d3-440f-a595-fb31e932a421.jpg', namae: 'Mission: Yozakura Family'},
    {image: 'https://uploads.mangadex.org//covers/d1a9fdeb-f713-407f-960c-8326b586e6fd/dcfe20c2-fdf6-4594-9621-59a43e4b5a0e.jpg', namae: 'Vagabond'},
    {image: 'https://uploads.mangadex.org//covers/b0b721ff-c388-4486-aa0f-c2b0bb321512/cec6eea3-7c16-4c0a-8b76-4a3f78f5b8f3.jpg', namae: 'Sousou no Frieren'},
    {image: 'https://uploads.mangadex.org//covers/319df2e2-e6a6-4e3a-a31c-68539c140a84/4d102eba-387b-4b72-94a0-1dd78aba271f.jpg', namae: 'Slam Dunk'}
  ]

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
      <View style={{
        width: '100%',
        maxHeight: '86%',
        flex: 8
      }}>
        <ScrollView contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Card coverLink={displayCoverURL + titleId + "/" + coverFile} seriesTitle={title}></Card>
          {dataList.map((item, index) => {
            return(
              <Card coverLink={item.image} seriesTitle={item.namae} key={index}></Card>
            )
          })}
    </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262625',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    padding: 10,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#262625',
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
    paddingBottom: 2,
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
    alignItems: 'center',
  },
  navBarIconSelected: {
    width: 28,
    height: 28,
    tintColor: '#007AFF'
  },
});

export default App;