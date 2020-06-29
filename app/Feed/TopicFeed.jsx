import React, { useState, useEffect } from 'react';
import { downloadContent } from '../Utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../Store/selectors';
import { setInitialFeedStories } from '../Store/actionCreators';
import { Stories } from '../Feed/Stories';
import { FeedWithHeader }  from '../Feed/FeedWithHeader';
import { AppConstants } from '../AppConfig/constants';

const TopicFeed = (props) => {
	const [ errorMessage, setErrorMessage ] = useState("");
	const { format } = props;

	const apibaseurl = selectors.getParamFromAppConfig('API_BASE_URL')
	
	// we neeed to dispatch action to save stories
	// to the topic object that should have feeds 
	// for each topic stored by id
	// that object is subscribed by this component to fetch feed for the topic under request
	// to get the topic under request we need to store that in the store
	
	// when user clicks on a topic, it should dispatch an action 
	// that sets the current ctx to /topic/:topic feed
	// and then the 
	
	const currentCategory = useSelector(selectors.getCurrentSelectedCategoryObject)
	const storiesForCategory = useSelector(selectors.getFeedForCategory(currentCategory ? currentCategory.id : null))
	const storiesForTopicWithinCategory = useSelector(selectors.getFeedForTopicInCurrentCategory(currentCategory.ctxparams && currentCategory.ctxparams.id ? currentCategory.ctxparams.id : null))

	// to try not to download same thing again in an edge case (that causes a loop because it updates the selectors!!)
	const [ downloadCtx, setDownloadCtx ] = useState({})

	const [ downloadCount, setDownloadCount ] = useState(0)
	
	const dispatch = useDispatch();
	
	useEffect(() => {
		let downloadParams = null
		let thisDownloadCtx = null
		if(
			currentCategory.name !== null &&
			currentCategory.name !== undefined &&
			currentCategory.ctx !== null &&
			currentCategory.ctx !== undefined
		){
			downloadParams = 
				currentCategory.hasOwnProperty("ctxparams") &&
					currentCategory.ctxparams.hasOwnProperty("fetchStories")
						? { ...currentCategory.ctxparams.fetchStories }
						: null
			thisDownloadCtx = 
				currentCategory.hasOwnProperty("ctxparams") ? {
					id: currentCategory.ctxparams.id,
					name: currentCategory.ctxparams.name,
					ctx: currentCategory.ctx,
				} : null
			let currentDownloadCtxCopy = {...downloadCtx}
			setDownloadCtx(thisDownloadCtx);
			if (
				thisDownloadCtx &&
				(
					thisDownloadCtx.id != currentDownloadCtxCopy.id &&
					thisDownloadCtx.name != currentDownloadCtxCopy.name
				) ||
					thisDownloadCtx.ctx != currentDownloadCtxCopy.ctx
			){
				if (downloadParams){
					downloadParams.onSuccessCallback = (downloadResults) => {
						let params = {
							id: currentCategory.ctxparams ? currentCategory.ctxparams.id : null
						}
						setDownloadCount(downloadCount + 1)
						dispatch(
							setInitialFeedStories(
								downloadResults, 
								currentCategory.ctx,
								params
						))
					};
					downloadParams.onErrorCallback = (errorOnDownload) => setErrorMessage(errorOnDownload);				
					
					if (needDownloadContent(currentCategory.ctx)){
						downloadContent(downloadParams);
					}
				}
			}
		}
	},[currentCategory.name, currentCategory.ctx, currentCategory.ctxparams]);

	function needDownloadContent(ctx){
		/**
		 * TODO: Add logic for pagination (Right now just downloads the first page)
		 */
		let stories = getStoriesForCtx(ctx)
		return (stories !== null || (stories && stories.hasOwnProperty("length") && stories.length < 1))
	}

	function getStoriesForCtx(ctx){
		
		
		switch(ctx){
			case AppConstants.FEED_TYPES.STANDALONE.CATEGORY: {
				return storiesForCategory
			}
			case AppConstants.FEED_TYPES.CONTEXTUAL.TOPIC_IN_CATEGORY: {
				return storiesForTopicWithinCategory
			}
			default: {
				return null
			}
		}
	}
	
	return (
		<FeedWithHeader
			apibaseurl={apibaseurl}
		>
			<Stories 
				stories={getStoriesForCtx(currentCategory.ctx)}
				{...{
					apibaseurl,
					format
				}}
			/>
		</FeedWithHeader>
	)
}

export { TopicFeed }
