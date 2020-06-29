
export const extractCategories = ( state = {} ) => {
	return state.categories && state.categories.hasOwnProperty('categoriesAll') && state.categories.categoriesAll.length > 0 ? [...state.categories.categoriesAll] : []
}

export const getCategoryIdByName = ( state = {} , name) => {
	return state.categories && state.categories.length ? state.categories.filter((cat) => cat.name.toLowerCase() == name) : {}
}

export const getCurrentSelectedCategoryObject = ( state = {} ) => {
	return (
		state.hasOwnProperty('categories') &&
			state.categories && state.categories.hasOwnProperty('current') 
				? state.categories.current
				: {}
	)
}

export const getFeedForTopicInCurrentCategory = (topicid) => ( state = {} ) => {
	return (
		topicid && state.hasOwnProperty('categories') &&
			state.categories && state.categories.hasOwnProperty('current') &&
				state.categories.current.hasOwnProperty('topics') &&
					state.categories.current.topics.hasOwnProperty(topicid) &&
						state.categories.current.topics[topicid].hasOwnProperty("feed")
						? state.categories.current.topics[topicid].feed
						: []
	)
}

export const getParamFromAppConfig = (paramName) => ( state = {} ) => {
	return (
		state.hasOwnProperty('config') &&
			state.config.hasOwnProperty(paramName)
				? state.config.paramName
				: null
	)
}

export const getTopTopicsInCurrentCategory = ( state = {} ) => {
	return (
		state.hasOwnProperty("categories") &&
			state.categories.hasOwnProperty("popTopics") &&
				state.categories.popTopics.hasOwnProperty("overall")
				? state.categories.popTopics.overall
				: []
	)
}

export const getTrendingTopicsInCurrentCategory = ( state = {} ) => {
	return (
		state.hasOwnProperty("categories") &&
			state.categories.hasOwnProperty("popTopics") &&
				state.categories.popTopics.hasOwnProperty("trending")
				? state.categories.popTopics.trending
				: []
	)
}

export const getFeedForCategory = (id) => (state = {}) => {
	if (!id) return []
	let catObj = 
			state.hasOwnProperty("categories") &&
				state.categories.hasOwnProperty("categoriesById") &&
					state.categories.categoriesById && 
						state.categories.categoriesById.hasOwnProperty(id)
						? state.categories.categoriesById[id]
						: {}
	return catObj && catObj.hasOwnProperty("feed")
		? catObj.feed
		: []
}

const selectors = {
		extractCategories,
		getCategoryIdByName,
		getCurrentSelectedCategoryObject,
		getParamFromAppConfig,
		getTopTopicsInCurrentCategory,
		getTrendingTopicsInCurrentCategory,
		getFeedForCategory,
		getFeedForTopicInCurrentCategory
}

export { selectors };