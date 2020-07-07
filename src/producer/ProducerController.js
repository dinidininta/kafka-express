import express from 'express';
import ProducerService from './ProducerService';

/**
 * Representing a controller ..
 */
export default class BookController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._produceSlik = this._produceSlik.bind(this);
  }

  registerRoutes() {
    this._app.use('/producer', this._router);
    this._router.post('/', this._produceSlik);
  }

  async _produceSlik(req, res) {
    const body = req.body
    const { producerService } = this._app.locals.services;
    try {
      const { message } = await producerService.produceMessage(body);
      const result = { success: true, message };
      return res.status(201).json(result);
    }catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }
}
