import React, {useEffect, useState} from 'react';

const theMovieDb = require('../../util/themoviedb');

type Genre = { id: number, name: string }

const SearchBar: React.FC = () => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function fetchGenres() {
        theMovieDb.genres.getMovieList({},
            (result: string) => {
                let jsonData: { genres: Genre[] } = JSON.parse(result);
                setGenres(jsonData.genres);
            },
            alert
        )
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div className="SearchBar">
            <input type="text" onChange={handleChange} value={searchValue}/>
            <select className="form-control">
                <option>Any</option>
                {genres.map(g => <option key={g.id}>{g.name}</option>)}
            </select>
        </div>
    )
}

export default SearchBar;