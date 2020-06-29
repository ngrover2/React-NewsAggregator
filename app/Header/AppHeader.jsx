import React, {useState} from 'react';
import { SearchBox } from '../Search/SearchBox';
import logo from '../../images/ant-logo.png';

export default (props) => {
	

	return (
		<div className="app-header" key="app-header">
				<div className="header-image">
					<img src={logo}></img>
				</div>
				<SearchBox />
		</div>
	);
};