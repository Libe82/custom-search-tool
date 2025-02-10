import { useState, useEffect } from "react";
import "../styles/globals.css"; // Import the new CSS file

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Favorite topics to display automatically
  const defaultTopics = [
    "Clean Energy Technology",
    "AI Next Steps",
    "Astronomy & Physics Discoveries",
    "Eco-Friendly Farming Innovations",
    "Sci-Fi & Hard Fiction News"
  ];

  const fetchNews = async (searchQuery) => {
    try {
      const response = await fetch(`/api/news?query=${searchQuery}`);
      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };

  // Load news automatically when opening the page
  useEffect(() => {
    const loadInitialNews = async () => {
      let allArticles = [];
      for (let topic of defaultTopics) {
        const articles = await fetchNews(topic);
        allArticles = [...allArticles, ...articles];
      }
      setResults(allArticles);
    };

    loadInitialNews();
  }, []);

  // Function for manual search
  const handleSearch = async () => {
    const articles = await fetchNews(query);
    setResults(articles);
  };

  return (
    <div className="container">
      <h1>Custom Search Tool</h1>
      <input
        type="text"
        placeholder="Enter search query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <div className="news-container">
          <h2>Latest News:</h2>
          {results.map((article, index) => (
            <div key={index} className="news-item">
              <h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
              <p>{article.description || "No description available."}</p>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="Article image" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
