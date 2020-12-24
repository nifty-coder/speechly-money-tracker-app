import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { AppProvider } from './context/context';

const application = (
    <AppProvider>
        <App />
    </AppProvider>
);

ReactDOM.render(application, document.getElementById('root'));