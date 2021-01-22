import React, {useEffect, useState} from "react";
import {Card, Carousel, Container, Jumbotron} from "react-bootstrap";
import {RouteComponentProps} from "react-router";
import theMovieDb from "../../util/themoviedb";
import unknownImage from '../../common/unknownMovie.png';

type MoviePageProps = RouteComponentProps<{ id: string }>;
type GiantMovie = MovieDetailsResult & { credits: MovieCreditsResult, images: MovieImagesResult };

const MoviePage: React.FC<MoviePageProps> = ({match}) => {
    const [movie, setMovie] = useState<GiantMovie | null>(null);

    function fetchMovie() {
        theMovieDb.movies.getById({'id': match.params.id, 'append_to_response': 'credits,images'}, (result: string) => {
            let jsonResult: GiantMovie = JSON.parse(result);
            setMovie(jsonResult);
        }, alert);
    }

    useEffect(fetchMovie, []);

    if (movie === null) {
        return (
            <h1>Loading...</h1>
        );
    } else {
        let posterImage = theMovieDb.common.getImage({
            size: "w1920_and_h800_multi_faces",
            file: movie.poster_path
        });

        return (
            <div className="MoviePage">
                <div style={{backgroundImage: `url(${posterImage})`, backgroundPosition: 'center'}}>
                    <Jumbotron style={{background: "rgba(240, 240, 240, 0.8)"}}>
                        <div>
                            <h1><b>{movie.title}</b></h1>
                            {movie.original_title !== movie.title ? <h6>{movie.original_title}</h6> : null}
                            <p style={{fontWeight: 'bold'}}>{movie.overview}</p>
                            <p>{movie.genres.map(i =>
                                <a className="mr-4" href={`http://localhost:3000?genre=${i.id}`}>{i.name}</a>
                            )}</p>
                        </div>
                    </Jumbotron>
                </div>
                <Container>
                    <div>
                        <a href={`https://www.themoviedb.org/movie/${movie.id}`}>TheMovieDb</a>
                    </div>
                    <div>
                        Director: <b>
                        {movie.credits.crew.filter(i => i.job.toLowerCase() == "director").map(i => i.name).join(', ')}
                    </b>
                    </div>
                    <div>
                        Rating: <b>Average {movie.vote_average} out of {movie.vote_count} votes</b>
                    </div>
                    <div className="d-flex flex-wrap">
                        {movie.credits.cast.slice(0, 10).map(actor =>
                            <Card className="Actor m-3" key={actor.credit_id}>
                                <Card.Img src={
                                    actor.profile_path ? theMovieDb.common.getImage({
                                        size: 'w138_and_h175_face',
                                        file: actor.profile_path
                                    }) : unknownImage
                                } style={{width: '138px', height: '175px'}}/>
                                <Card.Footer>
                                    {actor.name}
                                    <hr/>
                                    <b>{actor.character}</b>
                                </Card.Footer>
                            </Card>
                        )}
                    </div>
                    <Carousel>
                        {movie.images.backdrops.map(backdrop =>
                            <Carousel.Item key={backdrop.file_path}>
                                <div className="d-flex" style={{background: "black"}}>
                                    <img className="m-auto" src={
                                        theMovieDb.common.getImage({
                                            size: `w780`,
                                            file: backdrop.file_path
                                        })
                                    } alt={backdrop.file_path}/>
                                </div>
                            </Carousel.Item>
                        )}
                        {movie.images.posters.map(poster =>
                            <Carousel.Item key={poster.file_path}>
                                <div className="d-flex" style={{background: "black"}}>
                                    <img className="m-auto" src={
                                        theMovieDb.common.getImage({
                                            size: `w500`,
                                            file: poster.file_path
                                        })
                                    } alt={poster.file_path}/>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
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