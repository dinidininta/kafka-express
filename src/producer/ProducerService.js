/**
 * Representing a service for Producer
 */
export default class ProducerService {
  constructor(kafka) {
    this._producer = kafka.producer();
  }

  async produceMessage(message) {
    await this._producer.connect();
    await this._producer.send({
      topic: 'gosip',
      messages: [
        {
          key: '2',
          value: JSON.stringify(message)
        }
      ]
    });
    await this._producer.disconnect();
    return { message };
  }
}
