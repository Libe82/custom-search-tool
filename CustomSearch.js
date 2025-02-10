import { useState, useEffect } from "react";
import "../styles/globals.css"; // ✅ Import styles

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Favorite topics to display automatically
  const defaultTopics = [
    "Clean Energy Technology",
    "AI Next Steps",
    "Astronomy & Physics Discoveries",
    "Eco-Friendly Farming Innovations",
    "Sci-Fi & Hard Fiction News",
  ];

  // ✅ Fetch news automatically on page load
  useEffect(() => {
    fetchNews(defaultTopics.join(" OR "));
  }, []);

  // ✅ Fetch news from API
  const fetchNews = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=7dc72a2cd83d4a95ab72a92cd604b6d7`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      setResults(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle manual search
  const handleSearch = () => {
    if (query.trim() !== "") {
      fetchNews(query);
    }
  };

  return (
    <div className="container">
      <h1>Custom Search Tool</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>News Results:</h2>

      {/* ✅ Display News Results */}
      <div className="news-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          results.map((article) => (
            <div key={article.url} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="news-image" />
              )}
              <div className="news-content">
                <h3>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p>
                  <strong>Source:</strong> {article.source.name}
                </p>
                <p>{article.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No news found. Try searching!</p>
        )}
      </div>
    </div>
  );
}
