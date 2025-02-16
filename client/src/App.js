import "./App.css";
import { useState, useEffect } from 'react';
import Recommendation from './Recommendation.js';

const baseUrl = "http://localhost:5001";

function App() {
  const [videos, setVideos] = useState([]);

  function getVideos() {
    fetch(`${baseUrl}/`)
      .then(response => response.json())
      .then(videos => setVideos(videos))
      .catch(error => console.log(error));
  }
  function deleteVideo(id) {
    fetch(`${baseUrl}/${id}`, {method: "DELETE"})
      .then(response => response.json())
      .then(result => {
        if (result["result"] !== "failure") {
          getVideos();
        } else {
          console.log("could not delete");
        }
      });
  }
  function newVideo(event) {
    event.preventDefault();
    const fetchParams = {
      method: "POST",
      body: JSON.stringify({
        title: event.target.title.value,
        url: event.target.url.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    fetch(`${baseUrl}/`, fetchParams)
      .then(response => response.json())
      .then(result => {
        if (result["result"] !== "failure") {
          getVideos();
        } else {
          console.log("could not delete");
        }
      });
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <form id='newVideo' onSubmit={newVideo}>
          <input name='title' type='text'/>
          <input name='url' type='text'/>
          <input type='submit'/>
        </form>
        {
          videos.length === 0
            ? <div>initialising</div>
            : videos.map((video) => (
                <Recommendation
                  key={video.id}
                  video={video}
                  deleteVideo={deleteVideo}
                />
              ))
        }
      </header>
    </div>
  );
}

export default App;
