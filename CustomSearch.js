import { useState } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    console.log("Search function started!"); // Debug message

    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_REAL_API_KEY`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    const data = await response.json();
    console.log("API Response:", data); // Debug message
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
          <h2>Search Results:</h2>
          {results.map((article, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
              <p>{article.description || "No description available."}</p>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="Article image" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
