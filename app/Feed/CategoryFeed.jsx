import React, { useState, useEffect } from 'react';
import { downloadContent } from '../Utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../Store/selectors';
import { setInitialFeedStories } from '../Store/actionCreators';
import { Stories } from '../Feed/Stories';
import { FeedWithHeader }  from '../Feed/FeedWithHeader';
import { AppConstants } from '../AppConfig/constants';

const CategoryFeed = (props) => {
	const [ errorMessage, setErrorMessage ] = useState("");
	const { format } = props;
	const apibaseurl = useSelector(selectors.getParamFromAppConfig("API_BASE_URL") || null);
	const [ configSet, setConfigSet ]  = useState(null);
	const activeSectionId = useSelector(selectors.getActiveSectionId)
	const activeSectionTag = useSelector(selectors.getActiveSectionTag)
	const activeSectionRecord = useSelector(selectors.getActiveSectionRecord || null)
	const [ activeSectionItems, setActiveSectionItems ] = useState([])
	const [ previousActiveSectionId, setPreviousActiveSectionId ] = useState(null);
	const dispatch = useDispatch();	

	useEffect(() => {
		if (apibaseurl)
			setConfigSet(true)
	},[apibaseurl])

	useEffect(() => {
		if (configSet){
			AppConstants.DEBUG_MODE && console.log("activeSectionId changed useEffect called")
			if (activeSectionId && (!previousActiveSectionId || previousActiveSectionId !== activeSectionId)){
				setPreviousActiveSectionId(activeSectionId)
			}
		}
	},[activeSectionId])

	useEffect(() => {
		if (configSet){
			AppConstants.DEBUG_MODE && console.log("previousActiveSectionId changed useEffect called")
			let downloadParams = null
			if (previousActiveSectionId && apibaseurl){
				if (!activeSectionRecord.items || !activeSectionRecord.items.length){
					downloadParams = 
					activeSectionRecord && activeSectionRecord.hasOwnProperty("fetchStories") &&
						activeSectionRecord.fetchStories
								? { ...activeSectionRecord.fetchStories }
								: null
			
					if (downloadParams){
						downloadParams.onSuccessCallback = (downloadResults) => {
							let params = {
								remoteSectionId: activeSectionId
							}
							dispatch(
								setInitialFeedStories(
									downloadResults, 
									null,
									params
							))
						};
						downloadParams.onErrorCallback = (errorOnDownload) => setErrorMessage(errorOnDownload);				
						
						if (needDownloadContent()){
							downloadContent(downloadParams);
						}
					}
				}
			}else{
				AppConstants.DEBUG_MODE && console.log("previousActiveSectionId is same as current", activeSectionId, "not downloading again")
			}
		}
	},[previousActiveSectionId])

	useEffect(() => {
		if (configSet){
			AppConstants.DEBUG_MODE && console.log("activeSectionRecord changed useEffect called")
			if (activeSectionRecord !== null && activeSectionRecord !== undefined)
				setItems()
		}
	},[activeSectionRecord])

	function needDownloadContent(){
		/**
		 * TODO: Add logic for pagination (Right now just downloads the first page)
		 */
		let stories = activeSectionItems
		return (stories !== null || (stories && stories.hasOwnProperty("length") && stories.length < 1))
	}

	function setItems(){
		let items = activeSectionRecord && activeSectionRecord.items && activeSectionRecord.items.length
		? activeSectionRecord.items
		: []
		if (items && items.length > 0){
			setActiveSectionItems(items)
		}
	}

	if (configSet){
		return (
			<FeedWithHeader>
				<Stories 
					stories={activeSectionItems}
					activeSectionTag={activeSectionTag}
					{...{
						apibaseurl,
						format
					}}
				/>
			</FeedWithHeader>
		)
	}else{
		return null;
	}
}

export { CategoryFeed }
