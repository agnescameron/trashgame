import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import { store } from './reduxStore';
import './css/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>
	, document.getElementById('root'));
serviceWorker.unregister();
