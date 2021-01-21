import React from 'react';
import MoviePreview from "./MoviePreview";

type MovieListProps = {
    movies: MovieListResultObject[]
}

const MovieList: React.FC<MovieListProps> = ({movies}) => {
    return (
        <div className="MovieList d-flex justify-content-center flex-wrap">
            {movies.map(i => <MoviePreview {...i} key={i.id}/>)}
        </div>
    )
}

export default MovieList;