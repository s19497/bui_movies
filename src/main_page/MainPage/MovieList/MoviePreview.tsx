import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from "react-bootstrap";
import unknownImage from '../../../common/unknownMovie.png';

const {getImage} = require('../../../util/themoviedb').common;

function shorten(overview: string) {
    if (overview.length > 100) {
        return overview.slice(0, 100) + '...';
    } else {
        return overview;
    }
}

const MoviePreview: React.FC<MovieListResultObject> = (props) => {
    return (
        <div className="Movie">
            <Card className="m-3">
                <Link to={"/movie/" + props.id}>
                    <Card.Img src={
                        props.poster_path ?
                            getImage({
                                size: 'w220_and_h330_face',
                                file: props.poster_path
                            }) : unknownImage
                    }/>
                </Link>
                <Card.Footer>
                    <b>{props.title}</b>
                    <hr/>
                    <div>
                        {props.release_date}
                    </div>
                    <div style={{fontSize: '70%'}}>
                        {shorten(props.overview)}
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default MoviePreview;