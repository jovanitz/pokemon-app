import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StarBorder, Info } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 40,
    color: '#e6e6e6',
    cursor: 'pointer'
  },
});

class Pokemon extends PureComponent {
  render(){
    const { data = {}, name = {}, image= '', classes } = this.props;
    const { sprites = {} } = data;
    const { back_default = '' } = sprites;

    return (
      <div className='pokemon'>
        <div className='pokemon__name'>{ name }</div>
        <img src={ image } />
        <Tooltip title="Add to Favorites">
          <StarBorder className={classes.icon} />
        </Tooltip>
        <div className='pokemon__info'>
          <Tooltip title="See More">
            <Info className={classes.icon} />
          </Tooltip>
        </div>
      </div>
    )
  }
}

Pokemon.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Pokemon);