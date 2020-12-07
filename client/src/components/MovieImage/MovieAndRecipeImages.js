import React from 'react';


import './MovieAndRecipeImages.css';

function MovieImage() {
  return (
    <div className="movie-selections">
    <div className="movie-image">
      <img src={`https://image.tmdb.org/t/p/w200${props.randomedMovie.poster_path}`}></img>

    </div>
    <span className="movie-name"><p>{props.randomedMovie.title || props.randomedMovie.name}</p></span>
  </div>
</div>
<div className="recipe-column">
  <div className="recipe-selections">
    <div className="recipe-image">
      <img className="recipe-image-item" src={props.recipeImg} />
    </div>
    <span className="recipe-name">{props.recipeName}</span>
  </div>
</div>
  );
}

export default MovieAndRecipeImages;