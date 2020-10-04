import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


type xmlContent ={
    content: string| undefined;
    handleOpen:  (value: boolean) => void;
    isOpen: boolean;
}
export default function ScrollDialog({isOpen, content, handleOpen }: xmlContent) {
const [open, setOpen] = React.useState(isOpen);
  const [scroll, setScroll] = React.useState<string>('paper');



  // const handleClose = () => {
  //   setOpen(false);
  // };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      //descriptionElement && descriptionElement.focus();
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleOpen(!open)}
        scroll={"paper" }
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">RAW XML</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen(!open)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}