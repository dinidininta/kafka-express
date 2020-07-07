/**
 * Representing a service for Producer
 */

export default class ProducerService {
  constructor(kafka) {
    this._producer = kafka.producer();
  }

  async produceMessage() {
    await this._producer.connect();
  }
}
