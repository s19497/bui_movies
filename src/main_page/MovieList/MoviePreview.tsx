import React from 'react';
import {Card} from "react-bootstrap";

const {getImage} = require('../../util/themoviedb').common;

export type MoviePreviewProps = {
    title: string
    poster_path: string
    release_date: string
    id: number
}

type MovieObject = MoviePreviewProps & {
    overview: string
    genre_ids: number[]
    director: string
    mainActors: string[]
}

type DBMovieObject = MovieObject & {
    theMovieDbUrl: string
    trailerUrl: string
    sceneGallery: string[]
}

const MoviePreview: React.FC<MoviePreviewProps> = (props) => {
    return (
        <div className="Movie">
            <Card className="m-3">
                <Card.Img src={getImage({
                    size: 'w220_and_h330_face',
                    file: props.poster_path
                })}/>
                <Card.Footer>
                    <b>{props.title}</b>
                    <hr/>
                    {props.release_date}
                </Card.Footer>
            </Card>
        </div>
    )
}

export default MoviePreview;