import express from 'express';

/**
 * Represent a controller to send messages to UI
 */
export default class ConsumerController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._sendMessages = this._sendMessages.bind(this);
  }

  registerRoutes() {
    this._app.use('/consumer', this._router);
    this._router.get('/', this._sendMessages);
  }

  _sendMessages(req, res){
    const { consumerService } = this._app.locals.services;
    const messages = consumerService.getMessages();
    return res.status(200).json({ success: true, messages });
  }
}
