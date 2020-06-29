import { AppConstants } from './constants';
// prefix name to prefix name value mapping (so that it can be changed at one place later)
const PREFIX_NAMES = AppConstants.REMOTE_FETCH_PREFIX_NAMES
// prefix for keys in the REMOTE_NAV object
const REMOTE_SECTION_URL_PREFIX = AppConstants.REMOTE_SECTION_URL_PREFIX
const REMOTE_SECTION_NAMES = AppConstants.REMOTE_SECTION_NAMES
const baseOptions = {
	API_BASE_URL: "http://localhost:8080"
}

const derivedOptions = {
	REMOTE_PREFIXES: {
		[PREFIX_NAMES.ROOT]: (suffix) => (suffix != null && suffix != undefined) ? `${baseOptions.API_BASE_URL}${suffix}` : `${baseOptions.API_BASE_URL}`,
		[PREFIX_NAMES.TOPIC]: ([ topicTag ]) => (topicTag != null && topicTag != undefined) ? `${baseOptions.API_BASE_URL}/stories/topic/${topicTag}` : null,
		[PREFIX_NAMES.TOP_TOPICS]:  ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${baseOptions.API_BASE_URL}/topic/top/${categoryTag}` : null,
		[PREFIX_NAMES.TRENDING_TOPICS]: ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${baseOptions.API_BASE_URL}/topic/trending/${categoryTag}` : null,
		[PREFIX_NAMES.CATEGORY]: ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${baseOptions.API_BASE_URL}/stories/category/${categoryTag}` : null,
		[PREFIX_NAMES.CATEGORIES]: () => `${baseOptions.API_BASE_URL}/stories/categories`,
	},
	// Feeds' data are grouped under following keys(urls) as if the data 
	// was obtained from http requests the following urls
	// It might also help when server-rendering is employed in future
	SECTION_KEYS: {
		[REMOTE_SECTION_NAMES.CATEGORY]: ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${REMOTE_SECTION_URL_PREFIX}/stories/category/${categoryTag}` : null,
		[REMOTE_SECTION_NAMES.CATEGORIES]: () => `${REMOTE_SECTION_URL_PREFIX}/stories/categories`,
		[REMOTE_SECTION_NAMES.TOPIC]: ([ topicTag ]) => (topicTag != null && topicTag != undefined) ? `${REMOTE_SECTION_URL_PREFIX}/stories/topic/${topicTag}` : null,
		[REMOTE_SECTION_NAMES.TOPIC_IN_CATEGORY]: ([ categoryTag, topicTag ]) => (categoryTag != null && categoryTag != undefined && topicTag != null && topicTag != undefined) ? `${REMOTE_SECTION_URL_PREFIX}/stories/category/${categoryTag}/topic/${topicTag}` : null,
		[REMOTE_SECTION_NAMES.TOP_TOPICS_IN_CATEGORY]: ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${REMOTE_SECTION_URL_PREFIX}/topic/top/${categoryTag}` : null,
		[REMOTE_SECTION_NAMES.TRENDING_TOPICS_IN_CATEGORY]: ([ categoryTag ]) => (categoryTag != null && categoryTag != undefined) ? `${REMOTE_SECTION_URL_PREFIX}/topic/trending/${categoryTag}` : null,
	}
}

const configOptions = {
	API_BASE_URL: baseOptions.API_BASE_URL,
	
	getApiUrlFor: (PREFIX_TYPE, params = []) => 
		(	
			derivedOptions.REMOTE_PREFIXES[PREFIX_TYPE] && params && params.length > -1
			? derivedOptions.REMOTE_PREFIXES[PREFIX_TYPE](params)
			: null
		),
	getSectionKeyFor: (PREFIX_TYPE, params = []) => 
		(
			derivedOptions.SECTION_KEYS[PREFIX_TYPE]
			? derivedOptions.SECTION_KEYS[PREFIX_TYPE](params)
			: null
		)
}

export default configOptions;