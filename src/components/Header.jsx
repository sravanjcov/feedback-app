import PropTypes from 'prop-types';

function Header({ text }) {
  const headerStyles = {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
  };

  return (
    <header style={headerStyles}>
      <div className="container" style={{ padding: '1rem 0' }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{text}</h1>
      </div>
    </header>
  );
}

Header.propTypes = {
  text: PropTypes.string,
};

Header.defaultProps = {
  text: 'Feedback Application',
};

export default Header;