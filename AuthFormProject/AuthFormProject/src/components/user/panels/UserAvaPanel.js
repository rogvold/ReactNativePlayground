import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Image
} from 'react-native';

import React, { Component } from 'react';


export default class UserAvaPanel extends Component {

  state = {

  }

  constructor(props) {
    super(props);
  }

  static defaultProps = {
      avatar: 'https://www1.pictures.stylebistro.com/gi/Audrey+Tautou+Short+Hairstyles+Pixie+TDZU0BTDWQxl.jpg',
      // avatar: 'https://images2.naharnet.com/images/75629/w460.jpg?1365506544',
      name: 'Audrey Tautou'
  }

  render() {
    console.log('index app: render');
    return (
      <View style={styles.container}>

        <Animated.View style={styles.avaPlaceholder}>
          <Image
              style={styles.image}
              source={{uri: this.props.avatar}}
           />
        </Animated.View>


        <View style={styles.namePlaceholder} >
          <Text style={styles.name} >
            {this.props.name}
          </Text>
        </View>


      </View>
    );
  }
}

const avaWidth = 80;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },

  avaPlaceholder: {
    width: avaWidth + 4,
    height: avaWidth + 4,
    borderRadius: avaWidth / 2,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },

  image: {
    width: avaWidth,
    height: avaWidth,
    borderRadius: avaWidth / 2,
    alignSelf: 'center',
    // borderRadius: 1000
  },

  namePlaceholder: {
    alignSelf: 'center',
  },

  name: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 10,
    color: 'white'
  },

});
