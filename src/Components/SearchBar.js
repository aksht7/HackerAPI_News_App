import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://hn.algolia.com/api/v1/search?query=test")
      .then((res) => {
        setPosts(res.data.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handleNavigation = (id) => {
    let path = "/details/" + id;
    navigate(path);
  };
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <p className="loader"></p>
        <p>Loading...</p>
      </div>
    );
  else
    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTitle(e.target.value)}
          ></input>
        </div>
        <div className="dataResult">
          {posts
            .filter((value) => {
              if (searchTitle === "") return value;
              else if (
                value.title.toLowerCase().includes(searchTitle.toLowerCase())
              )
                return value;
            })
            .map((post) => (
              <ul
                key={post.objectID}
                className="dataItem"
                onClick={() => handleNavigation(post.objectID)}
              >
                <p>{post.title}</p>
              </ul>
            ))}
        </div>
      </div>
    );
}
