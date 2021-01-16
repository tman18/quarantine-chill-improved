import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import * as arrays from './arrays.js';
import NavBar from './components/NavBar/NavBar.js';
import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Recent from './components/pages/Recent/Recent.js';
import Results from './components/pages/Results/Results.js';
import { sanitizeString } from './sanitize.js';

// https://developers.themoviedb.org/3/movies/get-movie-details
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const initialFilter = {
	Genre: '',
	Decade: '',
	Length: '',
	'Cuisine Type': '',
	'Meal Type': '',
	'Food Restriction': ''
};

function App() {
	const [ movies, setMovies ] = useState(null);
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ randomedMovie, setRandomedMovie ] = useState({});
	const [ imdbId, setImdbID ] = useState('');
	const [ movieOverview, setmovieOverview ] = useState('');
	const [ filter, setFilter ] = useState(initialFilter);
	const [ loader, setLoader ] = useState({
		loading: true
	});
	const [ recipeInfo, setRecipeInfo ] = useState({
		name: '',
		url: '',
		img: '',
		cooktime: '',
		summary: ''
	});

	const movieApiKey = '0402eec8d6da4df59f8077842992a247';
	const foodApiKey = '2fa1eb822ad241b381e2d9b65da08a0f'; //'apiKey=d04ffb4acf8442e5a0cbc4291ed663b4';

	const onStartOverClick = () => {
		setFilter(initialFilter);
	};

	const onChangeMovie = (event) => {
		setFilter({ ...filter, [event.target.name]: event.target.value });
	};

	const onChangeMeal = (event) => {
		let Url = event.target.value.toLowerCase().split(' ').join('%20');
		setFilter({ ...filter, [event.target.name]: Url });
	};

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	useEffect(() => {
		async function fetchData() {
			const startTime = new Date();

			fetchMovie();
			const elaspedTime = new Date() - startTime;
			if (elaspedTime < 1000) {
				await delay(1000 - elaspedTime);
			}
			setLoader({ loading: false });
			setIsLoaded(true);
		}
		fetchData();
	}, []);
	function fetchMovie() {
		// popular end point has max of 500 pages
		let numberOfPages = 500;
		for (let i = 1; i < numberOfPages; i++) {
			fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&page=${i}`)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					// building array of movies
					// console.log('Data:', data.results[0]);
					let listOfMovies = data.results;
					if (i === 499) {
						console.log('Entering loop');
						setMovies(listOfMovies);
					}
				});
		}
	}
	function allYearsIn(decade) {
		const decadeAsInteger = parseInt(decade);
		const years = [];
		let currentYear = decadeAsInteger;

		while (currentYear < decadeAsInteger + 10) {
			years.push(currentYear + 1);
			currentYear++;
		}
		const yearsAsStrings = years.map((year) => year.toString());
		return yearsAsStrings;
	}

	async function getMovieDetails(movie) {
		const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${movieApiKey}`);
		const json = await movieData.json();
		return [ json.runtime, json.imdb_id, json.overview ];
	}
	// show the random movie poster and title
	async function onPairMeClick() {
		let genreID;
		// given genre name, we need to search for its corresponding genre id
		for (const el of arrays.genres) {
			if (el.name === filter.Genre) {
				genreID = el.id;
			}
		}
		let filteredMovies = movies
			.filter((element) => element.genre_ids.includes(genreID))
			.filter((element) => allYearsIn(filter.Decade).includes(element.release_date.slice(0, 4)));
		if (filteredMovies.length === 0) {
			setRandomedMovie({
				poster_path: '/.jpg',
				id: null,
				title: 'Please select three filters',
				overview: ''
			});
			setmovieOverview('');
		} else {
			let movieToSet = undefined;
			const desiredLength = filter.Length;
			let tries = 0;
			while (movieToSet === undefined) {
				if (tries < 99) {
					let index = Math.floor(Math.random() * filteredMovies.length);
					let movie = filteredMovies[index];
					let [ runtime, imdb_id, overview ] = await getMovieDetails(movie);
					if (desiredLength === 'Less than 90 min') {
						if (runtime >= 0 && runtime <= 89) {
							movieToSet = movie;
							setImdbID(imdb_id);
							setmovieOverview(sanitizeString(overview));
						}
					} else if (desiredLength === '90 min - 120 min') {
						if (runtime >= 90 && runtime <= 120) {
							movieToSet = movie;
							setImdbID(imdb_id);
							setmovieOverview(sanitizeString(overview));
						}
					} else if (desiredLength === 'More than 120 min') {
						if (runtime > 121) {
							movieToSet = movie;
							setImdbID(imdb_id);
							setmovieOverview(sanitizeString(overview));
						}
					}
					tries++;
				} else {
					movieToSet = {
						poster_path: '/.jpg',
						id: null,
						title: 'Please select three filters',
						overview: ''
					};
					setmovieOverview('');
				}
			}
			setRandomedMovie(movieToSet);
		}
	}

	function fetchRecipes() {
		const recipeFilters = [ filter['Cuisine Type'], filter['Food Restriction'], filter['Meal Type'] ];
		let tagList = [];
		// Add non-empty strings to list
		for (let filter of recipeFilters) {
			if (filter !== '' && filter !== undefined) {
				tagList.push(filter);
			}
		}

		const tags = tagList.join();
		const recipeApi = `https://api.spoonacular.com/recipes/random?apiKey=${foodApiKey}&tags=${tags}`;
		// Do the fetch
		fetch(recipeApi).then((res) => res.json()).then((data) => {
			// check if such recipe exists
			const recipes = data.recipes[0];
			if (recipes !== undefined) {
				setRecipeInfo({
					name: recipes['title'],
					url: recipes['spoonacularSourceUrl'],
					img: recipes['image'],
					summary: sanitizeString(recipes['summary']),
					cooktime: recipes['readyInMinutes']
				});
			}
			console.log(recipes);
		});
	}

	async function getPair() {
		setLoader({
			loading: true
		});

		fetchRecipes();
		onPairMeClick();
		await delay(1500);
		setLoader({
			loading: false
		});
	}
	return (
		<div>
			<NavBar />
			<div>
				<Switch>
					{/* passing props to route*/}
					{/* https://reacttraining.com/react-router/web/api/Route/render-func */}
					<Route
						exact
						path='/'
						render={(...props) => (
							<LandingPage
								{...props}
								onClick={getPair} //{onPairMeClick}
								onChangeMovie={onChangeMovie}
								onChangeMeal={onChangeMeal}
								loader={loader}
								isLoaded={isLoaded}
							/>
						)}
					/>
					<Route
						exact
						path='/results'
						render={(...props) => (
							<Results
								{...props}
								recipeInfo={recipeInfo}
								fetchRecipes={fetchRecipes}
								movieOverview={movieOverview}
								randomedMovie={randomedMovie}
								imdbId={imdbId}
								getPair={getPair}
								loader={loader}
								onStartOverClick={onStartOverClick}
							/>
						)}
					/>
					<Route exact path='/recent/' component={Recent} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
