import { connect } from "react-redux";
import InputMessage from "../components/InputMessage.jsx";
import * as actionCreators from '../actions';

const mapStateToProps = () => {
  return {}  
};

export default connect(mapStateToProps, actionCreators)(InputMessage);