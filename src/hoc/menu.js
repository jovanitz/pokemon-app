import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import Menu from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { selector } from 'helpers';
import { setPokemons } from 'state/actions';

const mapStateToProps = state => ({ pokemons: selector(state, 'pokemonReducer', 'pokemons') });

const mapDispatchToProps = dispatch => ({
  setPokemons: pokemons => dispatch(setPokemons(pokemons)),
});


function menu(WrappedComponent) {
  class MenuApp extends PureComponent {
    constructor() {
      super();
      this.state = {
        showMenu: true,
      }
    }

    render() {
      const { showMenu } = this.state;
      const classNameNav = showMenu ? 'nav-bg' : 'nav-bg nav-bg--off';
      const classNameContent = showMenu ? 'filter-blur' : '';
      const classNameHamburger = !showMenu ? 'hamburger' : 'hamburger hamburger--off';

      return (
        <div>
        <div className={ classNameHamburger } onClick={ () => this.setState({ showMenu: true }) }>
          <Menu fontSize="large" />
        </div>
        <div onClick={ () => this.setState({ showMenu: false }) }>
          <ScrollAnimation className={ classNameNav } animateIn="fadeIn">
            <nav>
              <ul>
                <li><a href="#inicio">Home</a></li>
                <li><a href="#inicio">Favorites</a></li>
              </ul>
            </nav>
            <div className="triangule"></div>
          </ScrollAnimation>
        </div>
        <div className={ classNameContent }>
          <WrappedComponent{ ...this.props } />
        </div>
        </div>
      );
    }
  }

  MenuApp.propTypes = {
    pokemons: PropTypes.shape(),
    setPokemons: PropTypes.function,
  };

  return connect(mapStateToProps, mapDispatchToProps)(MenuApp);
}

export default menu;