import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  boardId: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  pinTitle: PropTypes.string.isRequired,
  pinURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
});

export default { pinShape };
