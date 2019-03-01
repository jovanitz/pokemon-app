import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StarBorder, Star, Info } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 40,
    color: '#e6e6e6',
    cursor: 'pointer'
  },
  iconStar: {
    margin: theme.spacing.unit,
    fontSize: 40,
    color: '#cc9900',
    cursor: 'pointer'
  },
});

class PokemonCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.isFavorite,
    }
  }

  render(){
    const { isFavorite } = this.state;
    const { data = {}, name = '', image= '', classes, addPokemon, removePokemon } = this.props;
    const star = isFavorite
      ? <Tooltip title="Remove from Favorites">
          <Star
            className={ classes.iconStar }
            onClick={ () => this.setState({ isFavorite: false  }, () => removePokemon(name)) }
          />
        </Tooltip>
      : <Tooltip title="Add to Favorites">
          <StarBorder
            className={ classes.icon }
            onClick={ () => this.setState({ isFavorite: true  }, () => addPokemon({ data, name, image })) }
          />
        </Tooltip>;
    

    return (
      <div className='pokemon-card'>
        <div className='pokemon-card__name'>{ name }</div>
        <img src={ image } />
        { star }
        <div className='pokemon-card__info'>
          <Tooltip title="See More">
            <Info className={classes.icon} />
          </Tooltip>
        </div>
      </div>
    )
  }
}

PokemonCard.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  classes: PropTypes.object.isRequired,
  addPokemon: PropTypes.function,
  removePokemon: PropTypes.function,
  isFavorite: PropTypes.bool,
}

export default withStyles(styles)(PokemonCard);