import React from "react";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppConstants } from '../AppConfig/constants';
import { setActiveSectionId } from '../Store/actionCreators'

const StoryCard = (props) => {
	let category = props.category && props.category.toUpperCase() != "OTHER" ? props.category : "";
	const { activeSectionTag, format } = props || {};

	const dispatch = useDispatch();

	
	const getPrimaryTopicFromTopicList = (topicList, activeSectionTag) => {
		if (Array.isArray(topicList)){
			let filtered = topicList.filter(
				(topicObj) => 
						topicObj.name.toUpperCase() != category &&
							topicObj.name.toLowerCase() != activeSectionTag
			)
			if (filtered.length > 0){
				return filtered[0]
			}
		}

		return null;
	}

	const TopicElement = ({topics, activeSectionTag}) => {
		const primaryTopicEl = getPrimaryTopicFromTopicList(topics, activeSectionTag) || {};
		if (primaryTopicEl){
			let primaryTopic = primaryTopicEl.name;
			let remoteSectionId = primaryTopicEl.remoteSectionId

			if (props.format && props.format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
				return (
					<div className="textual-pub">
						<a 
							onClick={() => {
								let topicTag = 
								dispatch(setActiveSectionId(remoteSectionId, primaryTopicEl.topicTag))
							}}
						>
							{primaryTopic}
						</a>
					</div>
				);
			}
			return (
				<div className="story-topic topic-text">
					<a 
						onClick={() => {
							dispatch(setActiveSectionId(remoteSectionId, primaryTopicEl.topicTag))
						}}
					>
						{primaryTopic}
					</a>
				</div>
			);
		}else {
			return <div className="story-topic --no-visible"><a>{"Miscellaneous"}</a></div>
		};
	}

	const CategoryElement = (props) => {
		if (props.category){
			return null;
			// return <span className="story-author"> {`In ${props.category}`}</span>
		}
		return null;
	}

	const PublishedTime = (props) => {

		let publishedWhen = getFormattedPubTime(props.pubDate);
		
		if (publishedWhen){
			if (props.format && props.format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
				return <div className="ago"><div className="ago-txt">{publishedWhen}</div></div>	
			}
			return (<div className="time-ago">{publishedWhen}</div>);
		}
		return null;
	}

	const StoryTitle = (props) => {
		if (props.format && props.format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
			return (
				<div className="textual-title">
					<a href={props.link} target="_blank">
						{props.title}
					</a>
				</div>
			);
		}else{
			return (
				<div className="story-title title-text">
					<a href={props.link} target="_blank">
						{props.title}
					</a>	
				</div>
			);
		}
	}

	const StoryImage = (props) => {
		if (props.format && props.format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
			return (
				<div className="storycard-image--type-2">
					<a href={props.link} target="_blank">
						<img src={props.image_link}></img>
					</a>
				</div>
			);
		}
		return (
			<div className="story-image">
				<a href={props.link} target="_blank">
					<img src={props.image_link}></img>
				</a>
			</div>
		);
	}

	const StorySource = (props) => {

		if (props.format && props.format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
			if (props.author){
				return (
					<div className="textual-footer">
						<div className="by"><div className="by-txt">{props.domain} <span className="by-author">{props.author}</span></div></div>
						<PublishedTime pubDate={props.pubDate} format={props.format}/>
					</div>
				);
			}else{
				return (
					<div className="textual-footer">
						<div className="by"><div className="by-txt">{props.domain}</div></div>
						<PublishedTime pubDate={props.pubDate} format={props.format}/>
					</div>
				);
			}
		}
		return (
			<div className="story-source source-text">
				<a>
					{props.domain}
					<CategoryElement category={props.category}/>
				</a>
			</div>
		);
	}
	
	function getFormattedPubTime(pubDate) {
		if (pubDate){
			try{
				return moment(props.pubDate).fromNow();
			}catch(Exception){
				return null;
			}
		}
	}

	if (format == AppConstants.STORIES_DISPLAY_FORMATS.TYPE_2){
		return (
			<div className="storycard-grid--type-2" key={4}>
				<StoryImage link={props.link} image_link={props.image_link} format={format}/>
				<div className="storycard-textual--type-2">
					<TopicElement topics={props.topics} format={format} activeSectionTag={activeSectionTag}/>	
					<StoryTitle link={props.link} title={props.title} format={format}/>
					<StorySource domain={props.domain} category={props.category} pubDate={props.pubDate} format={format}/>
				</div>
			</div>
		)
	}else{
		return (
			<div className="storycard-grid">
				<div className="story-header">
					<div className="story-attribution attribution-text">
						<a className="internal-publisher-link">{props.publisher}</a>
					</div>
				</div>
				<div className="story-content">
					<StoryImage link={props.link} image_link={props.image_link} format={format}/>
					<TopicElement topics={props.topics} activeSectionTag={activeSectionTag}/>	
					<StoryTitle link={props.link} title={props.title} format={format}/>
					<StorySource domain={props.domain} category={props.category}/>
				</div>
				<div className="story-footer">
					<PublishedTime pubDate={props.pubDate}/>
				</div>
			</div>
		)
	}
}

export { StoryCard }