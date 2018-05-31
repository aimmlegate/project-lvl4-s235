import { connect } from "react-redux";
import Channels from "../components/Channels.jsx";

const mapStateToProps = state => ({ channels: state.channels });

export default connect(mapStateToProps)(Channels);