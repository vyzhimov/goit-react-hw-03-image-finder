import { Component } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleValueChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  hadleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter your query!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery.toLowerCase());
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    const { hadleSubmit, handleValueChange } = this;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={hadleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">
              <FcSearch style={{ fontSize: '20px' }} />
            </span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleValueChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
