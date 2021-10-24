import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';

const NavTool = (props) => {
  return(
    <View style={styles.navBarIconContainer}>
      <TouchableOpacity onPress={props.onClick} hitSlop={{top: 15, bottom: 15, left: 30, right: 30}}>
        <Image source={{uri: props.iconSource}} style={props.iconStyle}></Image>
      </TouchableOpacity>
      <Text style={props.textStyle}>{props.iconText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navBarIconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  navBarIcon: {
    width: 20,
    height: 20,
    tintColor: '#a6a5ad'
  },
  navBarIconSelected: {
    width: 20,
    height: 20,
    tintColor: '#007AFF'
  },
})

export default NavTool;