import { actionTypes as actions } from './actionTypes';
import { combineReducers } from 'redux';
import { default as AppConfig } from '../AppConfig/config';
import { getObjAndIndexWithValAtKeyFromArray, replaceObjAtIndexInArray, addOnlyNewObjectsInArray } from '../Utils/utils';

const apibaseurl = AppConfig.API_BASE_URL;
import { AppConstants } from '../AppConfig/constants';
const REMOTE_SECTION_NAMES = AppConstants.REMOTE_SECTION_NAMES
const REMOTE_FETCH_PREFIX_NAMES = AppConstants.REMOTE_FETCH_PREFIX_NAMES
const getApiUrlFor = AppConfig.getApiUrlFor
const getSectionKeyFor = AppConfig.getSectionKeyFor

export const configReducer = (config = {}, action) => {
	switch(action.type){
		case actions.SET_APP_CONFIG: {
			AppConstants.DEBUG_MODE && console.group("configReducer")
			AppConstants.DEBUG_MODE && console.log("Setting config")
			AppConstants.DEBUG_MODE && console.log(action.payload.config)
			AppConstants.DEBUG_MODE && console.groupEnd("configReducer")
			return action.payload
					&& action.payload.hasOwnProperty("config") 
					? ({ ...config, ...action.payload.config })
					: { ...config }
		}
		default: return { ...config }
	}
}

