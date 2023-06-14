import PropTypes from "prop-types";
import css from "./Button.module.css";

function Button({ handleLoadMore }) {
  return (
      <button className={css.Button} type="button" onClick={handleLoadMore}>Load more</button>
  )
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
}

export default Button;