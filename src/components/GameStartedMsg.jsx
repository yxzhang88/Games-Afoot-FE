import { Alert } from "@mui/material";
import PropTypes from "prop-types";

export default function GameStartedMsg({ setShow }) {
    return (
        <Alert severity="info" onClose={() => {setShow(false)}}>Game started! See first clue below.</Alert>
    )
}

GameStartedMsg.propTypes = {
    setShow: PropTypes.func.isRequired,
};