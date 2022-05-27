import { Producer, KafkaClient } from "kafka-node";

let client = new KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
let producer = new Producer(client);

const checkConnection = async () => {
  producer.on("ready", () => {
    console.log("kafka borker established successfully.");
  });
  producer.on("error", (error) => {
    console.log("kafka error ___________________ ", error);
  });
};

const sendMessage = async (topic: string, payload: string) => {
  try {
    const result = await producer.send(
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
    console.log(result);
  } catch (error) {
    console.log(`error heppened while pushing to ropic : ${topic}.`);
  }
};

export default {
  checkConnection,
  sendMessage,
};
