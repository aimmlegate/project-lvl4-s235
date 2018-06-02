import { connect } from "react-redux";
import Chat from "../components/Chat.jsx";

const mapStateToProps = ({ messages, clientId }) => ({ messages, clientId });

export default connect(mapStateToProps)(Chat);