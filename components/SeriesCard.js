import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

const Card = (props) => {
  return(
    <View style={styles.seriesContainer}>
      <TouchableHighlight>
        <Image source={{uri: props.coverLink}} style={styles.seriesCover}></Image>
      </TouchableHighlight>
      <Text style={styles.seriesTitle}>{props.seriesTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  seriesTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  seriesCover: {
    width: 180,
    height: 270,
    borderRadius: 5
  },
  seriesContainer: {
    padding: 10,
  }
});

export default Card;