import Component from './component';
import withStyles from "@material-ui/core/styles/withStyles";
import { bindActionCreators } from 'redux'
import { ActionCreators } from 'actions'
import {
  connect
} from 'react-redux';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}

const mapStateToProps = state => {
  let {result, type} = state.accountsList

  return {
    result,
    type
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Component))
