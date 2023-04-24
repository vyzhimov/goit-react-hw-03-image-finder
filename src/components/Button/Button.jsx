import PropTypes from 'prop-types';

export const Button = ({ load }) => {
  return (
    <button className="Button" type="button" onClick={load}>
      Load more
    </button>
  );
};

Button.propTypes = {
  load: PropTypes.func.isRequired,
};
