import express from 'express';

/**
 * Represent a controller to send messages to UI
 */
export default class SenderController {
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
    const { senderService } = this._app.locals.services;
    const messages = senderService.getMessages();
    return res.status(200).json({ success: true, messages });
  }
}
