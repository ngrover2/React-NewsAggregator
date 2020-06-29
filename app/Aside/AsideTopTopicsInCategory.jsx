import React , { useState, useEffect } from 'react';
import { AsideList } from './AsideList';
import { downloadContent } from '../Utils/utils';
import { useDispatch, useSelector } from 'react-redux';

const AsideTopTopicsInCategory = (props) => {
	const { listname, listDownloadParams, downloadAction, listItemsSelector } = props;
	const { remoteSectionId, activeSectionRecord } = props.otherParams || {};
	const scrollable = useState(props.scrollable || true); 
	const [ errorMessage, setErrorMessage ] = useState(null);
	const dispatch =  useDispatch();
	
	
	/* If selector passing is not a good pattern */
	/*
	function getTopicsSelector (listItemsSelectorType) {
		switch(listItemsSelectorType){
			case AppConstants.LIST_ITEMS_SELECTOR_TYPE.TRENDING_TOPICS: return selectors.getTrendingTopicsInCurrentCategory
			case AppConstants.LIST_ITEMS_SELECTOR_TYPE.TOP_TOPICS: return selectors.getTopTopicsInCurrentCategory
			default: null
		}
	}
	const listItems = useSelector(getTopicsSelector(listItemsSelectorType));
	*/
	
	const listItems = useSelector(listItemsSelector)
	
	useEffect(() => {
		let downloadParams = null
		if (listDownloadParams && remoteSectionId){
			downloadParams = {
				...listDownloadParams
			}
			if (downloadParams){
				downloadParams.onSuccessCallback = (downloadResults) => {
					var topics = downloadResults && downloadResults.length 
											? downloadResults.
												map((obj) => obj.topic && obj.topic != "" ? ({ ...obj, topicTag: obj.topic.toLowerCase()}) : {}).
												filter((obj) => obj ? true : false).
												sort((a, b) => a.rank - b.rank)
											: null;
					var params = {
						activeSectionRecord,
						topics
					}

					if (topics && topics.length)
						dispatch(downloadAction(params));
				};
				downloadParams.onErrorCallback = (errorOnDownload) => setErrorMessage(errorOnDownload);
				downloadContent(downloadParams);
			}
		}
	},[remoteSectionId]);

		if (Array.isArray(listItems) && listItems.length > 0){
			return (
				<AsideList
						listname={listname}
						listItems={listItems}
						activeSectionRecord={activeSectionRecord}
						showMoreAllowed={scrollable}
					/>
			);
		}else{
			return null;
		}
}

export { AsideTopTopicsInCategory };