export const FeedReducer = (sections = {}, action) => {
	try{
		switch(action.type){
			case actions.SET_CATEGORIES: {
				AppConstants.DEBUG_MODE && console.group("SET_CATEGORIES action")
				let categoriesAll = [];
				try {
					categoriesAll = 
					action.payload && action.payload.categories ? [
						...action.payload.categories.map((cat) => {
							let categoryTag = cat.name ? cat.name.toLowerCase() : null
							return ({
								...cat,
								categoryTag,
								remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.CATEGORY, [ categoryTag ]),
								type: AppConstants.FEED_TYPES.STANDALONE.CATEGORY,
								fetchStories: {
										requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.CATEGORY, [categoryTag || AppConstants.DEFAULT_FEED_CATEGORY_TAG]),
										requestmethod:"POST",
										requestbody:{
											category_id: cat.id
										},
										requestparams: {
											category_id: cat.id
										}
								},
								fetchTopTopics: {
									requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TOP_TOPICS,[categoryTag || AppConstants.DEFAULT_FEED_CATEGORY_TAG]),
									requestmethod: "POST",
									requestbody:{
										category_id: cat.id
									},
									requestparams: {
										category_id: cat.id
									}
								},
								fetchTrendingTopics: {
									requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TRENDING_TOPICS, [categoryTag || AppConstants.DEFAULT_FEED_CATEGORY_TAG]),
									requestmethod: "POST",
									requestbody:{
										category_id: cat.id
									},
									requestparams: {
										category_id: cat.id
									}
								}
							})
						})
					] : []
				}catch(e){
					AppConstants.DEBUG_MODE && console.log(e)
					throw new Error(`categoriesAll could not be set in categoryActionsReducer for action SET_CATEGORIES`)
				}
				let defaultRemoteSectionId = getSectionKeyFor(REMOTE_SECTION_NAMES.CATEGORY, [ AppConstants.DEFAULT_FEED_CATEGORY_TAG ])

				let navCtx = {
					remoteSectionId: defaultRemoteSectionId,
					// add selected topic related info (ctx) to current nav
					ctx: AppConstants.FEED_TYPES.STANDALONE.CATEGORY
				}
				
				let records = 
					sections.records && sections.records.length 
						? [
							...sections.records,
							...categoriesAll
						]
						: [ ...categoriesAll ]
				
				let activeSectionId = defaultRemoteSectionId
				AppConstants.DEBUG_MODE && console.log("SET_CATEGORIES successfully completed")
				AppConstants.DEBUG_MODE && console.groupEnd("SET_CATEGORIES action")
				return { 
					...sections, 
					records, 
					activeSectionId, 
					activeSectionTag: AppConstants.DEFAULT_FEED_CATEGORY_TAG,
					categoryDescriptions: categoriesAll,
					navCtx 
				}
			}
			case actions.SET_CURRENT_CATEGORY: {
				const { category, ctx } = action.payload || {};
				if (!category || !ctx) return { ...sections }

				const { remoteSectionId, categoryTag } = category;
				if (!remoteSectionId || !categoryTag) return { ...sections }
				
				let newRemoteSectionId = getSectionKeyFor(REMOTE_SECTION_NAMES.CATEGORY, [ categoryTag ]);

				return { 
					...sections, 
					activeSectionId: newRemoteSectionId,
					activeSectionTag: categoryTag,
				}
			}

			case actions.SET_CURRENT_TOPIC: {
				const { remoteSectionId, sectionTag, ctx } = action.payload || {};
				if (!remoteSectionId || !ctx) return { ...sections }

				return { 
					...sections, 
					activeSectionId: remoteSectionId,
					activeSectionTag: sectionTag
				}
			}

			case actions.SET_TOPIC_IN_CURRENT_CATEGORY: {
				const { topic, activeSectionRecord } = action.payload ? action.payload : {};
				const { topicTag } = topic || {};
				const { categoryTag } = activeSectionRecord || {};
				if (!topic || !topicTag || !activeSectionRecord || !categoryTag) return { ...sections }
				
				// Get remoteSectonId for current topic
				let topicRemoteSectionId = getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC_IN_CATEGORY, [ categoryTag, topicTag ])

				/* 
				If it is a new remoteSectionId, create a new object to hold its related properties
				*/
				
				let { element, indexAt } = getObjAndIndexWithValAtKeyFromArray(sections.records, "remoteSectionId", topicRemoteSectionId) || {}
				
				let activeSectionRecordPropertiesToAdd = {};
				if (activeSectionRecord){
					activeSectionRecordPropertiesToAdd = { ...activeSectionRecord }
					delete activeSectionRecordPropertiesToAdd.fetchStories
					delete activeSectionRecordPropertiesToAdd.fetchTopTopics
					delete activeSectionRecordPropertiesToAdd.fetchTrendingTopics
					delete activeSectionRecordPropertiesToAdd.items
					delete activeSectionRecordPropertiesToAdd.remoteSectionId
					delete activeSectionRecordPropertiesToAdd.type
				}

				let records = null
				// If element does not exist, add it
				if (indexAt == null || indexAt < 0) {
					let toAdd = {
						remoteSectionId: topicRemoteSectionId,
						...topic,
						type: AppConstants.FEED_TYPES.CONTEXTUAL.TOPIC_IN_CATEGORY,
						...activeSectionRecordPropertiesToAdd
					}
					records = [...sections.records, toAdd]
					
					return { 
						...sections,
						records,
						activeSectionId: topicRemoteSectionId,
						activeSectionTag: topicTag
					}
				}else{
					// Just set the activeSectionId to current topic's remoteSectonId
					return { 
						...sections, 
						activeSectionId: topicRemoteSectionId,
						activeSectionTag: topicTag
					}
				}
			}

			case actions.SET_ASIDE_TOP: {

				const { topics, activeSectionRecord } = action.payload ? action.payload : {};
				const { categoryTag } = activeSectionRecord || {};
				if (!topics || !activeSectionRecord || !categoryTag) return { ...sections }

				let overall = topics.length > 0 ? [
					...topics.map((topicObj) => {
						const { topicTag, topic_id, topic } = topicObj || {};
						return ({
							...topicObj,
							topicTag,
							remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC_IN_CATEGORY, [ categoryTag, topicTag ]),
							fetchStories: {
								requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TOPIC, [topicTag]),
								requestmethod:"POST",
								requestbody:{
									topic_id: topic.topic_id,
									category_id: activeSectionRecord.id
								}
							}
						})
					})
				] : []
				

				let { element, indexAt } = getObjAndIndexWithValAtKeyFromArray(sections.records, "remoteSectionId", activeSectionRecord.remoteSectionId) || {}
				
				// TODO: Add Exception handling
				if (indexAt == null || indexAt < 0) throw new Error(`Missing remoteSectionId: ${remoteSectionId} in state.`)
				
				// update existing element with feed items
				element = {
					...element,
					topTopics: overall
				}

				let records = replaceObjAtIndexInArray(sections.records, indexAt, element)

				return { 
					...sections, 
					records
				}
			}
			case actions.SET_ASIDE_TRENDING: {
				const { topics, activeSectionRecord } = action.payload ? action.payload : {};
				const { categoryTag } = activeSectionRecord || {};
				if (!topics || !activeSectionRecord || !categoryTag) return { ...sections }

				let trending = topics.length > 0 ? [
					...topics.map((topicObj) => {
						const { topicTag, topic_id, topic } = topicObj || {};
						return ({
							...topicObj,
							topicTag,
							remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC_IN_CATEGORY, [ categoryTag, topicTag ]),
							fetchStories: {
								requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TOPIC, [topicTag]),
								requestmethod:"POST",
								requestbody:{
									topic_id: topic_id,
									category_id: activeSectionRecord.id,
								}
							}
						})
					})
				] : []

				let { element, indexAt } = getObjAndIndexWithValAtKeyFromArray(sections.records, "remoteSectionId", activeSectionRecord.remoteSectionId) || {}
				
				// TODO: Add Exception handling
				if (indexAt == null || indexAt < 0) throw new Error(`Missing remoteSectionId: ${remoteSectionId} in state.`)
				
				// update existing element with feed items
				element = {
					...element,
					trendingTopics: trending
				}

				let records = replaceObjAtIndexInArray(sections.records, indexAt, element)

				return { 
					...sections, 
					records
				}
			}


			case actions.SET_FEED: {
				let { stories, params } = action && 
					action.payload 
					? action.payload
					: {}
				AppConstants.DEBUG_MODE && console.group("SET_FEED action")
				const { remoteSectionId } = params || {};

				if (!remoteSectionId || !stories || stories.length < 1 ) return { ...sections }
				AppConstants.DEBUG_MODE && console.log("activeSectionId", remoteSectionId)
				
				let topicIdToObjMap = new Map();

				function addToTopicIdToObjMap(topics){
					if (topics && topics.length){
						for (let topicObj of topics){
							topicIdToObjMap.set(topicObj.id, topicObj)
						}
					}
				}
				// construct feed items
				let items = stories ? [
					...stories.map((story) => {
						addToTopicIdToObjMap(story.topics)
						return {
							type: "story",
							...story,
							topics: story.topics.map((topicObj) => {
								let topicTag = topicObj.name ? topicObj.name.toLowerCase() : null
								return ({
									...topicObj,
									topicTag,
									remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC, [ topicTag ]),
								})
							})
						}
					})
				] : [];

				// set feed items on activeSectionId state
				let { element, indexAt } = getObjAndIndexWithValAtKeyFromArray(sections.records, "remoteSectionId", remoteSectionId) || {}
				
				if (indexAt == null || indexAt < 0) throw new Error(`Missing remoteSectionId: ${newRemoteSectionId} in state.`)
				
				// update existing element with feed items
				element = {
					...element,
					items
				}
				
				let records = replaceObjAtIndexInArray(sections.records, indexAt, element)

				// add each element of addToTopicIdToObjMap Map as a separate record with its own remoteectionId for storing feeds for topics
				let newTopicRecords = []
				for (let [topicId, topicObj] of topicIdToObjMap){
					let topicTag = topicObj.name ? topicObj.name.toLowerCase() : null
					newTopicRecords.push({
						...topicObj,
						topicTag,
						remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC, [ topicTag ]),
						fetchStories: {
							requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TOPIC, [topicTag]),
							requestmethod:"POST",
							requestbody:{
								topic_id: topicObj.id,
								page_size: AppConstants.DEFAULT_PAGE_SIZE
							}
						}
					})
				}
				
				let mergedRecords = addOnlyNewObjectsInArray(records || [], "remoteSectionId", newTopicRecords)
				AppConstants.DEBUG_MODE && console.log("completed normally")
				AppConstants.DEBUG_MODE && console.groupEnd("SET_FEED action")
				return { 
					...sections, 
					records: mergedRecords
				}
			}
			case actions.SELECT_SEARCH_RESULT: {
				const { searchResult } = action.payload || {}
				if (!searchResult) return { ...sections }

				let records = sections.records && sections.records.length 
				? [ searchResult, ...sections.records ]
				: [ searchResult ]

				let activeSectionId = searchResult.remoteSectionId
				let activeSectionTag = searchResult.tag

				return { ...sections, records, activeSectionId, activeSectionTag }
			}
			default: return { ...sections }
		}
	}catch(err){
		AppConstants.DEBUG_MODE && console.log(err)
		return { ...sections };
	}
}

