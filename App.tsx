import { useState } from "react";
import "./styles.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [shows, setShows] = useState<any[]>([]);

  async function searchShows() {
    if (search.trim() === "") return;

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${search}`
    );

    const data = await response.json();

    setShows(data);
  }

  return (
    <div className="App">
      <header>
        <h1>TV Show Finder</h1>

        <p>Find any show in seconds!</p>

        <input
          type="text"
          placeholder="Enter a show title... (ex. Love Island)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchShows();
            }
          }}
        />

        <button onClick={searchShows}>Search</button>
      </header>

      <main className="grid">
        {shows.slice(0, 8).map((item) => (
          <article className="card" key={item.show.id}>
            <img
              src={
                item.show.image
                  ? item.show.image.medium
                  : "https://via.placeholder.com/210x295?text=No+Image"
              }
              alt={item.show.name}
            />

            <h2>{item.show.name}</h2>

            <p>
              <strong>Rating:</strong> {item.show.rating.average || "No Rating"}
            </p>

            <p>
              <strong>Premiered:</strong> {item.show.premiered || "Unknown"}
            </p>

            <p>
              <strong>Genres:</strong> {item.show.genres.join(", ")}
            </p>

            <p className="summary">
              {item.show.summary
                ? item.show.summary.replace(/<[^>]*>/g, "").substring(0, 140) +
                  "..."
                : "No summary available."}
            </p>
          </article>
        ))}
      </main>

      <footer>
        <p>
          View Deisy's Project{" "}
          <a
            href="https://github.com/deisyvega/TVShowFinder.git"
            target="_blank"
            rel="noreferrer"
          >
            Here!
          </a>
        </p>
      </footer>
    </div>
  );
}
