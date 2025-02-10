import { useState } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    setResults(data.articles || []);
  };

  return (
    <div>
      <h1>Custom Search Tool</h1>
      <input
        type="text"
        placeholder="Enter search query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <div>
          <h2>Results:</h2>
          {results.map((result, index) => (
            <div key={index}>
              <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
              <p>Source: {result.source.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
