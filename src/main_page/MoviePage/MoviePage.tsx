import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {RouteComponentProps} from "react-router";
import theMovieDb from "../../util/themoviedb";

type MoviePageProps = {
    // movie: MovieDetailsResultObject
} & RouteComponentProps<{ id: string }>;

const MoviePage: React.FC<MoviePageProps> = ({match}) => {
    const [movie, setMovie] = useState<MovieDetailsResultObject | null>(null);

    function fetchMovie() {
        theMovieDb.movies.getById({'id': match.params.id}, (result: string) => {
            let jsonResult: MovieDetailsResultObject = JSON.parse(result);
            setMovie(jsonResult);
        }, alert);
    }

    useEffect(fetchMovie, []);

    if (movie === null) {
        return (
            <h1>Loading...</h1>
        );
    } else {
        return (
            <div className="MoviePage">
                <Container>
                    <h1>{movie.title}</h1>
                    {movie.original_title != movie.title ? <h6>{movie.original_title}</h6> : null}
                    <div>
                        I am a movie
                    </div>
                    <table>
                        <tbody>
                        {Object.entries(movie).map(i => {
                            let [key, value] = i;
                            return (
                                <tr key={key.toString()}>
                                    <td>{key.toString()}</td>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </Container>
            </div>
        )
    }
}

export default MoviePage;