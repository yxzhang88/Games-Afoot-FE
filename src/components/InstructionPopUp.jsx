import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./InstructionPopUp.css";

function InstructionPopUp() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <InfoIcon
                onClick={handleClickOpen}
                aria-label="open"
                color="primary"
            />
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogActions>
                    <CloseIcon onClick={handleClose} aria-label="close" />
                </DialogActions>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Game Instructions
                </DialogTitle>
                <DialogContent>
                    <ul>
                        <li>
                            To begin please press &quot;Start Game&quot; button.
                        </li>
                        <li>Select game parameters and click submit.</li>
                        <li>
                            It will randonly generate a landmark in closed
                            promity to the player based on the selected
                            parameters.
                        </li>
                        <li>The player will have to guess the landmark</li>
                        <li>The game will give one hint to the player.</li>
                        <li>
                            The player can get distance of how far from landmark
                            by clicking location button.
                        </li>
                        <li>
                            The player can also get more hint by clicking hint
                            button.
                        </li>
                        <li>
                            Once player reaches the landmark, the game will end
                            and show the landmark and description.
                        </li>
                        <li>
                            The next landmarkt&apos;s first clue will be
                            displayed if player click more than one site.
                        </li>
                        <li>
                            The game will continue until it reaches the last
                            landmark and the game will end.
                        </li>
                        <li>
                            The player can start a new game by clicking start
                            game button again.
                        </li>
                    </ul>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default InstructionPopUp;

// const InstructionPopUp = ()=>{
//     const [open, setOpen] = useState(false);

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className="instructionPopUp-modal">
//             <div className="modal-content">
//                 <span className="close" onClick={handleClose}>
//                     &times;
//                 </span>
//                 <ul>
//                     Instructions:
//                     <li>
//                         To begin please press &quot;Start Game&quot; button.
//                     </li>
//                     <li>Select game parameters and click submit.</li>
//                     <li>
//                         It will randonly generate a landmark in closed promity
//                         to the player based on the selected parameters.
//                     </li>
//                     <li>The player will have to guess the landmark</li>
//                     <li>The game will give one hint to the player.</li>
//                     <li>
//                         The player can get distance of how far from landmark by
//                         clicking location button.
//                     </li>
//                     <li>
//                         The player can also get more hint by clicking hint
//                         button.
//                     </li>
//                     <li>
//                         Once player reaches the landmark, the game will end and
//                         show the landmark and description.
//                     </li>
//                     <li>
//                         The next landmarkt&apos;s first clue will be displayed
//                         if player click more than one site.
//                     </li>
//                     <li>
//                         The game will continue until it reaches the last
//                         landmark and the game will end.
//                     </li>
//                     <li>
//                         The player can start a new game by clicking start game
//                         button again.
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };
