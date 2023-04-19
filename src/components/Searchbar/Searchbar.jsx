import { Component } from 'react';
import { toast } from 'react-toastify';

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
      <header className="searchbar">
        <form className="form" onSubmit={hadleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
