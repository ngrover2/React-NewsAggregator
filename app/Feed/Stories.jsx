import React from 'react';
import { StoryCard } from './StoryCard';
import { AppConstants } from '../AppConfig/constants';

const StoriesList = ({ stories, apibaseurl, matchprop, format, activeSectionTag}) => {
	try{
		if (Array.isArray(stories) && stories.length > 0) {
			return stories.map((story) => <StoryCard {...story} key={`k-story-card-stories-${story.id}`} apibaseurl={apibaseurl} format={format} activeSectionTag={activeSectionTag}/>)
		}
		return <div>No Stories</div>;
	}catch(err){
		return <div>No Stories</div>;
	}
}

const Stories = (props) => {
	const { format } = props;
	switch(format){
		case AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2: {
			return (
				<React.Fragment>
					<div className="feed-main--type-2">
						<StoriesList {...props}/>
					</div>
				</React.Fragment>
			);	
		}
		default: {
			return (
				<React.Fragment>
					<div className="feed-main">
						<StoriesList {...props}/>
					</div>
				</React.Fragment>
			);	
		}
	}
}

export { Stories }