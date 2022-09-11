import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import logo from "../../assets/success.svg";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, color:"#266AEB" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function SuccessModal(props) {
  const {isSuccess, setOpen} = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isSuccess}
        maxWidth={"xl"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Uğurlu əməliyyat
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: 800, display: "flex" , flexDirection: "column", textAlign: "center"}}>
            <img
              src={logo}
              style={{margin: "auto", display: "block"}}
              alt="success"
            />
            <Typography variant="h5" sx={{my: 5}}>Qaimə əməliyyatınız uğurla tamamlanmışdır!</Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
