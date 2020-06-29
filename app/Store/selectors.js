import { getObjAndIndexWithValAtKeyFromArray } from '../Utils/utils';
import { default as AppConfig } from '../AppConfig/config';
import { AppConstants } from '../AppConfig/constants';

const getApiUrlFor = AppConfig.getApiUrlFor;
const getSectionKeyFor = AppConfig.getSectionKeyFor;
const REMOTE_SECTION_NAMES = AppConstants.REMOTE_SECTION_NAMES;
const REMOTE_FETCH_PREFIX_NAMES = AppConstants.REMOTE_FETCH_PREFIX_NAMES;

export const extractCategories = ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector extractCategories")
	let categories = state.sections && 
			state.sections.hasOwnProperty('categoryDescriptions') && 
				state.sections.categoryDescriptions &&
					state.sections.categoryDescriptions.length && state.sections.categoryDescriptions.length > 0 
					? state.sections.categoryDescriptions
					: [];
	AppConstants.DEBUG_MODE && console.log("OK")
	AppConstants.DEBUG_MODE && console.groupEnd("Selector extractCategories")
	return categories
}

export const getCategoryIdByName = ( state = {} , name) => {
	return state.sections && state.sections.length ? state.sections.filter((cat) => cat.name.toLowerCase() == name) : {}
}

export const getCurrentSelectedCategoryObject = ( state = {} ) => {
	return (
		state.hasOwnProperty('sections') &&
			state.sections && state.sections.hasOwnProperty('current') 
				? state.sections.current
				: {}
	)
}

export const getActiveSectionId = ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector getActiveSectionId")
	
	let activeSectionId = state.hasOwnProperty('sections') &&
		state.sections && state.sections.hasOwnProperty('activeSectionId')
			? state.sections.activeSectionId
			: null

	AppConstants.DEBUG_MODE && console.log(activeSectionId)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getActiveSectionId")
	return activeSectionId
}

export const getActiveSectionTag = ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector getActiveSectionTag")
	
	let activeSectionTag = state.hasOwnProperty('sections') &&
		state.sections && state.sections.hasOwnProperty('activeSectionTag')
			? state.sections.activeSectionTag
			: null

	AppConstants.DEBUG_MODE && console.log(activeSectionTag)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getActiveSectionTag")
	return activeSectionTag
}

export const getActiveSectionRecord = ( state = {} ) => {
	let activeSectionRecord = null
	let returnRecord = null
	AppConstants.DEBUG_MODE && console.group("Selector getActiveSectionRecord")
	try{
		activeSectionRecord = (
			state.hasOwnProperty('sections') &&
				state.sections && state.sections.hasOwnProperty('activeSectionId') && 
					state.sections.activeSectionId
						? getObjAndIndexWithValAtKeyFromArray(state.sections.records, "remoteSectionId", state.sections.activeSectionId)
						: null 
		)
		returnRecord = (
			activeSectionRecord && activeSectionRecord.element && activeSectionRecord.indexAt != null && activeSectionRecord.indexAt > -1
			? activeSectionRecord.element
			: null
		)
		AppConstants.DEBUG_MODE && console.log(returnRecord)
	}catch(e){
		AppConstants.DEBUG_MODE && AppConstants.DEBUG_MODE && console.log("Error in selector: getActiveSectionRecord", e)
		throw e
	}finally{
		AppConstants.DEBUG_MODE && console.groupEnd("Selector getActiveSectionRecord")
	}
	return returnRecord
}

