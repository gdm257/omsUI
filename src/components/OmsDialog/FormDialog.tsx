import React, { ReactNode } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogProps } from '@material-ui/core/Dialog/Dialog';

type tProps = DialogProps & {
  open: boolean;
  title: string;
  content: ReactNode;
  toClose: () => any;
  todo: () => any;
};

export default function FormDialog(props: tProps) {
  const { open = false, title, content, toClose, todo } = props;
  const closeDialog = () => {
    if (toClose) {
      toClose();
    }
  };

  const determine = async () => {
    const canClose = await todo();
    console.log('canClose', canClose);
    if (canClose) {
      toClose();
    }
  };

  return (
    <Dialog {...props} open={open} onClose={closeDialog} aria-labelledby="form-dialog">
      <DialogTitle id="form-dialog">{title}</DialogTitle>
      <DialogContent>{content || null}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          取消
        </Button>
        <Button onClick={determine} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}
