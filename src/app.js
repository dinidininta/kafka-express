import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Kafka } from 'kafkajs';
import ConsumerService from './consumer/ConsumerService';
import ConsumerController from './consumer/ConsumerController';
import ProducerService from './producer/ProducerService';
import ProducerController from './producer/ProducerController';

const app = express();
const kafka = new Kafka({
  clientId: 'kafka-express',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'kafka-express-consumer' });

const consumedMessages = [];
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'gosip', fromBeginning: false });
  console.log('subscribed!');

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({ value: message.value.toString() });
      consumedMessages.push({ value: message.value.toString() });
    }
  });
};

consumeMessages().catch(error => console.error('Error when consuming', error.message));

const createServices = () => ({
  producerService: new ProducerService(kafka),
  consumerService: new ConsumerService(consumedMessages)
});

const createControllers = () => [
  new ProducerController(app),
  new ConsumerController(app)
];

const initializeControllers = () => {
  const controllers = createControllers();
  controllers.forEach(controller => {
    controller.registerRoutes();
  });
};

const registerDependencies = () => {
  app.locals.services = createServices();
};

registerDependencies();

app.use(bodyParser.json());
app.use(cors());
initializeControllers();

export default app;
