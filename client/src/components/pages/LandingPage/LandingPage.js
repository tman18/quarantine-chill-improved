import React from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import * as arrays from './../../../arrays.js';
import { ReactComponent as Movie } from '../../../movie.svg';
import { ReactComponent as Recipe } from '../../../recipe.svg';

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

function LandingPage(props) {
  const override = css`
  position: absolute;
  left:50%;
  top:150px;
`;
  return (
    <div>
      <div>
        <FadeLoader
          css={override}
          size={250}
          color={'#000000'}
          loading={props.loader.loading}
        />
      </div>
      <main>
        {/* movie section */}
        <div className="movie-column">
          <div className="movie-selections">
            {/* beginning movie image */}
            <div className="landing-movie-image">
              <div className="movie-image-svg"><Movie /></div>
            </div>
            <div className="movie-options">
              <div className="labels">
                {/* Genre */}
                <label htmlFor='Genre'>Genre</label>
                <select required onChange={props.onChangeGenre} name='Genre' id='Genre'>
                  {arrays.genres.map((element, index) => (
                    < option value={element.name} key={index} > {element.name}</option>
                  ))}
                </select>
              </div >
              <div className="labels">
                {/* Rating */}
                <label htmlFor='Decade'>Decade</label>
                <select required onChange={props.onChangeDecade} name='Decade' id='Decade'>
                  {['Decade', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'].map((element, index) => (
                    < option value={element.slice(0, element.length - 1)} key={index} > {element}</option>
                  ))}
                </select>
              </div >
              <div className="labels">
                {/* Length */}
                <label htmlFor='Length'>Length</label>
                <select required onChange={props.onChangeLength} name='Length' id='Length'>
                  {['Length', 'Less than 90 min', '90 min - 120 min', 'More than 120 min'].map((element, index) => (
                    < option value={element} key={index} > {element}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* food section */}
        <div className="recipe-column">
          <div className="recipe-selections">
            <div className="landing-recipe-image">
              <div className="recipe-image-svg">
                <Recipe />
              </div>
            </div>
            <div className="recipe-options">
              <div className="labels">
                {/* Cuisine Type */}
                <label htmlFor='Cuisine Type'>Cuisine Type</label>
                <select required onChange={props.onChangeCuisineType} name='Cuisine Type' id='Cuisine Type'>
                  {arrays.cuisines.map((element, index) => (
                    < option value={element} key={index} > {element}</option>
                  ))}
                </select>
              </div >
              <div className="labels">
                <label htmlFor='Meal Type'>Meal Type</label>
                <select required onChange={props.onChangeMealTypes} name='Meal Type' id='Meal Type'>
                  {arrays.meal_types.map((element, index) => (
                    < option value={element} key={index} > {element}</option>
                  ))}
                </select>
              </div>
              <div className="labels">
                {/* food restrictions */}
                <label htmlFor='food restrictions'>food restrictions</label>
                <select required onChange={props.onChangeFoodRestrictions} name='food restrictions' id='food restrictions'>
                  {arrays.food_restrictions.map((element, index) => (
                    < option value={element} key={index} > {element}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {!props.isLoaded ?
          null :
          <button style={{ marginTop: "-65px" }} onClick={props.onClick} type="submit">
            <Link to="/results/">Pair Me</Link>
          </button>}
      </main>
    </div>
  )

}
export default LandingPage;

// https://api.themoviedb.org/3/movie/popular endpoint sample
// {
//   "popularity": 9.753,
//   "vote_count": 325,
//   "video": false,
//   "poster_path": "/bz9717vMiTw2EGvGQUPRK4WLQ6G.jpg",
//   "id": 323027,
//   "adult": false,
//   "backdrop_path": "/kc0ufvlfl7H9G6BRhnBf8EbTpF5.jpg",
//   "original_language": "en",
//   "original_title": "Justice League: Gods and Monsters",
//   "genre_ids": [
//   28,
//   16,
//   14
//   ],
//   "title": "Justice League: Gods and Monsters",
//   "vote_average": 7,
//   "overview": "In an alternate universe, very different versions of DC's Trinity fight against the government after they are framed for an embassy bombing.",
//   "release_date": "2015-07-14"
//   }
