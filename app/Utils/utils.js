import { AppConstants } from '../AppConfig/constants';

let urlencode = encodeURIComponent;

const addQueryParamsToUrl = (baseUrl, queryParams) => {
	let urlWithParams = baseUrl;
	if (queryParams){
		let paramsEncoded = Object.keys(queryParams).map((key) => 
			urlencode(key) + '=' + urlencode(queryParams[key])
		).join('&');

		if (paramsEncoded){
			urlWithParams += ('?' + paramsEncoded);
		}
	}
	
	return urlWithParams;
}

const downloadContent = async ({onSuccessCallback, onErrorCallback, requestmethod, requestbaseurl, requestparams, requestbody}) => {
	let toFetch = null;
	if (requestmethod == "GET"){
		toFetch = fetch(addQueryParamsToUrl(requestbaseurl, requestparams), {
			method:"GET"
		})
	}else if (requestmethod == "POST"){
		toFetch = fetch(requestbaseurl, {
			method:"POST",
			body: JSON.stringify(requestbody),
			headers: { "Content-Type": "application/json" }
		})
	}
	else return;

	let thisDownloaded = 
		toFetch.then(
			(successfulRes) => successfulRes.status == 200 ? successfulRes.json() : new Error("URL response status is not `OK`"), 
			(failureRes) => new Error("URL response status is not `OK`")
		).then(
			(json) => onSuccessCallback(json),
			(noJson) => onErrorCallback("No Categories")
		).catch(error => {throw error});
	
	// return await thisDownloaded;
}


const getObjAndIndexWithValAtKeyFromArray = (searchInReadOnlyArray = [], key = null, val = null) => {
	if (!key || !val) return null
	
	let indexOfElement = -1;
	let filtered = null
	AppConstants.DEBUG_MODE && console.group("getObjAndIndexWithValAtKeyFromArray in utils.js")
	try{
		filtered = searchInReadOnlyArray.filter((obj, idx) => {
			for (let itrKey of Object.getOwnPropertyNames(obj)){	
				if (itrKey === key && obj[itrKey] === val) {
					indexOfElement = idx
					return true
				}
			}
		})

		return filtered && filtered.length > 0 
				? {
					element: filtered[0],
					indexAt: indexOfElement
				}: {};
	}catch(e){
		AppConstants.DEBUG_MODE && console.log("Error in getObjAndIndexWithValAtKeyFromArray", e)
		throw e
	}finally{
		AppConstants.DEBUG_MODE && console.groupEnd("getObjAndIndexWithValAtKeyFromArray in utils.js")
	}
}

const getIndexOfObjWithValAtKeyInArray = (searchInReadOnlyArray = [], key = null, val = null) => {
	if (!key || !val) return -1
	return searchInReadOnlyArray.map((obj) => obj[key]).indexOf(val)
}

const replaceObjWithValAtKeyInArray = (searchInReadOnlyArray = [], key = null, val = null, newObj) => {
	let searchIndex = getIndexOfObjWithValAtKeyInArray(searchInReadOnlyArray, key, val)
	
	// make a copy of the read-ony array
	let searchIn = searchInReadOnlyArray.slice()
	if (searchIndex && searchIndex > -1){
		// add newObj at searchIndex
		return searchIn.splice(searchIndex, 1, newObj)
	}
	return searchIn
}

const addOnlyNewObjectsInArray = (searchIn = [], comparisonKey = null, newObjArray=[]) => {
	if (!comparisonKey) throw new Error("comparison key not provided for merging arrays")
	
	let map = new Map();

	searchIn.forEach((topic) => {
		map.set(topic[comparisonKey], topic)
	})

	newObjArray.forEach((topic)=>{
		map.set(topic[comparisonKey], map.get(topic[comparisonKey]) || topic)	
	})

	let merged = Array.from(map.values())
	
	return merged
}

const replaceObjAtIndexInArray = (arrayToUpdateReadOnly = [], replaceAtIndex=-1, newElement) => {
	if (replaceAtIndex != null && replaceAtIndex > -1){
		// make a copy of the read-ony array
		let arrayToUpdate = arrayToUpdateReadOnly.slice()
		// add newObj at searchIndex
		// Dev note: Remember, splice updates the array in place, return array.aplice(..args) returns array before replacement
		arrayToUpdate.splice(replaceAtIndex, 1, newElement) 
		return arrayToUpdate
	}
	return arrayToUpdate
}


export {
	addQueryParamsToUrl,
	getObjAndIndexWithValAtKeyFromArray,
	replaceObjWithValAtKeyInArray,
	replaceObjAtIndexInArray,
	downloadContent,
	addOnlyNewObjectsInArray
}