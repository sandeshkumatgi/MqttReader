// src/MqttComponent.js
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import TagBasedMessageSorter from './components/TagBasedMessageSorter';

const MqttComponent = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    
    const brokerUrl = process.env.REACT_APP_MQTT_BROKER_URL;
  
    const topic = process.env.REACT_APP_MQTT_TOPIC;

    console.log(`Attempting to connect to broker at: ${brokerUrl}`);
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log('Connected to local MQTT broker via WebSockets');
      
      client.subscribe(topic, (err) => {
        if (!err) console.log(`Subscribed to topic: ${topic}`);
      });
    });

    client.on('message', (topic, message) => {
      const newMessage = message.toString();
      console.log(`Received message: ${newMessage} on topic: ${topic}`);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      if (client) {
        client.end();
        console.log('Disconnected from MQTT broker');
      }
    };
  }, []);

  return (
    <div>
      <div>
        <h2>All MQTT Messages (Unfiltered)</h2>
        {/* <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul> */}
      </div>
      <TagBasedMessageSorter messages={messages} />
    </div>
  );
};

export default MqttComponent;
