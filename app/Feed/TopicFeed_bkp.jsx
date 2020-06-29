import React, { useState, useEffect } from 'react';
import { downloadContent } from '../Utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../Store/selectors';
import { setInitialFeedStories } from '../Store/actionCreators';
import { FeedNoHeader }  from '../Feed/FeedNoHeader';
import { Stories } from '../Feed/Stories';
import { default as AppConstants } from '../AppConfig/constants';

const StoriesComponent = (props) => {
	const [ errorMessage, setErrorMessage ] = useState("");
	const { apibaseurl, matchprop, format } = props;

	const currentCategory = useSelector(selectors.getCurrentSelectedCategoryObject)
	const [ currentCategoryId, setCurrentCategoryId ] = useState(currentCategory ? currentCategory.id : null)
	const dispatch = useDispatch();
	
	const stories = useSelector(selectors.getFeedForCategory(currentCategoryId))
	
	useEffect(() => {
		if (currentCategory && (!currentCategoryId || currentCategoryId != currentCategory.id))
			setCurrentCategoryId(currentCategory.id)
	},[currentCategory])

	useEffect(() => {
		let downloadParams = null
		if (currentCategory){
			downloadParams = currentCategory.fetchStories ? {...currentCategory.fetchStories} : null 
		}

		if (downloadParams){
			downloadParams.onSuccessCallback = (downloadResults) => {
				dispatch(setInitialFeedStories(downloadResults, forFeedType = AppConstants.FEED_TYPES.STANDALONE.CATEGORY))
			};
			downloadParams.onErrorCallback = (errorOnDownload) => setErrorMessage(errorOnDownload);
			
			if (!stories || (stories.hasOwnProperty("length") && stories.length < 1)){
				downloadContent(downloadParams);
			}
		}
	},[currentCategoryId]);

	return (
		<FeedNoHeader>
			<Stories 
				stories={stories}
				{...{
					apibaseurl,
					matchprop,
					format
				}}
			/>
		</FeedNoHeader>
	)

	// const Stories = ({ stories, apibaseurl, matchprop, format}) => {
	// 	try{
	// 		if (Array.isArray(stories) && stories.length > 0) {
	// 			return stories.map((story) => <StoryCard {...story} key={`k-story-card-stories-${story.id}`} apibaseurl={apibaseurl} format={format}/>)
	// 		}
	// 		return <div>No Stories</div>;
	// 	}catch(err){
	// 		return <div>No Stories</div>;
	// 	}
	// }

	// if (format == "TYPE_2"){
	// 	return (
	// 		<React.Fragment>
	// 			<div className="feed-main--type-2">
	// 				<Stories {...{stories:stories}} apibaseurl={apibaseurl} matchprop={matchprop} format={format}/>
	// 			</div>
	// 		</React.Fragment>
	// 	);	
	// }
	// return (
	// 	<React.Fragment>
	// 		<div className="feed-main">
	// 			<Stories {...{stories:stories}} apibaseurl={apibaseurl} matchprop={matchprop} format={format}/>
	// 		</div>
	// 	</React.Fragment>
	// );
}

export { StoriesComponent as TopicFeed }