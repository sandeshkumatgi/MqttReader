import React, { useState, useEffect } from 'react';
import MessageDisplay from './MessageDisplay';

const componentTags = {
  Component1: ['TAG_A', 'TAG_B', 'TAG_C'],
  Component2: ['TAG_D', 'TAG_E'],
  Component3: ['TAG_F', 'TAG_G', 'TAG_H', 'TAG_I'],
};

const TagBasedMessageSorter = ({ messages }) => {
  const [sortedMessages, setSortedMessages] = useState({
    Component1: [],
    Component2: [],
    Component3: [],
  });

  useEffect(() => {
    if (messages.length === 0) return;
    const latestMessage = messages[messages.length - 1];

    try {
      const messageObject = JSON.parse(latestMessage);

      // CHANGE: Use 'messageObject.tag_id' instead of 'messageObject.tag'
      const messageTagId = messageObject.tag_id;
      
      // Ensure the message has a tag_id before proceeding
      if (!messageTagId) return;

      for (const componentName in componentTags) {
        if (componentTags[componentName].includes(messageTagId)) {
          setSortedMessages(prev => {
            // CHANGE: The filter now checks 'msg.tag_id'
            const filteredMessages = prev[componentName].filter(
              msg => msg.tag_id !== messageTagId
            );

            return {
              ...prev,
              [componentName]: [messageObject, ...filteredMessages],
            };
          });
          break;
        }
      }
    } catch (error) {
      console.error("Failed to parse incoming message:", latestMessage, error);
    }
  }, [messages]);

  return (
    <div style={{ clear: 'both' }}>
      <hr />
      <h2>Sorted Messages (Latest Tag ID Only)</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <MessageDisplay title="Component 1" messages={sortedMessages.Component1} />
                <MessageDisplay title="Component 2" messages={sortedMessages.Component2} />
                <MessageDisplay title="Component 3" messages={sortedMessages.Component3} />
            </div>
    </div>
  );
};

export default TagBasedMessageSorter;
