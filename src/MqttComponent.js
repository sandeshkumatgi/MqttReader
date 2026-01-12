import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MqttComponent = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket port of your local broker
    const brokerUrl = 'ws://localhost:9001';

    const connectClient = mqtt.connect(brokerUrl);

    setClient(connectClient);

    connectClient.on('connect', () => {
      console.log('Connected to local MQTT broker via WebSockets');
      
      // The topic you want to subscribe to
      const topic = 'react/test'; 
      
      connectClient.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    });

    connectClient.on('message', (topic, message) => {
      const newMessage = message.toString();
      console.log(`Received message: ${newMessage} on topic: ${topic}`);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      if (connectClient) {
        connectClient.end();
        console.log('Disconnected from MQTT broker');
      }
    };
  }, []);

  return (
    <div>
      <h2>MQTT Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MqttComponent;
