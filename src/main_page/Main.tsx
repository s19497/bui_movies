import React from 'react';
import {Container, Row} from "react-bootstrap";
import SearchBar from "./SearchBar/SearchBar";
import MovieList from "./MovieList/MovieList";
import * as POPULAR_SAMPLE from '../util/popular.json';

const Main: React.FC = () => {
    return (
        <div className="Main">
            <Container>
                <Row>
                    <SearchBar/>
                </Row>
                <Row>
                    <MovieList movies={POPULAR_SAMPLE.results}/>
                </Row>
            </Container>
        </div>
    )
}

export default Main;