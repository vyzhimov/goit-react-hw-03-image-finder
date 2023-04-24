import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { photos } = this.props;

    return (
      <>
        <ul className="ImageGallery">
          {photos.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                largeImage={largeImageURL}
                showModal={() => this.props.showModal(largeImageURL)}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
