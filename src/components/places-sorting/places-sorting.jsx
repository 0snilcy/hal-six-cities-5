import React, { PureComponent } from 'react';
import cl from 'classnames';
import { connect } from 'react-redux';
import { ActionCreator } from '../store/action';
import { btnSort } from '../../const/const';
import PropTypes from 'prop-types';

class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { sortingType, activeTypeSort } = this.props;
    const btnSortToArray = Object.values(btnSort);

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
          }}
        >
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={cl('places__options places__options--custom', {
            'places__options--opened': this.state.isOpen,
            'places__options--closed': !this.state.isOpen,
          })}
          onClick={({ target }) => {
            sortingType(target.dataset.name);
          }}
        >
          {btnSortToArray.map((btn, id) => (
            <li
              className={cl('places__option', {
                'places__option--active': btn === activeTypeSort,
              })}
              tabIndex="0"
              data-name={btn}
              key={id}
              onClick={() => {
                this.setState({
                  isOpen: !this.state.isOpen,
                });
              }}
            >
              {btn}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

PlacesSorting.propTypes = {
  sortingType: PropTypes.func.isRequired,
  activeTypeSort: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeTypeSort: state.activeTypeSort,
});
const mapDispatchToProps = (dispatch) => ({
  sortingType: (payload) => dispatch(ActionCreator.sortingType(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSorting);