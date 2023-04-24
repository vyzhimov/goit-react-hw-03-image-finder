import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { fetchPhotos } from 'services/pixabay-api';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    photoList: [],
    page: 1,
    status: 'idle',
    error: false,
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
      this.setState({ isLoading: true, isShowBtn: false });
      try {
        const nextPhotos = await fetchPhotos(nextQuery, nextPage);
        if (nextPhotos.hits.length === 0) {
          this.setState({ error: true, status: 'rejected' });
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
        this.setState({ error: `The results with ${nextQuery} not found` });
      }
    }
  }

  handleScrollToBottom = () => {
    scroll.scrollToBottom();
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, photoList: [], page: 1, isScroll: false });
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
        <ImageGallery
          photos={photoList}
          status={status}
          error={error}
          isLoading={isLoading}
          showModal={handleShowLargeImg}
        />
        {isShowBtn && <Button load={handleLoadMore} />}
        {isShowModal && (
          <Modal togleModal={togleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
