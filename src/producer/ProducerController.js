import express from 'express';
import ProducerService from './ProducerService';

/**
 * Representing a controller ..
 */
export default class BookController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
  }

  registerRoutes() {
    this._app.use('/producer', this._router);
    this._router.get('/', this._getFeatures);
  }

  async _getFeatures(req, res) {
    // const { Book } = this._app.locals.models;
    // const result = await Book.findAll({ include: SomeFeature });
    const result = { success: true };
    return res.json(result);
  }
}
