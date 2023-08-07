module.exports = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComponent from 'components/RootComponent/RootComponent.component';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RootComponent />,
  // </React.StrictMode>,
);
`;
