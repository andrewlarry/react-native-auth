import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Card, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

import firebaseConfig from '../config/firebase.json';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      return (
        <Card>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>
        </Card>
      );
    } else if (this.state.loggedIn === false) {
      return <LoginForm />;
    } 
    return <Spinner size="large" />;
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

