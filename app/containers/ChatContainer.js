import { connect } from "react-redux";
import Chat from "../components/Chat.jsx";
import getMessagesSelector from "../selectors";

const mapStateToProps = state => ({
  messages: getMessagesSelector(state),
  clientId: state.clientId
});

export default connect(mapStateToProps)(Chat);
