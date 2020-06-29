import { FeedWithHeader } from '../Feed/FeedWithHeader';
import { CategoryFeed } from '../Feed/CategoryFeed';
import { TopicFeed } from '../Feed/TopicFeed';
import { default as Aside } from '../../app/Aside/FixedAside';
import React from 'react';
import {
    Redirect
} from "react-router-dom";
import { default as AppConfig } from '../AppConfig/config';
import { AppConstants } from '../AppConfig/constants';
const apibaseurl = AppConfig.API_BASE_URL;
const storydisplayformat = AppConstants.DEFAULT_STORIES_DISPLAY_FORMAT;

const RedirectToRoot = (props) => <Redirect to={{ pathname: "/" }}/>

const CategoryFeedWithAside = (props) => (
	<React.Fragment>
		<Aside key="feed-aside" />
		<CategoryFeed 
			key="app-feed"
			apibaseurl={apibaseurl}
			format={storydisplayformat}
		/>
	</React.Fragment>
);
	

export const routes = [
	{
		path: "/topic/:topic",
		component: TopicFeed,
		exact: false,
		key: "/topic/:topic"
	},
	{
		path: "/",
		component: CategoryFeedWithAside,
		exact: true,
		key: "/"
	},
	// {
	// 	path: "/",
	// 	component: RedirectToRoot,
	// 	exact: false,
	// 	key: "/unrecognised"
	// },

]