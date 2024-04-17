function SearchResult({ result }) {
	const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    return (
        <div className="result">
            <h3>{result.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: result.snippet  }}></p>
            <a href={url} target="_blank" rel="noreferrer">Read more</a>
        </div>
    );
}

export default SearchResult;
