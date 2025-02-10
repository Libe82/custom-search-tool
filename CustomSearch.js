import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Temas favoritos para mostrar automáticamente
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

  // Cargar noticias automáticamente al abrir la página
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

  // Función para realizar una búsqueda manual
  const handleSearch = async () => {
    const articles = await fetchNews(query);
    setResults(articles);
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
          <h2>News Results:</h2>
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
