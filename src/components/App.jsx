import { useState, useEffect } from "react";
import PixabayAPI from "api/PixabayAPI";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import css from "./App.module.css";

const pixabayAPI = new PixabayAPI();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hits, setHits] = useState([]);
  const [hitsFlag, setHitsFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchData = async () => {
      const response = await pixabayAPI.fetchHits();
      setHits(response.hits);
      checkHits(response.hits.length);
    }

    setIsLoading(true);
    pixabayAPI.resetPage();
    pixabayAPI.query = searchQuery;
    setHits([]);
    fetchData();
    setIsLoading(false);
  }, [searchQuery]) 

  useEffect(() => {
    const fetchData = async () => {
      const response = await pixabayAPI.fetchHits();
      setHits(hits => ([...hits, ...response.hits]));
      checkHits(response.hits.length);
    }

    if (loadMore && hitsFlag) {
      smoothScroll();
      fetchData();
      setIsLoading(false);
      setLoadMore(false);
    }
  }, [loadMore, hitsFlag])
  
  function handleSubmit(searchQuery) {
    setSearchQuery(searchQuery.trim());
  }

  function handleLoadMore() {
    setIsLoading(true);
    setLoadMore(true);
  }

  function checkHits(hitsLength) {
    if (hitsLength === pixabayAPI.perPage) {
      setHitsFlag(true)
    }
    else {
      setHitsFlag(false)
    }
  }      

  function smoothScroll() {
    const { height: cardHeight } = document.querySelector("ul").firstElementChild.getBoundingClientRect();
    console.log(cardHeight);
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }

  return(
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {hits.length > 0 && <ImageGallery hits={hits} />}
      {isLoading && <Loader />} 
      {hitsFlag && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;