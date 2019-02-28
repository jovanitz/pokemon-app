import React, { PureComponent } from "react";
import axios from 'axios';
import "@babel/polyfill";
import { TablePagination , ClickAwayListener} from '@material-ui/core';
import Pokemon from 'components/Pokemon';
import 'styles/app.scss';
import { API } from 'helpers';
import { v4 } from 'uuid';

const PAGE_SIZE = 20;

async function getInfoPokemons(pokemons) {
  const promises = pokemons.map(async item => {
    const response = await axios.get(item.url);

    return { name: item.name, data: response.data};
  });
  const results = await Promise.all(promises)
  return results;
}

class App extends PureComponent {
  _isMounted = true;

  constructor(){
    super();
    this.state = {
      count: 0,
      page: 0,
      pokemons: [],
    }
  }
  componentDidMount() {
    this.getPokemons();
  }

  getPokemons(page) {
    this._isMounted = true;
    const offset = page  * PAGE_SIZE;
    const url = `${ API }/pokemon?offset=${ offset }&limit=${ PAGE_SIZE }`;
    axios.get(url)
    .then(resp => {
      const { data = {} } = resp;
      const { count, results} = data;
      if (count && results && this._isMounted) {
        getInfoPokemons(results).then(res => {
          const pokemons = res.map(data => <Pokemon key={ v4() } { ...data } />);
          this.setState({ count, page, pokemons }); 
        });
      }
    })
    .catch(error => console.log(error))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { count, page = 0, pokemons } = this.state;
    
    return (
      <div>
      <div className="pagination">
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
      { pokemons }
      </div>
      )
  }
}

export default App;
