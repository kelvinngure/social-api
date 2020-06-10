import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from "./Auth"
import Boards from "./Boards"
import { LineConsumer } from "../contexts/LineContext"

export default function Combined() {
  return (
    <LineConsumer>
      {state => state.state.line ? <Boards/> : <Auth/>} 
    </LineConsumer>
    // state[0] is the global state object, state[1] is the dispatch
    
  );
}

const styles = StyleSheet.create({

});