export const getActiveSectionItems = ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector getActiveSectionItems")

	let activeSectionRecord = (
		state.hasOwnProperty('sections') &&
			state.sections && state.sections.hasOwnProperty('records') &&
				state.sections.records && state.sections.records.hasOwnProperty('activeSectionId')
					? getObjAndIndexWithValAtKeyFromArray(state.sections.records, "remoteSectionId", state.sections.records[activeSectionId])
					: null 
	)
	
	// return (
	// 	activeSectionRecord && activeSectionRecord.element && activeSectionRecord.indexAt != null && activeSectionRecord.indexAt > -1
	// 	? activeSectionRecord.element.items ? activeSectionRecord.element.items : null
	// 	: []
	// )
	let returnItems = 
		activeSectionRecord && activeSectionRecord.element && activeSectionRecord.indexAt != null && activeSectionRecord.indexAt > -1
			? activeSectionRecord.element.items ? activeSectionRecord.element.items : null
			: []

	AppConstants.DEBUG_MODE && console.log(returnItems.length)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getActiveSectionItems")
}

export const getFeedForTopicInCurrentCategory = (topicid) => ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector getFeedForTopicInCurrentCategory")
	AppConstants.DEBUG_MODE && console.log(
		topicid && state.hasOwnProperty('sections') &&
			state.sections && state.sections.hasOwnProperty('current') &&
				state.sections.current.hasOwnProperty('topics') &&
					state.sections.current.topics.hasOwnProperty(topicid) &&
						state.sections.current.topics[topicid].hasOwnProperty("feed")
						? state.sections.current.topics[topicid].feed
						: []
	)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getFeedForTopicInCurrentCategory")
	return (
		topicid && state.hasOwnProperty('sections') &&
			state.sections && state.sections.hasOwnProperty('current') &&
				state.sections.current.hasOwnProperty('topics') &&
					state.sections.current.topics.hasOwnProperty(topicid) &&
						state.sections.current.topics[topicid].hasOwnProperty("feed")
						? state.sections.current.topics[topicid].feed
						: []
	)
}

export const getSearchResults = (state={}) => {
	return (
		state.search && state.search.results
		? state.search.results
		: []
	)
}

export const getParamFromAppConfig = (paramName) => ( state = {} ) => {
	AppConstants.DEBUG_MODE && console.group("Selector getParamFromAppConfig")
	AppConstants.DEBUG_MODE && console.log(
		state.hasOwnProperty('config') &&
			state.config.hasOwnProperty(paramName)
				? state.config[paramName]
				: null
	)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getParamFromAppConfig")
	return (
		state.hasOwnProperty('config') &&
			state.config.hasOwnProperty(paramName)
				? state.config[paramName]
				: null
	)
}

export const getTopTopicsInCurrentCategory = ( state = {} ) => {
	let activeSectionRecord = getActiveSectionRecord(state)
	AppConstants.DEBUG_MODE && console.group("Selector getTopTopicsInCurrentCategory")
	AppConstants.DEBUG_MODE && console.log(
		activeSectionRecord && activeSectionRecord.hasOwnProperty("topTopics")
		? activeSectionRecord.topTopics
		: []
	)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getTopTopicsInCurrentCategory")
	return (activeSectionRecord && activeSectionRecord.hasOwnProperty("topTopics")
	? activeSectionRecord.topTopics
	: [])
}

export const getTrendingTopicsInCurrentCategory = ( state = {} ) => {
	let activeSectionRecord = getActiveSectionRecord(state)
	AppConstants.DEBUG_MODE && console.group("Selector getTrendingTopicsInCurrentCategory")
	AppConstants.DEBUG_MODE && console.log(
		activeSectionRecord && activeSectionRecord.hasOwnProperty("trendingTopics")
		? activeSectionRecord.trendingTopics
		: []
	)
	AppConstants.DEBUG_MODE && console.groupEnd("Selector getTrendingTopicsInCurrentCategory")
	return (activeSectionRecord && activeSectionRecord.hasOwnProperty("trendingTopics")
	? activeSectionRecord.trendingTopics
	: [])
}


export const selectors = {
		extractCategories,
		getCategoryIdByName,
		getCurrentSelectedCategoryObject,
		getParamFromAppConfig,
		getTopTopicsInCurrentCategory,
		getTrendingTopicsInCurrentCategory,
		getFeedForTopicInCurrentCategory,
		getActiveSectionId,
		getActiveSectionTag,
		getActiveSectionItems,
		getActiveSectionRecord
}