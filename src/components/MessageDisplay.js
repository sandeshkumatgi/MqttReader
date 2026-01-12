import React, { useState } from 'react';

// --- 1. Define our color schemes ---
// We can easily change the look of our components from here.
const colorThemes = {
  "Component 1": {
    background: '#E3F2FD', // Light Blue
    border: '#90CAF9',
    tagColor: '#1565C0',
  },
  "Component 2": {
    background: '#E8F5E9', // Light Green
    border: '#A5D6A7',
    tagColor: '#2E7D32',
  },
  "Component 3": {
    background: '#FFF3E0', // Light Orange
    border: '#FFCC80',
    tagColor: '#E65100',
  },
  "default": { // A fallback theme
    background: '#F5F5F5',
    border: '#E0E0E0',
    tagColor: '#424242',
  }
};

const MessageDisplay = ({ title, messages }) => {
  // Get the specific theme for this component based on its title
  const theme = colorThemes[title] || colorThemes.default;

  // --- 2. Add state for the hover effect ---
  const [isHovered, setIsHovered] = useState(false);

  // --- 3. Define the styles for our card ---
  const cardStyle = {
    // Base styles from before
    flex: '1',
    margin: '10px',
    
    // New "Cool" Styles
    backgroundColor: theme.background,
    border: `1px solid ${theme.border}`,
    borderRadius: '8px', // Rounded corners
    boxShadow: isHovered ? '0 8px 25px -5px rgba(0,0,0,0.2)' : '0 4px 15px -5px rgba(0,0,0,0.1)', // Deeper shadow on hover
    padding: '15px',
    transition: 'all 0.3s ease', // Smooth transition for all changes
    transform: isHovered ? 'scale(1.03)' : 'scale(1)', // Grow slightly on hover
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
    fontSize: '1.1em',
  };

  return (
    // --- 4. Add mouse enter/leave events for the hover effect ---
    <div 
      style={cardStyle} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>{title}</h3>
      <ul
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '0 5px 0 0', // Give the scrollbar some space
          margin: 0,
          listStyle: 'none',
        }}
      >
        {messages.map((msg, index) => (
          <li key={index} style={{ marginBottom: '12px' }}>
            <div>
              <span style={tagStyle}>{msg.tag_id}</span>
            </div>
            <small><em>{new Date(msg.timestamp).toLocaleString()}</em></small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;
