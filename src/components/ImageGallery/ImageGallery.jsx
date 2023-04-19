import { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

import FindError from 'components/FindError/FindError';

export default class ImageGallery extends Component {
  state = {
    photoList: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextQuery}&page=1&key=33863715-df25260fa40bd11fad8b98be3&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`The results with ${nextQuery} not found`)
          );
        })
        .then(photoList => this.setState({ photoList, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { photoList, error, status } = this.state;
    if (status === 'idle') {
      return <h1>"Please enter your search query"</h1>;
    }

    if (status === 'pending') {
      return (
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#02315c"
          innerCircleColor="#0a82a3"
          middleCircleColor="#02315c"
        />
      );
    }

    if (status === 'rejected') {
      return <FindError message={error.message} />;
      // return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      console.log(photoList);
      return (
        <img
          src={photoList.hits[0].largeImageURL}
          alt={this.props.searchQuery}
        />
      );
    }
  }
}
