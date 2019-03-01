import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { TablePagination , ClickAwayListener} from '@material-ui/core';
import Loading from 'react-loading-components';
import menu from 'hoc/menu';
import PokemonCard from 'components/PokemonCard';
import { API } from 'helpers';
import { v4 } from 'uuid';

const PAGE_SIZE = 20;

async function getInfoPokemons(pokemons) {
  const promises = pokemons.map(async item => {
    const response = await axios.get(item.url);

    return { name: item.name, data: response.data };
  });
  const results = await Promise.all(promises)
  return results;
}

async function getPokemonsImages(pokemons) {
  const promises = pokemons.map(async item => {
    const response = await axios.get(item.data.sprites.back_default, { responseType: 'arraybuffer' });

    return { ...item,  image: response.data };
  });
  const results = await Promise.all(promises)
  return results;
}

class Home extends PureComponent {
  _isMounted = true;

  constructor(){
    super();
    this.state = {
      count: 0,
      page: 0,
      pokemons: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.getPokemons();
  }

  getPokemons(page) {
    this._isMounted = true;
    const offset = page  * PAGE_SIZE;
    const url = `${ API }/pokemon?offset=${ offset }&limit=${ PAGE_SIZE }`;
    this.setState({ loading: true });
    axios.get(url)
    .then(resp => {
      const { data = {} } = resp;
      const { count, results} = data;
      if (count && results && this._isMounted) {
        const favorites = this.props.pokemons.map(pokemon => pokemon.name);
        getInfoPokemons(results).then(res => {
          getPokemonsImages(res).then(res => {
            const pokemons = res.map(data => {
              const base64 = btoa(
                new Uint8Array(data.image).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
              );
              const isFavorite = favorites.includes(data.name);
              
              return <PokemonCard
                        isFavorite={ isFavorite }
                        key={ v4() } { ...data }
                        image={ `data:;base64,${ base64 }`}
                        addPokemon={ info => this.addPokemon(info) }
                        removePokemon={ name => this.removePokemon(name) }
                     />;
            });
            this.setState({ count, page, pokemons, loading: false }); 
          })
        });
      }
    })
    .catch(error => this.setState({ loading: false }))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addPokemon(pokemon) {
    const { setPokemons, pokemons } = this.props;
    const newPokemons = pokemons.concat(pokemon);
    console.log(newPokemons);
    setPokemons(newPokemons);
  }

  removePokemon(name) {
    const { setPokemons, pokemons } = this.props;
    const newPokemons = pokemons.filter(pokemon => !Object.is(pokemon.name, name));
    console.log(newPokemons);
    
    setPokemons(newPokemons);
  }

  render() {
    const { count, page = 0, pokemons, loading } = this.state;

    const renderPokemons = !loading
      ? <div className='pokemons'>
          { pokemons }
        </div>
      : <div className='loading'>
          <Loading type='puff' width={ 60 } fill='#529404' />
        </div>;
    
    const renderPagination = !loading
     ? <div className="pagination">
        <TablePagination
          component="div"
          count={ count }
          rowsPerPage={ PAGE_SIZE }
          page={ page }
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={ (e, num) => this.getPokemons(num) }
          rowsPerPageOptions={ [] }
          labelDisplayedRows={
            ({ from, to, count }) => `${ from }-${ to } de ${ count }`
          }
        />
      </div>
      : undefined;
          
    
    return (
      <div className='pokemon-app'>
        { renderPokemons }
        { renderPagination }
      </div>
      )
  }
}

Home.propTypes = {
  pokemons: PropTypes.shape(),
  setPokemons: PropTypes.function,
};

export default menu(Home);
