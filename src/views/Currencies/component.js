import React from "react";
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
// @material-ui/core components
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import Downshift from 'downshift';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

let popperNode;
function renderInput(inputProps) {
  const { InputProps, ref, ...other } = inputProps;

  return (
    <CustomInput
      labelText="Country"
      id="country"
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
}

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currencies: null,
      code: ''
    }
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 ?
      [] :
      this.state.currencies.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.name}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies()
  }

  componentWillReceiveProps(nextProps) {
    let { type, result } = nextProps;

    if (type === 'FETCH_CURRENCIES_SUCCESSED') {
      this.setState({render:true, currencies:result});
    }
  }

  handleChange(item) {
    let data = this.state.currencies.filter((currency) => {
      return currency.name === item
    })
    this.setState({code: data[0].currencies[0].code})
    this.props.onChange({country: item, currency:data[0].currencies[0].code})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.currencies !== null &&
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Downshift id="downshift-popper" onChange={ item => this.handleChange(item)}>
            {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => (
              <div>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({}),
                  ref: node => {
                    popperNode = node;
                  },
                })}
                <Popper open={isOpen} anchorEl={popperNode}>
                  <div {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}>
                    <Paper
                      square
                      style={{ marginTop: 8, width: popperNode ? popperNode.clientWidth : null }}
                    >
                      {this.getSuggestions(inputValue).map((suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  </div>
                </Popper>
              </div>
            )}
            </Downshift>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              labelText="Currency"
              id="currency"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
              value : this.state.code
              }}
            />
          </GridItem>
        </GridContainer>
        }
      </div>
    )
  }
}
Component.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func
}