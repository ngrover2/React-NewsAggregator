import React from 'react';
import { CategoryFeed } from './CategoryFeed';
import { CategoriesHeader } from './CategoriesHeader';
import { default as AppConstants } from '../AppConfig/constants';

const FeedWithHeaderComponent = (props) => {

	const { apibaseurl } = props;
	let getCategoriesEndpoint = apibaseurl && apibaseurl != "" ? `${apibaseurl}/categories` : null;

	return (
		<div className="main-container" key="main-container">
			<div></div>
			<div className="feed-container">
				<CategoriesHeader 
					requestbaseurl={getCategoriesEndpoint}
					requestmethod={"GET"}
					limitCategories={7}
				/>
				<CategoryFeed
					{...props}
					format={AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2}
				/>
				<div key="icon-attr">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
			</div>
			<div></div>
		</div>
	);
}

export { 
	FeedWithHeaderComponent as FeedWithHeader
};