import React from 'react';
import './RecentCard.css';
import imdb from '../../images/imdb.png';

function RecentCard(props) {
	return (
		<div className='RecentCard'>
			<div className='RecentCardMovie'>
				<div className='RecentCardMovie-body'>
					<div className='RecentCardMovie-image'>
						<img alt='' src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} />
					</div>
				</div>
				<div className='RecentCardMovie-name'>{props.randomedMovieTitle || props.randomedMovieName}</div>
				<div className='RecentCardMovie-link-container'>
					<div className='RecentCardMovie-link'>
						<a
							className='RecentCardMovie-imdb-text'
							target='_blank'
							rel='noopener noreferrer'
							href={'https://www.imdb.com/title/' + props.imdbId}
						>
							Check it out on <img alt='' className='RecentCardMovie-imdb-img' src={imdb} />
						</a>
					</div>
				</div>
			</div>
			<div className='RecentCardRecipe'>
				<div className='RecentCardRecipe-body'>
					<img alt='' className='RecentCardRecipe-image' src={props.recipeImg} />
				</div>
				<div>
					<div className='RecentCardRecipe-name'>{props.recipeName}</div>
					<div className='RecentCardRecipe-link-container'>
						<div className='RecentCardRecipe-link'>
							<a rel='noopener noreferrer' className='recipe-text' target='_blank' href={props.recipeUrl}>
								See the full recipe
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecentCard;
