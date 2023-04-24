import { Component } from 'react';
import PropTypes from 'prop-types';

import { ThreeCircles } from 'react-loader-spinner';
import pixabay from './pixabay.png';
import FindError from 'components/FindError/FindError';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { photos, status, isLoading } = this.props;

    if (status === 'idle') {
      return <img className="PixabayImg" src={pixabay} alt="pixabay" />;
    }

    if (status === 'rejected') {
      return <FindError />;
    }

    if (status === 'resolved') {
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
          {isLoading && (
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass="LoadingStatus"
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor="#02315c"
              innerCircleColor="#0a82a3"
              middleCircleColor="#02315c"
            />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
};
