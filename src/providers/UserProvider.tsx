import React, { Component, Context, createContext } from 'react';
import Firebase from 'firebase/app';
import 'firebase/auth';

export const UserContext = createContext({ user: null }) as Context<{ user: Firebase.User | null }>;

export default class UserProvider extends Component<{children: unknown}> {
  state = {
    user: null
  };

  componentDidMount = (): void => {
    Firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  };

  render(): JSX.Element {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}