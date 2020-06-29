import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as AppHeader } from '../../app/Header/AppHeader';
import { default as AppConfig } from '../AppConfig/config';
import { routes } from '../AppConfig/routes';
import { setApplicationParams } from '../Store/actionCreators';


import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

const HomePageComponent = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		console.log("Setting config through dispatch")
		dispatch(setApplicationParams(AppConfig));	
	},[])
	
	return (
		<Router>
			<React.Fragment>
				<AppHeader key="app-header"/>
				{
					routes.map((route) => 
						<Route 
							key={route.key} 
							path={route.path}
							exact={route.exact}
							component={route.component}
						/>
					)
				}
			</React.Fragment>
		</Router>
	)
}

export default HomePageComponent;