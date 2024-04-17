import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import SearchResult from './components/SearchResult';

function App() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const [searchInfo, setSearchInfo] = useState({});

	const handleSearch = async (e, page = 1) => {
		e.preventDefault();
		if (search == '') return;
		
		const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&sroffset=${(page - 1) * 20}&srlimit=20&srsearch=${search}`;

		const response = await fetch(endpoint);

		if (!response.ok) {
			throw Error(response.statusText);
		}

		const json = await response.json();

		setResults(json.query.search);
		if (json.query.searchinfo <= 10000) {
			setSearchInfo(json.query.searchinfo);
		} else {
			const temp = { ...json.query.searchinfo };
			temp.totalhits = 10000;
			setSearchInfo(temp);
		}
	}

	return (
		<div className="App">
			<header>
				<h1>Me.com</h1>
				<form className="search-box" onSubmit={handleSearch}>
					<input type="search" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
				</form>
				{(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : null}
			</header>
			<div className="results">
				{results.map((result, i) => {
					return (
						<SearchResult key={i} result={result}/>
					)
				})}
			</div>
			<div className="paginator">
				{(searchInfo.totalhits) ? <Pagination count={Math.ceil(searchInfo.totalhits / 20)} onChange={(e, page) => handleSearch(e, page)} /> : null}
			</div>
		</div>
	);
}

export default App;

