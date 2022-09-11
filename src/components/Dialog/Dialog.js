import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import {  useDispatch } from "react-redux";
import { removeInvoice } from "../../features/invoiceSlice";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    borderRadius: "16px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    borderRadius: "16px",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, border: "none", boxShadow: "none" }}
      {...other}
    >
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

export default function DialogModal(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", border: "none" }}
        >
          <Box
            sx={{
              height: 50,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Qaiməni silməyinizə əminsiniz?</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            height: 50,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "70px"
          }}
        >
          <Button sx={{ width: 158, textTransform: "capitalize" }} variant="outlined" onClick={handleClose}>
            İmtina et
          </Button>
          <Button
            sx={{ width: 158, textTransform: "capitalize", backgroundColor: "#266AEB" }}
            variant="contained"
            onClick={() => {
              // removeRow(id);
              dispatch(removeInvoice());
              handleClose();
            }}
          >
            Sil
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
