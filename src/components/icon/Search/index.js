import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Search extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__search"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="M12.7 11.3c.9-1.2 1.4-2.6 1.4-4.2 0-3.9-3.1-7.1-7-7.1S0 3.2 0 7.1c0 3.9 3.2 7.1 7.1 7.1 1.6 0 3.1-.5 4.2-1.4l3 3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-3-3.1zm-5.6.8c-2.8 0-5.1-2.2-5.1-5S4.3 2 7.1 2s5.1 2.3 5.1 5.1-2.3 5-5.1 5z"
          fill={color}
        />
      </svg>
    )
  }
}

Search.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Search.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Search
