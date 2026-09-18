import React from 'react';
import { renderToString } from 'react-dom/server';

function Test() {
  return React.createElement('div', { style: { "--grid-columns": "25% 35% 30%" } }, 
    React.createElement('div', { style: { gridTemplateColumns: "var(--grid-columns)" } })
  );
}
console.log(renderToString(React.createElement(Test)));
