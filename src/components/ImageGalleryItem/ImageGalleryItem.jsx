import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { largeImage, url, tags, showModal } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={() => showModal(largeImage)}>
        <img className="ImageGalleryItem-image" src={url} alt={tags} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
