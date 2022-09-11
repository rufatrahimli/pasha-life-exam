import { useState } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Divider, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogModal from "../Dialog/Dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedInvoice,
  changeInvoiceStatus,
} from "../../features/invoiceSlice";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import { ReactComponent as StatusIcon } from "../../assets/status.svg";


export default function DataTable(props) {
  // const { data } = props;
  const [isChangeStatus, setChangeStatus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const { modalOpen } = props;
  const data = useSelector((state) => state.invoice.invoices);
  const columns = [
    { field: "invoice", headerName: "Qaimə №", width: 180, flex: 1 },
    { field: "client", headerName: "Müştəri", width: 180, flex: 1 },
    { field: "itemAmount", headerName: "Məhsul sayı", width: 180, flex: 1 },
    {
      field: "sum",
      headerName: "Toplam məbləğ",
      flex: 1,
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (props) => {
        switch (props.row.status) {
          case "təstiqlənib":
            return (
              <Box
                sx={{
                  backgroundColor: "#ECFDF3",
                  borderRadius: 24,
                  padding: "6px 12px",
                }}
              >
                <Typography color={"#488C6E"}> {props.row.status}</Typography>
              </Box>
            );

          case "gözləyir":
            return (
              <Box
                sx={{
                  backgroundColor: "#FFFAE8",
                  borderRadius: 24,
                  padding: "6px 12px",
                }}
              >
                <Typography color={"#E0B300"}> {props.row.status}</Typography>
              </Box>
            );

          case "xitam olunub":
            return (
              <Box
                sx={{
                  backgroundColor: "#FFF7F6",
                  borderRadius: 24,
                  padding: "6px 12px",
                }}
              >
                <Typography color={"#FF463D"}> {props.row.status}</Typography>
              </Box>
            );

          default:
            break;
        }
        return <Typography color={"red"}> {props.row.status}</Typography>;
      },
    },
    {
      field: "action",
      sortable: false,
      headerName: "Action",
      width: 100,
      renderCell: (props) => (
        <BasicMenu
          {...props}
          modalOpen={modalOpen}
          removeRow={setToRemove}
          setSelectedRow={setSelectedRow}
          setShowDialog={setShowDialog}
          isChangeStatus={isChangeStatus}
          setChangeStatus={setChangeStatus}
        />
      ),
    },
  ];


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <StatusModal
        isChangeStatus={isChangeStatus}
        setChangeStatus={setChangeStatus}
        selectedRow={selectedRow}
      />
      <DialogModal
        open={showDialog}
        setOpen={setShowDialog}
        id={toRemove}
      />
    </div>
  );
}

function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SvgIcon component={MenuIcon}></SvgIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(setSelectedInvoice(props.row));
            props.modalOpen();
            handleClose();
          }}
        >
        <SvgIcon component={EditIcon} sx={{mr:2}}></SvgIcon>

          Düzəliş et
        </MenuItem>
        <Divider/>
        <MenuItem
          onClick={() => {
            dispatch(setSelectedInvoice(props.row));
            props.removeRow(props.id);
            props.setShowDialog(true);
            handleClose();
          }}
        >
        <SvgIcon component={TrashIcon} sx={{mr:2}}></SvgIcon>

          Sil
        </MenuItem>
        <Divider/>

        <MenuItem
          onClick={() => {
            dispatch(setSelectedInvoice(props.row));
            props.setChangeStatus(true);
            props.setSelectedRow(props.row);
            handleClose();
          }}
        >
        <SvgIcon component={StatusIcon} sx={{mr:2}}></SvgIcon>

          Statusu dəyiş
        </MenuItem>
      </Menu>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function StatusModal(props) {
  const { isChangeStatus, setChangeStatus } = props;
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setChangeStatus(false);
  };

  const selectStatus = (e) => {
    setSelectedStatus(e.target.textContent);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isChangeStatus}
      maxWidth={"xl"}
    >
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            textAlign: "center",
            justifyContent: "space-between",
            padding: "30px",
            height: "200px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ECFDF3",
              borderRadius: 24,
              padding: "6px 12px",
              border:
                selectedStatus === "təstiqlənib" ? "1px solid #488C6E" : "none",
              cursor: "pointer",
            }}
            onClick={(e) => selectStatus(e)}
          >
            <Typography color={"#488C6E"}>təstiqlənib</Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#FFFAE8",
              borderRadius: 24,
              padding: "6px 12px",
              border:
                selectedStatus === "gözləyir" ? "1px solid #E0B300" : "none",
              cursor: "pointer",
            }}
            onClick={(e) => selectStatus(e)}
          >
            <Typography color={"#E0B300"}>gözləyir</Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#FFF7F6",
              borderRadius: 24,
              padding: "6px 12px",
              boxSizing: "border-box",
              border:
                selectedStatus === "xitam olunub"
                  ? "1px solid #FF463D"
                  : "none",
              cursor: "pointer",
            }}
            onClick={(e) => selectStatus(e)}
          >
            <Typography color={"#FF463D"}>xitam olunub</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: "20px",
        }}
      >
        <Button
          sx={{ width: "100px", mr: 1, textTransform: "capitalize", }}
          variant="outlined"
          onClick={handleClose}
        >
          İmtina
        </Button>
        <Button
          sx={{ width: "100px", textTransform: "capitalize", backgroundColor: "#266AEB"  }}
          variant="contained"
          onClick={() => {
            dispatch(changeInvoiceStatus(selectedStatus));
            handleClose();
          }}
        >
          Təstiqlə
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
