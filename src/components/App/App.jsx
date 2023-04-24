import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { PixabayPlug } from 'components/PixabayPlug/PixabayPlug';
import FindError from 'components/FindError/FindError';
import { ThreeCircles } from 'react-loader-spinner';
import { fetchPhotos } from 'services/pixabay-api';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    photoList: [],
    page: 1,
    status: 'idle',
    error: '',
    isLoading: false,
    isShowBtn: false,
    isShowModal: false,
    isScroll: false,
    largeImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const currentPage = prevState.page;
    const nextPage = this.state.page;

    if ((prevQuery !== nextQuery || currentPage) !== nextPage) {
      this.setState({ isLoading: true });
      try {
        const nextPhotos = await fetchPhotos(nextQuery, nextPage);
        if (nextPhotos.hits.length === 0) {
          this.setState({ status: 'rejected', isLoading: false });
        } else {
          const totalPage = Math.ceil(nextPhotos.totalHits / 12);

          this.setState(prev => ({
            photoList: [...prev.photoList, ...nextPhotos.hits],
            status: 'resolved',
            isShowBtn: this.state.page !== totalPage,
            isLoading: false,
            isShowModal: false,
          }));

          if (this.state.isScroll) {
            this.handleScrollToBottom();
          }
        }
      } catch (error) {
        this.setState({
          error: `Sorry, search error. Try reloading the page! `,
          isLoading: false,
          status: '',
        });
      }
    }
  }

  handleScrollToBottom = () => {
    scroll.scrollToBottom();
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      photoList: [],
      page: 1,
      isShowBtn: false,
      isScroll: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1, isScroll: true }));
  };

  handleShowLargeImg = largeImage => {
    this.setState({ largeImage, isShowModal: true });
  };

  togleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  render() {
    const { handleFormSubmit, handleShowLargeImg, handleLoadMore, togleModal } =
      this;
    const {
      photoList,
      status,
      error,
      isLoading,
      isShowBtn,
      isShowModal,
      largeImage,
    } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && <PixabayPlug />}
        {status === 'rejected' && <FindError />}
        {status === 'resolved' && (
          <ImageGallery photos={photoList} showModal={handleShowLargeImg} />
        )}
        {error && <h1 style={{ margin: '0 auto' }}>{error}</h1>}
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
        {isShowBtn && <Button load={handleLoadMore} />}
        {isShowModal && (
          <Modal togleModal={togleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
