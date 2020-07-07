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
    const { order } = req.body
    const result = { success: true, order };
    return res.status(201).json(result);
  }
}
