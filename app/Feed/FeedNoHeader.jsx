import React from 'react';

const FeedNoHeaderComponent = (props) => {

	const { apibaseurl, matchprop, format } = props;
	const { children } = props;
	let getCategoriesEndpoint = apibaseurl;
	getCategoriesEndpoint = `${getCategoriesEndpoint}/categories`;

	return (
		<div className="main-container" key="main-container">
			<div></div>
			<div className="feed-container">
				{ children }
			</div>
			<div></div>
		</div>
	);
}

export { 
	FeedNoHeaderComponent as FeedNoHeader
};