import { selectors } from '../Store/selectors';

export const LIST_ITEMS_SELECTOR_TYPES = {
	TRENDING_TOPICS: selectors.getTrendingTopicsInCurrentCategory,
	TOP_TOPICS: selectors.getTopTopicsInCurrentCategory
}