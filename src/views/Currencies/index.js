import Component from './component';
//import withStyles from "@material-ui/core/styles/withStyles";
import { bindActionCreators } from 'redux'
import { ActionCreators } from 'actions'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}

const mapStateToProps = state => {
  let {result, type} = state.currenciesList

  return {
    result,
    type
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)