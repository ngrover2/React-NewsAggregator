import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTopicInCategory } from '../Store/actionCreators';

const IndividualListItem = ({ name }) => (<a><span className="aside-hash">#</span>{name}</a>);
const UnorderedList = (props) => <ul>{props.children}</ul>

const FormattedListItems = (props) => {
	const dispatch = useDispatch();

	return props.listItems.map((item, idx) => (
		<li 
			key={`k-aslist-${props.listName}-item-${item.topic_id}`}
			onClick={() => {
				dispatch(setCurrentTopicInCategory({
					topic: {
						...item,
					},
					activeSectionRecord:props.activeSectionRecord
				}))
			}}
		>
			<IndividualListItem name={item.topic} />
		</li>
	))
}


const AsideList = (props) => {
	
	const [ scrollable, setScrollable ] = useState(props.scrollable || false);

	const ListItems = (props) => {
		if (scrollable) {
			return (
				<div className="list-scroll-y">
					<div className="as-item-list">
						<UnorderedList>
							<FormattedListItems 
								{...props}
							/>
						</UnorderedList>
					</div> 
				</div>
			);
		}else{
			return (
				<div className="list-scroll-y --no-scroll">
					<div className="as-item-list">
						<UnorderedList>
							<FormattedListItems 
								{...props}
							/>
						</UnorderedList>
					</div> 
				</div>
			);
		}
	}

	// TODO: More should only show when items do not completey show in `max-height`-ed container
	return (
		<React.Fragment> 
			<div className="aside-item" key={`k-asd-list-title-${props.listname.toLowerCase()}`}>
				<div className="title">
					<h2>{props.listname}</h2>
				</div>
				<ListItems {...props} />
				{ props.showMoreAllowed && 
					<button className="more" onClick={() => setScrollable(!scrollable)}>{scrollable ? "Less" : "More"}</button>}
			</div>
		</React.Fragment>
	);
};

export {
	AsideList
}