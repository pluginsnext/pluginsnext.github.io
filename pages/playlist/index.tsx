import { FormEvent, useState } from "react";

type OnAdd = (url: string) => void;

type UserInputProps = {
  onAdd: OnAdd;
};

export function UserInput({ onAdd }: UserInputProps) {
  const [userInput, setUserInput] = useState<string>("");

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput) {
      alert("It's manadatory field");
      return;
    }

    onAdd(userInput);
    setUserInput("");
  };

  return (
    <form onSubmit={onSubmit} className="row">
      <div className="col-10">
        <input
          autoFocus
          className="form-control"
          value={userInput}
          onChange={onChange}
        ></input>
      </div>
      <div className="d-grid gap-2 col-2">
        <button type="submit" className="btn btn-danger">
          Add
        </button>
      </div>
    </form>
  );
}

type PlaylistProps = {
  playlist: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export function Playlist({
  playlist,
  activeIndex,
  setActiveIndex,
}: PlaylistProps) {
  if (!playlist.length) {
    return (
      <div className="mb-5 text-center">
        <small className="text-muted">The playlist is empty</small>
      </div>
    );
  }

  return (
    <ul className="list-group mb-5">
      {playlist.map((url: string, index: number) => {
        return (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`list-group-item ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {/* TODO: Fix key */}
            {url}
          </li>
        );
      })}
    </ul>
  );
}

type VideoProps = {
  id: string;
};

export function Video({ id }: VideoProps) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

export function HeaderComponent() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5 p-3 shadow-sm">
      <div className="container-fluid">
        <strong className="navbar-brand">Playlist</strong>
      </div>
    </nav>
  );
}

const getId = (_url: string): string => {
  const url = _url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

export default function Youtube() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");

  const onAdd = (url: string) => {
    setPlaylist((playlist) => [...playlist, url]);
  };

  const onSearch = (param: string) => {
    const yKey = "AIzaSyCxLHRvLD6QaeCNmERMbqHMq3DY6kds_gk";
    // const response = youtubeApi.get('/search').
    const url = `https://www.googleapis.com/youtube/v3/search?key=${yKey}&part=snippet&maxResults=10&q=${param}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${yKey}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchParam(e.currentTarget.value);
    onSearch(e.currentTarget.value);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Playlist
              playlist={playlist}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <UserInput onAdd={onAdd} />
            <input value={searchParam} onChange={onChange} />
            {searchParam}
          </div>
          {!!playlist[activeIndex] && (
            <div className="col-md-6">
              <Video id={getId(playlist[activeIndex])} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
