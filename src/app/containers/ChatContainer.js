import { connect } from "react-redux";
import Chat from "../components/Chat.jsx";

const mapStateToProps = state => ({ messages: state.messages });

export default connect(mapStateToProps)(Chat);