import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import theMovieDb from '../../../util/themoviedb';
import {BrowserRouterProps, useLocation, withRouter} from "react-router-dom";
import {RouteComponentProps} from 'react-router';
import {delQuery, setQuery} from "../../../util/util";

type SearchBarProps = {
    // fetchByName: (name: string) => any,
    // fetchByGenre: (genre: number) => any
    currentGenre: string
    currentText: string
    currentSort: string
} & RouteComponentProps;

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const [genreList, setGenreList] = useState<Genre[]>([]);
    const [searchGenre, setSearchGenre] = useState<string>(props.currentGenre);
    const [searchValue, setSearchValue] = useState<string>(props.currentText);
    const [sortBy, setSortBy] = useState<string>(props.currentSort);

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "Any") {
            props.history.push('/');
        } else if (!isNaN(Number(e.target.value))) {
            props.history.push(`?genre=${e.target.value}`);
        }
        setSearchGenre(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.history.push(`?name=${searchValue}`);
        setSearchGenre("Any");
        console.log("SUBMITTED");
    }

    function fetchGenres() {
        theMovieDb.genres.getMovieList({},
            (result: string) => {
                let jsonData: { genres: Genre[] } = JSON.parse(result);
                setGenreList(jsonData.genres);
            },
            alert
        )
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div className="SearchBar">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl type="text" onChange={handleNameChange} value={searchValue}/>
                </FormGroup>
                <FormGroup>
                    <select className="form-control" onChange={handleGenreChange} value={searchGenre}>
                        <option>Any</option>
                        {genreList.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Button variant="outline-dark" type="submit">Search</Button>
                </FormGroup>
                {searchGenre !== "Any" ? <FormGroup>
                    <FormLabel>Sort By</FormLabel>
                    <select className="form-control" onChange={(e) => {
                        setSortBy(e.target.value);
                        setQuery(props, {'sort': e.target.value});
                    }} value={sortBy}>
                        <option value="popularity">Popularity</option>
                        <option value="release_date">Release Date</option>
                        <option value="title">Title</option>
                        <option value="vote_average">Average Vote</option>
                    </select>
                </FormGroup> : null}

            </Form>
        </div>
    )
}

export default withRouter(SearchBar);
