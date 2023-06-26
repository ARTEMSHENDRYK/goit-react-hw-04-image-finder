import { useState } from "react";
import Modal from "components/Modal/Modal";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ tags, webformatURL, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);
  
  function toggleModal() {
    setShowModal(!showModal);
  }

  function openModal() {
    toggleModal();
  }

  return (
    <li className={css.ImageGalleryItem} onClick={() => { openModal() }}>
      <img
        className={css["ImageGalleryItem-image"]}
        src={webformatURL}
        alt={tags}
      />
      {showModal && <Modal onClose={toggleModal}>
        <img
          src={largeImageURL}
          alt={tags}
        />
      </Modal>}
    </li>
  )
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}

export default ImageGalleryItem;