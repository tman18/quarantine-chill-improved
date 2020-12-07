import React, { useState, useEffect } from 'react';
import './Recent.css';
import RecentCard from '../../RecentCard/RecentCard.js'
import imdb from '../../../imdb.png'

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

function Recent() {
  const [pairings, setPairings] = useState(null)
  const [page, setPage] = useState(1);

  // Go to next page
  function goToNextPage() {
    const newPageValue = Math.min(page + 1, Math.ceil(pairings.length/4))
    console.log("new page value is", newPageValue)
    setPage(newPageValue)
    window.scrollTo(0, 0)
    console.log("go to next page, page value is", page)
  }
  // Go to previous page
  function goToPreviousPage() {
    const newPageValue = Math.max(page - 1, 1)
    setPage(newPageValue)
    window.scrollTo(0, 0)
    console.log("go to prev page, page value is", page)
  }

  // Fetch pairings from the database
  function fetchPairings() {
    console.log('Fetching parings data from API');
    fetch('/api/mongodb/quarantine-chill/test')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        setPairings(data.reverse());
      });
  }

  useEffect(fetchPairings, [])

  if (pairings === null) {
    return (
      <div className="recent-loader">      
        <FadeLoader
          size={2500}
          color={'#000000'}
        />
      </div>  
    );
  }
    else{
      return (
        <div>
              <div className="recent-page"> 
                <div style={{marginTop:"120px"}}>
                  {
                    pairings.slice(page*4-4, page*4)
                      .map((item) => (
                        <RecentCard
                          poster_path={item.randomedMovie.poster_path}
                          randomedMovieTitle={item.randomedMovie.title}
                          randomedMovieName={item.randomedMovie.name}
                          imdbId={item.imdbId}
                          recipeImg={item.recipeInfo.img}
                          recipeName={item.recipeInfo.name}
                          recipeUrl={item.recipeInfo.url}
                        /> 
                    ))}
                  <div className="page-nav">
                    <div className="page-change-prev" onClick={goToPreviousPage}>⬅ Previous Page </div>
                    <div className="page-change-next" onClick={goToNextPage}>Next Page ➡</div>
                  </div>
                  <div className="current-page"> Page {page} of {Math.ceil(pairings.length/4)} </div>
              </div>
            </div>
        </div>
      );
    }}

export default Recent;
