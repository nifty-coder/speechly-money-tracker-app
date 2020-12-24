import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { AppProvider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';

const application = (
  <SpeechProvider appId="d215319f-3a39-4cb7-b8c2-d45627349b24" language="en-US">
    <AppProvider>
      <App />
    </AppProvider>
  </SpeechProvider>
);

ReactDOM.render(application, document.getElementById('root'));