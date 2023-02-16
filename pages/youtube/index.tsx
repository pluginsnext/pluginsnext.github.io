import { useState } from "react";

export function UserInput({ handleChange, fileLink, handleSubmit }) {
  return (
    <>
      <input
        className="form-control mb-3"
        value={fileLink}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <button className="btn btn-secondary btn-sm" onClick={handleSubmit}>
        <img
          style={{ height: "40px", padding: "2px" }}
          src="../../static/youtube.ico"
          alt="buttonpng"
        />
        Save to playlist
      </button>
    </>
  );
}

export function Playlist({ playlists, handleClick }) {
  if (!playlists.length) {
    return <></>;
  }
  const lists = playlists.map((playlist, index) => {
    return (
      <li key={index} onClick={() => handleClick(playlist)}>
        {playlist}
      </li>
    );
  });
  return <ol>{lists}</ol>;
}

export function Video(videoLink) {
  return (
    <iframe
      width="853"
      height="480"
      src="https://www.youtube.com/embed/a6j5lbt6OLQ"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
}

export default function Youtube() {
  const [userInput, setUserInput] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [playlists, setPlaylists] = useState<string[]>([]);

  const onInputChange = (value) => {
    setUserInput(value);
  };

  const onInputSubmit = (value) => {
    if (!userInput) {
      alert("It's manadatory field");
      return;
    }
    setPlaylists([...playlists, userInput]);
    setUserInput("");
  };

  const onPlayVideo = (url) => {
    setVideoLink(url);
  };

  return (
    <div className="container row">
      <div className="col-md-6">
        <p className="h3 mt-3 mb-3">Enter url to update the Playlist</p>
        <UserInput
          handleChange={onInputChange}
          handleSubmit={onInputSubmit}
          fileLink={userInput}
        />
        <Playlist playlists={playlists} handleClick={onPlayVideo} />
      </div>
      <div className="col-md-6">
        {videoLink && <Video linkUrl={videoLink} />}
      </div>
    </div>
  );
}
