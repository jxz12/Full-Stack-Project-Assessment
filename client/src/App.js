import "./App.css";
import { useState, useEffect } from 'react';
import { MockGet, MockDelete } from './MockBackend';

function App() {
  const [videos, setVideos] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    MockGet().then(videos => setVideos(videos));
  }, []);

  useEffect(() => {
    if (deleteId === null) {
      return;
    }
    MockDelete(deleteId).then(response => {
      if (response["result"] !== "failure") {
        MockGet().then(videos => setVideos(videos));
      } else {
        console.log("could not delete");
      }
    });
  }, [deleteId]);

  const recommendations = videos.length === 0
    ? <div>initialising</div>
    : videos.map((video) => {
        const params = new URL(video.url).searchParams;
        const embedUrl = `https://www.youtube.com/embed/${params.get('v')}`;
        return (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div>rating: {video.rating}</div>
            <button onClick={() => setDeleteId(video.id)}>delete</button>
          </div>
        );
      });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {recommendations}
      </header>
    </div>
  );
}

export default App;
