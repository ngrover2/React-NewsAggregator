import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CategoriesHeader } from './CategoriesHeader';
import { selectors } from '../Store/selectors';

const FeedWithHeaderComponent = (props) => {

	const apibaseurl = useSelector(selectors.getParamFromAppConfig("API_BASE_URL") || null)
	const [ categoriesEndpoint, setCategoriesEndpoint ]  = useState(null);
	const { children } = props;

	useEffect(() => {
		if (apibaseurl)
			setCategoriesEndpoint(apibaseurl != "" ? `${apibaseurl}/categories` : null)
	},[apibaseurl])
	
	if(categoriesEndpoint){
		return (
			<div className="main-container" key="main-container">
				<div></div>
				<div className="feed-container">
					<CategoriesHeader 
						requestbaseurl={categoriesEndpoint}
						requestmethod={"GET"}
						limitCategories={7}
					/>
					{ children }
				</div>
				<div></div>
			</div>
		);
	}
	else{
		return null
	}
}

export { 
	FeedWithHeaderComponent as FeedWithHeader
};