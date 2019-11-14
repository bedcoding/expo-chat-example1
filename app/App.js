import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, ScrollView } from "react-native";
import io from "socket.io-client";

// 프론트는 이 파일
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://218.39.000.00:3000"); //
    this.socket.on("chat message", msg => {
      
      this.setState({
        chatMessages: [
          ...this.state.chatMessages,
          { id: "server", message: msg }
        ]
      });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);

    this.setState({
      chatMessage: "",
      chatMessages: [
        ...this.state.chatMessages,
        { id: "client", message: this.state.chatMessage }
      ]
    });
  }

  render() {
    const chatMessages = this.state.chatMessages.map((message, i) => (
      <View key={i}>
        <Text
          style={{
            color: "#fff",
            backgroundColor: message.id === "client" ? "#1C2833" : "#239B56",
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginBottom: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: message.id === "client" ? "#1C2833" : "#239B56",
            overflow: "hidden",
            alignSelf: message.id === "client" ? "flex-start" : "flex-end"
          }}
        >
          {`From ${message.id}:   ${message.message}`}
        </Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <View
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#333" }}>Client Server Chat App</Text>
        </View>
        <ScrollView
          style={{
            paddingTop: 15,
            paddingHorizontal: 5
          }}
        >
          {chatMessages}
        </ScrollView>
        <View style={{ height: 50, justifyContent: "flex-end" }}>
          <TextInput
            style={{
              height: 40,
              paddingLeft: 10,
              borderWidth: 2,
              borderColor: "#eee",
              color: "#333"
            }}
            autoCorrect={false}
            autoFocus
            placeholder="Type message here..."
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({
                chatMessage
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "space-between",
    backgroundColor: "#F5FCFF"
  }
});
