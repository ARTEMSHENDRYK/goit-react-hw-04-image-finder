import { useState } from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css"

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleInputChange(evt) {
    setSearchQuery(evt.target.value.toLowerCase());
  } 
  
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!searchQuery.trim()) {
      alert("Some search query needed.");
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          className={css["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className={css["SearchForm-button"]}>
          <span className={css["SearchForm-button-label"]}>Search</span>
        </button>
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;