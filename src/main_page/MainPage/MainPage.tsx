import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "./SearchBar/SearchBar";
import MovieList from "./MovieList/MovieList";
import theMovieDb from "../../util/themoviedb";
import {useLocation} from 'react-router-dom';
import PageButtons from "./PageButtons";
import {RouteComponentProps} from "react-router";

const MainPage: React.FC<RouteComponentProps> = (props) => {
    const [movieList, setMovieList] = useState<MovieListResultObject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const query = new URLSearchParams(useLocation().search);

    function fetchPopular(page: number) {
        theMovieDb.movies.getPopular({page: currentPage}, (result: string) => {
            let resultJson: PopularMoviesResult = JSON.parse(result);
            setMovieList(resultJson.results);
            setTotalPages(resultJson.total_pages);
        }, alert);
    }

    function fetchByName(name: string) {
        if (!name) {
            fetchPopular(1);
        }
        theMovieDb.search.getMovie({page: currentPage, query: name}, (result: string) => {
            let resultJson: PopularMoviesResult = JSON.parse(result);
            setMovieList(resultJson.results);
            setTotalPages(resultJson.total_pages);
        }, alert);
    }

    function fetchByGenre(genre: number) {
        theMovieDb.discover.getMovies({page: currentPage, with_genres: [genre]}, (result: string) => {
            let resultJson: PopularMoviesResult = JSON.parse(result);
            setMovieList(resultJson.results);
            setTotalPages(resultJson.total_pages);
        }, alert);
    }

    useEffect(() => {
        console.log('effect 1');
        const queryPage = Number(query.get('page'));
        if (queryPage > 0 && !isNaN(queryPage)) {
            setCurrentPage(queryPage);
        } else {
            setCurrentPage(1);
        }
    }, [query.get('page')])

    useEffect(() => {
        console.log('effect 2');
        const name = query.get('name');
        if (name) {
            fetchByName(name);
            return;
        }
        const genre = query.get('genre');
        if (genre) {
            fetchByGenre(Number(genre));
            return;
        }
        fetchPopular(currentPage);
    }, [currentPage, query.get('name'), query.get('genre')]);

    return (
        <div className="MainPage">
            <Container>
                <h1 className="my-3">Movies™</h1>
                <Row>
                    <Col md={4}>
                        <SearchBar/>
                    </Col>
                </Row>
                <Row>
                    <MovieList movies={movieList}/>
                </Row>
                <Row>
                    <PageButtons {...{totalPages, ...props, currentPage}}/>
                </Row>
            </Container>
        </div>
    )
}

export default MainPage;
