import React, { useState, useEffect } from 'react';
import { AsideTopTopicsInCategory } from './AsideTopTopicsInCategory';
import { useSelector } from 'react-redux';
import * as actions from '../Store/actionCreators';
import { selectors } from '../Store/selectors';

const Aside = (props) => {
	const activeSectionId = useSelector(selectors.getActiveSectionId || null);
	const activeSectionRecord = useSelector(selectors.getActiveSectionRecord || null);
	const [ previousActiveSectionId, setPreviousActiveSectionId ] = useState(null);
	const [ renderAside, setRenderAside ] = useState(null);

	useEffect(() => {
		if (activeSectionId && ((!previousActiveSectionId) || previousActiveSectionId !== activeSectionId)){
			setPreviousActiveSectionId(activeSectionId)
		}
	},[activeSectionId])

	useEffect(() => {
		if (previousActiveSectionId && activeSectionRecord){
			setRenderAside(true);
		}
	},[previousActiveSectionId])

	if (renderAside && activeSectionRecord){
		return (
			<div className="fixed-aside" key="aside">
				<div className="feed-aside">
						<AsideTopTopicsInCategory 
							listname={"Trending"}
							listDownloadParams={activeSectionRecord.fetchTrendingTopics}
							downloadAction={actions.setTrendingTopicsForCurrentCategoryInAside}
							listItemsSelector={selectors.getTrendingTopicsInCurrentCategory}
							otherParams={{
								activeSectionRecord,
								remoteSectionId: activeSectionId,
							}}
						/>
						<AsideTopTopicsInCategory 
							listname={"Top Topics"}
							listDownloadParams={activeSectionRecord.fetchTopTopics}
							downloadAction={actions.setTopTopicsForCurrentCategoryInAside}
							listItemsSelector={selectors.getTopTopicsInCurrentCategory}
							otherParams={{
								activeSectionRecord,
								remoteSectionId: activeSectionId,
							}}
						/>
				</div>
			</div>
		);
	}	
	return null;
};

export default Aside;