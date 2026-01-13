import React, { useState } from 'react';
import { colorThemes } from './themes';

const MessageDisplay = ({ title, messages }) => {
  const theme = colorThemes[title] || colorThemes.default;
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    flex: '1 1 320px',
    minHeight: '450px',
    margin: '10px',
    backgroundColor: theme.background,
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
    boxShadow: isHovered ? '0 8px 25px -5px rgba(0,0,0,0.2)' : '0 4px 15px -5px rgba(0,0,0,0.1)',
    padding: '15px',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    color: '#333',
    fontFamily: 'sans-serif',
    marginTop: '0',
    borderBottom: `2px solid ${theme.border}`,
    paddingBottom: '10px',
  };

  const tagStyle = {
    color: theme.tagColor,
    fontWeight: 'bold',
    fontSize: '0.5em', // --- REDUCED: Size of the 'TAG_ID' text ---
  };

  const timestampStyle = {
    color: '#555',
    fontSize: '0.35em', // --- REDUCED: Size of the timestamp text ---
    lineHeight: '1',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>{title}</h3>
      <ul
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
          padding: '0.5px 1px 0 0',
          margin: 0,
          listStyle: 'none',
          flexGrow: 1,
        }}
      >
        {messages.map((msg, index) => {
          const messageBoxStyle = {
            backgroundColor: msg.overrideColor || theme.tagBoxColor,
            border: `1px solid ${theme.border}`,
            borderRadius: '5px',
            padding: '0.5px 3px', // --- REDUCED: The inner size (height/width) of the box ---
            marginBottom: '0.25px', // --- REDUCED: The vertical distance BETWEEN boxes ---
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          };

          return (
            <li key={index}>
              <div style={messageBoxStyle}>
                <div style={{ marginBottom: '0.5px' }}>
                  <span style={tagStyle}>{msg.tag_id}</span>
                </div>
                <div style={timestampStyle}>
                  <small><em>{new Date(msg.timestamp).toLocaleString()}</em></small>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageDisplay;
