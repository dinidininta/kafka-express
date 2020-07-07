/* eslint-disable max-lines-per-function */
import { Kafka } from 'kafkajs';
import ProducerService from '../../src/producer/ProducerService';

const kafka = new Kafka({
  clientId: 'test',
  brokers: ['localhost']
});

describe('ProducerService', () => {
  let producerService;

  beforeEach(() => {
    producerService = new ProducerService(kafka);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('produceMessage', () => {
    it('should call producer() and producer.connect()', async () => {
      await producerService.produceMessage();
      expect(kafka.producer).toHaveBeenCalled();
      expect(kafka.producer.connect).toHaveBeenCalled();
    });
  });
});
