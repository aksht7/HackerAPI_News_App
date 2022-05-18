import SearchBar from "./SearchBar";
import Header from "./Header";
import Images from "./Images";
import "../styles.css";

export default function Home() {
  return (
    <div className="container">
      <div className="leftDiv">
        <Header />
        <SearchBar />
      </div>
      <Images />
    </div>
  );
}
