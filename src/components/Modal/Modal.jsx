import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = e => {
    if (e.keyCode === 27) {
      this.props.togleModal();
    }
  };

  handleClickOverlayClose = e => {
    if (e.target === e.currentTarget) {
      this.props.togleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleClickOverlayClose}>
        <div className="Modal">
          <img src={this.props.largeImage} alt="large_image" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
