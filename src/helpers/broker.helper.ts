import { Producer, KafkaClient } from "kafka-node";

let client = new KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
let producer = new Producer(client);

const checkConnection = () => {
  producer.on("ready", () => {
    console.log("kafka borker established successfully.");
  });
  producer.on("error", (error) => {
    console.log("kafka error ___________________ ", error);
  });
};

const sendMessage = async (topic: string, payload: string) => {
  try {
    producer.send(
      [
        {
          topic,
          messages: payload,
        },
      ],
      () => {
        console.log(`message pushed to topic ${topic} successfully.`);
      }
    );
  } catch (error) {
    console.log(`error heppened while pushing to ropic : ${topic}.`);
  }
};

export default {
  checkConnection,
  sendMessage,
};
