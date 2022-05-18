import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function NewsDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentComments = comments.slice(firstPostIndex, lastPostIndex);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hn.algolia.com/api/v1/items/${id}`)
      .then((res) => {
        setData(res.data);
        setComments(res.data.children);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <p className="loader"></p>
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <div className="header" style={{ fontSize: 25 }}>
        <p>Title : {data.title}</p>
      </div>
      <p className="styleLine">_</p>
      <p className="subHead">Points : {data.points}</p>
      <p className="subHead">List of all comments</p>
      {currentComments.map((data) => (
        <div
          className="comment"
          key={data.id}
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
      ))}
      <Pagination
        postPerPage={postPerPage}
        totalPosts={comments.length}
        paginate={paginate}
      />
    </>
  );
}
