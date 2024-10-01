class Message {
  constructor(uid, username, message) {
    this.uid = uid;
    this.username = username;
    this.message = message;
  }
}

class ChatMessages {
  constructor() {
    this.messages = [];
    this.users = {};
  }

  lastTenMessages() {
    this.messages = this.messages.splice(0, 10);
    return this.messages;
  }

  usersArray() {
    return Object.values(this.users);
  }

  sendMessage(uid, username, message) {
    this.messages.unshift(new Message(uid, username, message));
  }

  connectUser(user) {
    this.users[user.id] = user;
  }

  disconnectUser(id) {
    delete this.users[id];
  }
}

module.exports = ChatMessages;
