import React from 'react';
import MoviePreview, {MoviePreviewProps} from "./MoviePreview";

type MovieListProps = {
    movies: MoviePreviewProps[]
}

const MovieList: React.FC<MovieListProps> = ({movies}) => {
    return (
        <div className="MovieList d-flex justify-content-center flex-wrap">
            {movies.map(i => <MoviePreview {...i} key={i.id}/>)}
        </div>
    )
}

export default MovieList;