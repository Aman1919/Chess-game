import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from "@mui/material"

type Props = {
        open: boolean,
                children?: React.ReactNode,
                title: string,
                contentText: string,
  handleContinue: any,
        handleClose?:any,
}
const  CustomDialog=({ open, children, title, contentText, handleContinue,handleClose }:Props) =>{
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent> 
        <DialogContentText> 
          {contentText}
        </DialogContentText>
        {children} 
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog