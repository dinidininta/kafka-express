import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Kafka } from 'kafkajs';
import SenderService from './sender/SenderService';
import SenderController from './sender/SenderController';
import ProducerService from './producer/ProducerService';
import ProducerController from './producer/ProducerController';

const app = express();
const kafka = new Kafka({
  clientId: 'kafka-express',
  brokers: ['appkfksit01.dev.corp.btpn.co.id:9092']
});

const consumer = kafka.consumer({ groupId: 'kafka-express-consumer' });

const consumedMessages = [];
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'DLOS_SLIK_RESULT_AGGREGATION', fromBeginning: false });
  console.log('subscribed!');

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({ value: message.value.toString() })
      consumedMessages.push({ value: message.value.toString() });
    }
  });
};

consumeMessages().catch(error => console.error('Error when consuming', error.message));

const createServices = () => ({
  producerService: new ProducerService(kafka),
  senderService: new SenderService(consumedMessages)
});

const createControllers = () => [
  new ProducerController(app),
  new SenderController(app)
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
