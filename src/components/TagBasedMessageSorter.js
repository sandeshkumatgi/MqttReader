import React, { useState, useEffect } from 'react';
import MessageDisplay from './MessageDisplay';
import { colorThemes } from './themes'; 

// --- FIX: Keys now match the keys in the colorThemes object ---
const componentTags = {
  'Component 1': ['TAG_A', 'TAG_B', 'TAG_C'],
  'Component 2': ['TAG_D', 'TAG_E'],
  'Component 3': ['TAG_F', 'TAG_G', 'TAG_H', 'TAG_I'],
};

const TagBasedMessageSorter = ({ messages }) => {
  const [sortedMessages, setSortedMessages] = useState({
    'Component 1': [],
    'Component 2': [],
    'Component 3': [],
  });

  useEffect(() => {
    if (messages.length === 0) return;
    const latestMessage = messages[messages.length - 1];
    try {
      const messageObject = JSON.parse(latestMessage);
      const messageTagId = messageObject.tag_id;
      if (!messageTagId) return;

      for (const componentName in componentTags) {
        if (componentTags[componentName].includes(messageTagId)) {
          setSortedMessages(prev => {
            const existingMessage = prev[componentName].find(
              msg => msg.tag_id === messageTagId
            );

            // This line will now work correctly!
            const baseColor = colorThemes[componentName].tagBoxColor;

            let newColor;
            if (existingMessage) {
              const currentColor = existingMessage.overrideColor || baseColor;
              newColor = currentColor === 'lightgreen' ? 'lightcoral' : 'lightgreen';
            } else {
              newColor = baseColor;
            }
            
            const newMessageWithColor = { ...messageObject, overrideColor: newColor };

            const filteredMessages = prev[componentName].filter(
              msg => msg.tag_id !== messageTagId
            );

            return {
              ...prev,
              [componentName]: [newMessageWithColor, ...filteredMessages],
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
      <h2>Latest Tag ID </h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <MessageDisplay title="Component 1" messages={sortedMessages['Component 1']} />
        <MessageDisplay title="Component 2" messages={sortedMessages['Component 2']} />
        <MessageDisplay title="Component 3" messages={sortedMessages['Component 3']} />
      </div>
    </div>
  );
};

export default TagBasedMessageSorter;
