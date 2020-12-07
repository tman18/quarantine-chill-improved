import React, { useState } from 'react';
import './Results.css';

import { Link } from 'react-router-dom';
import imdb from '../../../imdb.png'

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

function Results(props) {
  const override = css`
  position: absolute;
  left:50%;
  top:150px;
`;

  // const [isLiked, setIsLiked] = useState(false)

  function submit() {
    const formData = {
      randomedMovie: props.randomedMovie,
      imdbId: props.imdbId,
      movieOverview: props.movieOverview,
      recipeInfo: props.recipeInfo,
      valid: true
    }
    // setIsLiked(true)
    console.log("Sending pairing to the database...")
    fetch('/api/mongodb/quarantine-chill/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);
      });
  }

  // function formatRecipeSummary(summary) {
  //   let formattedSummary = summary.replace(/<[^>]*>?/gm, '')
  //   return (formattedSummary)
  // }

  return (
    <div>
      <FadeLoader
        css={override}
        size={2500}
        color={'#000000'}
        loading={props.loader.loading}
      />
      <main style={{ height: "1000px" }}>
        <div className="movie-column">
          <div className="start-over" onClick={props.onStartOverClick}>
            <Link to="/">⬅ Start Over</Link>
          </div>
          <div className="movie-selections-results">
            <div className="movie-image">
              <img alt='Movie Poster' src={`https://image.tmdb.org/t/p/w200${props.randomedMovie.poster_path}`}></img>
            </div>
            <div className="movie-information">
              <p className="movie-name">{props.randomedMovie.title || props.randomedMovie.name}</p>
              <p className="movie-summary" style={{height: "142px"}}>{props.movieOverview}</p>
              <div className="movie-link-container">
                <div className="movie-link">
                  <a className="imdb-text" target="_blank" rel="noopener noreferrer" href={'https://www.imdb.com/title/' + props.imdbId}>Check it out on <img className="imdb-img" alt='IMDB' src={imdb} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recipe-column">
          <div className="recipe-selections-results">
            <div className="recipe-image">
              <img alt='Food' className="recipe-image-item" src={props.recipeInfo.img} />
            </div>
            <div className="recipe-information">
              <p className="recipe-name">{props.recipeInfo.name}</p>
              <p className="recipe-summary" style={{ fontSize: "16px", height: "142px" }} >{props.recipeInfo.summary}</p>
              <div class="recipe-link-container">
                <div class="recipe-link">
                  <a className="recipe-text" target="_blank" rel="noopener noreferrer" href={props.recipeInfo.url}>See the full recipe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
          <button style={{ alignSelf: "center", marginBottom: "0px" }} onClick={submit}>Love It!</button>
          {/* {isLiked && <p>Check the <a href="/recent">Recent</a> page for more Loved combinations</p>} */}
          <button className="gray-button" onClick={props.getPair} style={{ alignSelf: "flex-end", marginBottom: "80px" }}>Give Me Another </button>
      </main>
    </div >
  )
}
export default Results;

// response if recipe api reach limit
// {
//   "status": "failure",
//   "code": 402,
//   "message": "Your daily points limit of 150 has been reached. Please upgrade your plan to continue using the API."
//   }
