import React, { useState, useEffect } from 'react';
import { downloadContent } from '../Utils/utils';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAllCategories, setCurrentCategory } from '../Store/actionCreators';
import { selectors } from '../Store/selectors';

const HeaderComponent = (props) => {
	
	const [ errorMessage, setErrorMessage ] = useState(null);
	const limitCategories = useState(props.limitCategories || 7);
	
	const categories = useSelector(selectors.extractCategories)
	const activeSectionId = useSelector(selectors.getActiveSectionId)
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("props.apibaseurl changed useEffect")
		console.log("requestbaseurl", props.requestbaseurl)
		var propsCopy = null
		if (props.requestbaseurl){
			propsCopy = Object.assign({}, props);
			propsCopy.onSuccessCallback = (downloadResults) => { dispatch(setAllCategories(downloadResults))};
			propsCopy.onErrorCallback = (errorOnDownload) => setErrorMessage(errorOnDownload);
			downloadContent(propsCopy);
		}
	},[props.apibaseurl]);

	const Category = ({ category }) => {
		if(category){
			let headerClassName = activeSectionId == category.remoteSectionId ? "header-category --category-selected" : "header-category";
			return (<Link 
				to={{
					pathname: category.displayurl
				}}
				className={headerClassName}
				onClick={() => {
					if(category)
						dispatch(setCurrentCategory(category));
				}}
			>{category.name}</Link>);
		}
		
		return null;
	}

	const Categories = ({categories, limitCategories}) => {
		if (Array.isArray(categories) && categories.length > 0){
			return categories
					.filter((category) => category.order < parseInt(limitCategories))
					.map((category) => 
							<Category
								category={category || {}}
								key={`k-feed-cat-header-${category.name}`}
							/>
					)
		}
		return <div>No Categories</div>;
	}

	if (categories && categories.length > 0){
		return (
			<React.Fragment>
				<div className="feed-categories-header">
					<Categories {...{categories, limitCategories}}/>
				</div>
			</React.Fragment>
		);
	}else{
		return null;
	}
	
}

export {
	HeaderComponent as CategoriesHeader
}