import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Pokemon extends PureComponent {
  render(){
    const { data = {}, name = {} } = this.props;
    const { sprites = {} } = data;
    const { back_default = '' } = sprites;
    
    return (
      <div>
        { name }
        <img alt={ name } src={ back_default } />
      </div>
    )
  }
}

Pokemon.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string
}

export default Pokemon;