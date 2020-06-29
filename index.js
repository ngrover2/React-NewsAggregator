import React from 'react';
import ReactDOM from 'react-dom';
import HomePageComponent from './app/Home/HomePageComponent';
import store from './app/Store/store';
import { Provider } from 'react-redux';

let initMessageEl = document.getElementById("initial-message-component")
if (initMessageEl) {
	initMessageEl.remove()
};

const HomeComponent = ({ store }) => (
	<Provider store={store}>
		<HomePageComponent />
	</Provider>
);
ReactDOM.render(<HomeComponent store={store}/>, document.getElementById('story-demo'));