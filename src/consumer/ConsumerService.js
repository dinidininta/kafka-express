/**
 * Represent a service to send message to UI
 */
export default class ConsumerService {
  constructor(messages) {
    this._messages = messages
  }

  getMessages(){
    return this._messages;
  }
}