export const SearchReducer = (searchState={}, action) => {
	switch(action.type){
		case actions.SET_SEARCH_RESULTS: {
			const { searchResults } = action.payload || {}
			if (searchResults && searchResults.length){
				let newResults = 
						searchResults.map((result) => {
							// TODO: Structure result according to its type. Right now all results are assumed to be topics
							let topicTag = result.topic ? result.topic.toLowerCase() : null
							let structured = {
								...result,
								tag: result.topic ? result.topic.toLowerCase() : null,
								remoteSectionId: getSectionKeyFor(REMOTE_SECTION_NAMES.TOPIC, [ topicTag ]),
								fetchStories: {
									requestbaseurl: getApiUrlFor(REMOTE_FETCH_PREFIX_NAMES.TOPIC, [ topicTag ]),
									requestmethod: "POST",
									requestbody: {
										topic_id: result.topic_id || null,
										page_size: AppConstants.DEFAULT_PAGE_SIZE
									}
								}
							}
							return structured
						})
				
				let results = newResults && newResults.length
								? [ ...newResults]
								: [ ]
				return { ...searchState, results }
			}

			return { ...searchState }
		}
		
		case actions.CLEAR_SEARCH_RESULTS: {
			let results = []
			return { ...searchState, results }
		}

		default: return { ...searchState }
	}
}


export const reducer = combineReducers({
	config: configReducer,
	sections: FeedReducer,
	search: SearchReducer
});