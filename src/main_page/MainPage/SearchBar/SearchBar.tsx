import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import theMovieDb from '../../../util/themoviedb';
import {BrowserRouterProps, useLocation, withRouter} from "react-router-dom";
import {RouteComponentProps} from 'react-router';

// type SearchBarProps = {
//     fetchByName: (name: string) => any,
//     fetchByGenre: (genre: number) => any
// }

const SearchBar: React.FC<RouteComponentProps> = (props) => {

    const [genreList, setGenreList] = useState<Genre[]>([]);
    const [searchGenre, setSearchGenre] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (!isNaN(Number(e.target.value))) {
            props.history.push(`?genre=${e.target.value}`);
            // props.fetchByGenre(Number(e.target.value));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.history.push(`?name=${searchValue}`)
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
                    <select className="form-control" onChange={handleGenreChange}>
                        <option>Any</option>
                        {genreList.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Button variant="outline-dark" type="submit">Search</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default withRouter(SearchBar);
