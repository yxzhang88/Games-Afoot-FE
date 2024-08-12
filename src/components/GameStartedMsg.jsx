import { Alert } from "@mui/material";

export default function GameStartedMsg({ setShow }) {
    return (
        <Alert severity="info" onClose={() => {setShow(false)}}>Game started! See first clue below.</Alert>
    )
}