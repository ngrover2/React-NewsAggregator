import React, { useState, useEffect } from 'react';
import searchIcon from '../../icons/search.png';
import { useDispatch, useSelector } from 'react-redux';
import { downloadContent } from '../Utils/utils';
import  * as selectors from '../Store/selectors';
import  { AppConstants } from '../AppConfig/constants';
import  * as actions from '../Store/actionCreators';

const SearchResultItem = ({value, result, onResultClickAction}) => {
	const dispatch = useDispatch();
	return (
		<a>
			<div 
				className="result-item" 
				// onClick on this absolutely positioned element inteferes with onBlur on parent
				onMouseDown={(ev) => {
					ev.stopPropagation()
					onResultClickAction()
					dispatch(actions.selectSearchResult(result))
					dispatch(actions.clearSearchResults())
				}}
			>
				<div className="item-text">
					{value}
				</div>
			</div>
		</a>
	)
}

const SearchResults = ({results =[], onResultClickAction}) => (
	results ? 
	results.map((result, idx) => (
		<SearchResultItem 
			key={`sres-${result.topic_id || idx}`}
			result={result} 
			value={result.topic} 
			onResultClickAction={onResultClickAction}
		/>
	)):
	<SearchResultItem value={"No matching results"} key={`sres-no-match`}/>
)

const SearchBox = (props) => {
	const searchResults = useSelector(selectors.getSearchResults);
	const [ errorMessage, setErrorMessage ] = useState(null);
	const apibaseurl = useSelector(selectors.getParamFromAppConfig("API_BASE_URL"))
	const [ searchString, setSearchString ] = useState("");
	const [ showSearchResults, setShowSearchResults] = useState(false);
	const dispatch = useDispatch();

	
	useEffect(() => {
		setShowSearchResults(false)
		if (searchString && apibaseurl){
			let downloadParams = {
				requestbaseurl: `${apibaseurl}/topic/search`,
				requestmethod: "GET",
				requestparams: {
					search_for: searchString,
					page_size: AppConstants.DEFAULT_PAGE_SIZE
				}
			}
			downloadParams.onSuccessCallback = (jsonResultsArray) => {
				console.group("searchString useEffect")
				console.log("jsonResultsArray", jsonResultsArray)
				console.groupEnd("searchString useEffect")
				dispatch(actions.setSearchResults(jsonResultsArray))
			}
			downloadParams.onFailureCallback = (error) => setErrorMessage(error.getMessage())
			downloadContent(downloadParams)
		}
	},[searchString])

	useEffect(() => {
		if (searchResults && searchResults.length){
			console.group("searchResults useEffect")
			console.log("showSearchResults wil be set to true", showSearchResults)
			console.groupEnd("searchResults useEffect")
			setShowSearchResults(true)
		}
	},[searchResults])

	function clearSearchString(){
		setSearchString("")
	}

	return (
		<div className="header-search-container">
			{console.log("showSearchResults", showSearchResults)}
			<div className="search-container">
				<img src={searchIcon} ></img>
				{/*<input className="inp-search" placeholder="Search Topics.." value={searchString} onBlur={() => setShowSearchResults(false)} onFocus={() => setShowSearchResults(true)} onChange={(ev) => setSearchString(ev.target.value)}></input>*/}
				<input 
					className="inp-search" 
					placeholder="Search Topics.." 
					value={searchString}  
					onChange={(ev) => setSearchString(ev.target.value)}
					onBlur={() => {
						setSearchString("")
						setShowSearchResults(false)
						dispatch(actions.clearSearchResults())
					}}
				></input>
				{
					showSearchResults &&
					<div className="search-results-list">
						<SearchResults results={searchResults} onResultClickAction={clearSearchString}/>
					</div>
				}
			</div>
		</div>
	)
}

const TestStyleSeachBox = (props) => {
	const [ showSearchResults, setShowSearchResults] = useState(false);

	return (
		<div className="header-search-container">
			<div className="search-container">
				<img src={searchIcon} ></img>
				{/*<input className="inp-search" placeholder="Search Topics.." onBlur={() => setShowSearchResults(false)} onFocus={() => setShowSearchResults(true)}></input>*/}
				<input className="inp-search" placeholder="Search Topics.." onFocus={() => setShowSearchResults(true)}></input>
				{showSearchResults && <div className="search-results-list">
					<div className="result-item">
						<div className="item-text">
							A Long Autocomplete search result example 1
						</div>
					</div>
					<div className="result-item">
						<div className="item-text">
							<a>A Medium Autocomplete search result 2</a>
						</div>
					</div>
					<div className="result-item">
						A Short result 3
					</div>
					<div className="result-item">
						A Long Autocomplete search result example 1
					</div>
					<div className="result-item">
						<a>A Medium Autocomplete search result 2</a>
					</div>
					<div className="result-item">
						A Short result 3
					</div>
					<div className="result-item">
						A Long Autocomplete search result example 1
					</div>
					<div className="result-item">
						<a>A Medium Autocomplete search result 2</a>
					</div>
					<div className="result-item">
						A Short result 3
					</div>
				</div>}
			</div>
		</div>
	)
}


export {
	SearchBox
}