import express from 'express';
import bodyParser from 'body-parser';
import { Kafka } from 'kafkajs';
import ProducerService from './producer/ProducerService';
import ProducerController from './producer/ProducerController';

const app = express();
const kafka = new Kafka({
  clientId: 'kafka-express',
  brokers: ['appkfksit01.dev.corp.btpn.co.id:9092']
});

const createServices = kafkaConfig => ({
  producerService: new ProducerService(kafkaConfig)
});

const createControllers = () => [
  new ProducerController(app)
];

const initializeControllers = () => {
  const controllers = createControllers();
  controllers.forEach((controller) => {
    controller.registerRoutes();
  });
};

const registerDependencies = () => {
  app.locals.services = createServices(kafka);
};

registerDependencies();

app.use(bodyParser.json());
initializeControllers();

export default app;
