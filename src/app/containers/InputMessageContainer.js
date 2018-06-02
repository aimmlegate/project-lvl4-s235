import { connect } from "react-redux";
import InputMessage from "../components/InputMessage.jsx";
import * as actionCreators from '../actions';

const mapStateToProps = state => ({ userName: state.userName});

export default connect(mapStateToProps, actionCreators)(InputMessage);