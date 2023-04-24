import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { PixabayPlug } from 'components/PixabayPlug/PixabayPlug';
import FindError from 'components/FindError/FindError';
import { IsLoading } from 'components/IsLoading/IsLoading';
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
          this.setState({ status: 'rejected' });
        } else {
          const totalPage = Math.ceil(nextPhotos.totalHits / 12);

          this.setState(prev => ({
            photoList: [...prev.photoList, ...nextPhotos.hits],
            status: 'resolved',
            isShowBtn: this.state.page !== totalPage,
            isShowModal: false,
          }));

          if (nextPage !== 1) {
            this.handleScrollToBottom();
          }
        }
      } catch (error) {
        this.setState({
          error: `Sorry, search error. Try reloading the page! `,
          status: '',
        });
      } finally {
        this.setState({ isLoading: false });
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
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
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
        <ImageGallery photos={photoList} showModal={handleShowLargeImg} />
        {error && <h1 style={{ margin: '0 auto' }}>{error}</h1>}
        {isLoading && <IsLoading />}
        {isShowBtn && <Button load={handleLoadMore} />}
        {isShowModal && (
          <Modal togleModal={togleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
