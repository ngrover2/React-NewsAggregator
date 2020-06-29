import { Button as SemButton} from 'semantic-ui-react';
import React from 'react';

const DummyComponent = () => <SemButton>Hi There!</SemButton>;

const StoryComponent = () => {
	return (
	<div className="post__section-item-display" key={`${1}`}>
		<article className="post post--card post-grid">
			<header className="post__header">
				<div className="post-attribution ui-text--supporting">
					<a className="media-link internal-link">Vox</a>
				</div>
			</header>
			<div className="post__body">
				<a className="post__media post__media--image media-link internal-link" role="link" href="/topic/technology/trump-reportedly-wants-to-restrict-visa-programs-for-skilled-workers/f-2aa0acccee%2Fvox.com">
					<div className="cropped-image media-container">
						<img 
							className="image image--loaded" 
							src="https://cdn.flipboard.com/vox-cdn.com/d650286318f11792f98e6991139c1923dc03c1e6/large.jpg"
							style={{position: "absolute", width: "416px", height: "278px", top: "0px", left: "-30px"}}
						></img>
					</div>
				</a>
				<p>
					<a className="topic-tag topic-tag--text internal-link">Politics</a>
				</p>
				<h1 className="post__title article-text--title--large">
					<a className="internal-link" href="/topic/technology/trump-reportedly-wants-to-restrict-visa-programs-for-skilled-workers/f-2aa0acccee%2Fvox.com"></a>
					Successful rehearsal readies SpaceX's Crew Dragon for historic launch
				</h1>
				<address className="post-attribution__source ui-text--supporting">
					<a className="post-attribution__link internal-link">Vox - Nicole Narea
					</a>
				</address>
			</div>
			<footer className="post__footer">
				<div>
					<time className="post-attribution__time">4 hours ago</time>
				</div>
			</footer>
			<span></span>
		</article>
	</div>)
}

const StoryComponent2 = () => {
	return (
		<div className="storycard-grid" key={2}>
			<div className="story-header">
				<div className="story-attribution attribution-text">
					<a className="internal-publisher-link">Vox</a>
				</div>
			</div>
			<div className="story-content">
				<div className="story-image">
					<a>
						<img src="https://cdn.flipboard.com/vox-cdn.com/d650286318f11792f98e6991139c1923dc03c1e6/large.jpg"></img>
					</a>
				</div>
				<div className="story-topic topic-text">
					<a>
						Politics
					</a>	
				</div>
				<div className="story-title title-text">
					<a>
						Successful rehearsal readies SpaceX's Crew Dragon for historic launch. Successful rehearsal readies SpaceX's Crew Dragon for historic launch
					</a>	
				</div>
				<div className="story-source source-text">
					<a>
						Vox.com
						<span className="story-author">By That Guy</span>
					</a>
				</div>
			</div>
			<div className="story-footer">
				<div className="time-ago">
					4 Hours ago
				</div>
			</div>
		</div>
	)
}


const StoryComponent3 = () => {
	return (
		<div className="storycard-grid--type-2" key={4}>
			<div className="storycard-image--type-2">
				<a>
					<img src="https://cdn.flipboard.com/vox-cdn.com/d650286318f11792f98e6991139c1923dc03c1e6/large.jpg"></img>
				</a>
			</div>
			<div className="storycard-textual--type-2">
				<div className="textual-pub">
					donald trump
				</div>
				<div className="textual-title">
					A Successful rehearsal readies SpaceX's Crew Dragon for historic launch. Successful rehearsal readies SpaceX's Crew Dragon for historic launch
				</div>
				<div className="textual-footer">
					<div className="by">in.reuters.com <span className="by-author">Anthony Jeselnick</span></div>
					<div className="ago">4 hours ago</div>
				</div>
			</div>
		</div>
	)
}

export default DummyComponent;

export {
	StoryComponent,
	StoryComponent2,
	StoryComponent3
}