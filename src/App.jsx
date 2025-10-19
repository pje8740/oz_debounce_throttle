import { useState, useCallback } from "react";
import "./App.css";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, delay) {
  let lastTime = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleDebounceSearch = useCallback(
    debounce((value) => {
      console.log("🕒 Debounce 검색 실행:", value);
      setSearchString(value);
    }, 1000),
    []
  );
  const handleThrottleSearch = useCallback(
    throttle((value) => {
      console.log("⚡ Throttle 검색 실행:", value);
      setSearchString(value);
    }, 1000),
    []
  );

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log("검색 쿼리:", event.target.value);
  };

  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={handleChange}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleChange}
        />
      </div>
      <p>{searchString}</p>
    </div>
  );
}

export default App;
