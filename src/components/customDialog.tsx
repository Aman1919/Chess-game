import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from "@mui/material"

type Props = {
        winner: string,
        handleContinue:any
}
 const CustomDialog: React.FC<Props>=({winner,handleContinue})=> {
        return (
                <Dialog
        open={winner.length?true:false}
      >
                        <><DialogTitle id="alert-dialog-title">
                                Game Over !!
                        </DialogTitle>
                                <DialogContent>
                                        < DialogContentText id="alert-dialog-description">
                                                {winner + " is the winner !!"}
                                        </DialogContentText>
                      </DialogContent><DialogActions>
                              <Button onClick={handleContinue}>close</Button>
                      </DialogActions></>
      </Dialog>
)

}

export default CustomDialog