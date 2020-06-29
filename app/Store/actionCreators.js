import { actionTypes as actions } from './actionTypes';
import { AppConstants } from '../AppConfig/constants';

export const setAllCategories = (categories = []) => ({
	type: actions.SET_CATEGORIES,
	payload: {
		categories
	}
});

export const setCurrentCategory = (
		category = null, 
		ctx = AppConstants.FEED_TYPES.STANDALONE.CATEGORY
	) => ({
		type: actions.SET_CURRENT_CATEGORY,
		payload: {
			category,
			ctx
		}
	});

export const setActiveSectionId = (
		remoteSectionId = null,
		sectionTag = null
	) => ({
		type: actions.SET_CURRENT_TOPIC,
		payload: {
			remoteSectionId,
			sectionTag,
			ctx: AppConstants.FEED_TYPES.STANDALONE.CATEGORY
		}
});

export const setCurrentTopicInCategory = (
		params = {}
	) => {
		console.log("setCurrentTopicInCategory", JSON.stringify(params))
			return ({
				type: actions.SET_TOPIC_IN_CURRENT_CATEGORY,
				payload: {
					...params,
					ctx: AppConstants.FEED_TYPES.STANDALONE.TOPIC
				}
			})
	};

export const setTopTopicsForCurrentCategoryInAside = ({activeSectionRecord={}, topics = []}) => ({
	type: actions.SET_ASIDE_TOP,
	payload: {
		activeSectionRecord,
		topics
	}
});

export const setTrendingTopicsForCurrentCategoryInAside = ({activeSectionRecord={}, topics = []}) => ({
	type: actions.SET_ASIDE_TRENDING,
	payload: {
		activeSectionRecord,
		topics
	}
});

export const setSearchResults = (searchResults=[]) => ({
	type: actions.SET_SEARCH_RESULTS,
	payload: {
		searchResults
	}
})

export const clearSearchResults = () => ({
	type: actions.CLEAR_SEARCH_RESULTS,
	payload: {}
})

export const selectSearchResult = (searchResult={}) => ({
	type: actions.SELECT_SEARCH_RESULT,
	payload: {
		searchResult
	}
})



export const setApplicationParams = ( config = {}) => ({
	type: actions.SET_APP_CONFIG,
	payload: {
		config
	}
});

export const setInitialFeedStories = (
		stories = [],
		forFeedType = AppConstants.FEED_TYPES.STANDALONE.CATEGORY,
		params = {}
	) => ({
		type: actions.SET_FEED,
		payload: {
			forFeedType,
			params,
			stories
		}
	})

export const addStoriesToFeed = (
	stories = [], 
		forFeedType = AppConstants.FEED_TYPES.STANDALONE.CATEGORY
	) => ({
		type: actions.ADD_TO_FEED,
		payload: {
			forFeedType,
			stories
		}
	})
