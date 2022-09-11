import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { addInvoice } from "../../features/invoiceSlice";
import {
  setSelectedInvoice,
  updateSelectedInvoiceItems,
} from "../../features/invoiceSlice";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

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
    <DialogTitle sx={{ m: 0, p: 2 , color:"#266AEB" }} {...other}>
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

export default function CustomizedDialogs(props) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { open, setOpen, setSuccess } = props;

  let selectedInvoice = useSelector((state) => state.invoice?.selectedInvoice);
  const invoices = useSelector((state) => state.invoice?.invoices);
  const dispatch = useDispatch();
  const columns = [
    { field: "name", headerName: "Məhsul adı", width: 180 },
    {
      field: "client",
      headerName: "Miqdar",
      width: 180,
      renderCell: (props) => (
        <TextField
          id="outlined-number"
          variant="standard"
          type="number"
          align="center"
          value={props.row.amount}
          onChange={(e) => {
            if (e.target.value <= 0) return;
            if (e.target.value > selectedProduct.amount) return;
            props.row.sum = props.row.price * +e.target.value;
            if (e.target.value < props.row.amount) {
              setTotalAmount((prevState) => prevState - +props.row.price);
            } else {
              setTotalAmount((prevState) => prevState + +props.row.price);
            }
            props.row.amount = +e.target.value;
          }}
          InputProps={{
            sx: {
              "& input": {
                textAlign: "center",
              },
            },
          }}
          sx={{ width: 80, textAlign: "center" }}
        />
      ),
    },
    { field: "price", headerName: "Qiymət", width: 180 },
    {
      field: "sum",
      headerName: "Toplam məbləğ",
      width: 280,
      align: "left",
    },
    {
      field: "action",
      sortable: false,
      headerName: "Əmrlər",
      renderCell: (props) => <BasicMenu onDelete={removeProduct} row={props} />,
      width: 180,
    },
  ];

  const handleClose = () => {
    dispatch(setSelectedInvoice({}));
    setOpen(false);
  };

  const removeProduct = (id) => {
    const filteredProducts = selectedProducts.filter(
      (product) => product.id !== id
    );
    setSelectedProducts(filteredProducts);
  };

  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    axios("http://localhost:3000/products").then((res) =>
      setProducts(res.data)
    );
  }, []);

  useEffect(() => {
    if (selectedInvoice && selectedInvoice?.invoiceItems?.length > 0) {
      const clone = [
        ...selectedInvoice.invoiceItems.map((item) => {
          return { ...item };
        }),
      ];
      setSelectedProducts(clone);
    }
  }, [selectedInvoice]);

  useEffect(() => {
    let sum = 0;
    selectedProducts.forEach((product) => (sum += product.sum));
    setTotalAmount(sum);
  }, [selectedProducts]);

  const handleAddProduct = () => {
    const obj = {
      name: selectedProduct.label,
      price: selectedProduct.price,
      amount: 1,
      sum: selectedProduct.price,
      id: selectedProducts.length + 1,
    };
    let isExistedProduct = selectedProducts.some(
      (product) => product.name === selectedProduct.label
    );
    if (isExistedProduct) {
      const newSelectedProducts = selectedProducts.map((product) => {
        if (product.name === selectedProduct.label) {
          if (product.amount === selectedProduct.amount) return product;
          product.amount += 1;
          product.sum = product.amount * product.price;
        }
        return product;
      });
      setSelectedProducts(newSelectedProducts);
      return;
    }
    setSelectedProducts((prevState) => [...prevState, obj]);
  };
  return (
    <>
      <BootstrapDialog
        maxWidth={"xl"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Qaimə
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
              disablePortal
              onChange={(e, value) => setSelectedUser(value)}
              disabled={
                selectedInvoice &&
                selectedInvoice?.invoiceItems?.length > 0 &&
                true
              }
              value={
                selectedInvoice && selectedInvoice?.invoiceItems?.length > 0
                  ? selectedInvoice.client
                  : ""
              }
              id="combo-box-demo"
              sx={{ width: 450, mr: 3 }}
              options={users}
              renderInput={(params) => (
                <TextField {...params} label="Müştəri" />
              )}
            />
            <Autocomplete
              disablePortal
              onChange={(e, value) => setSelectedProduct(value)}
              id="combo-box-demo"
              sx={{ width: 450, mr: 3 }}
              options={products}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  key={option.id}
                  {...props}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ display: "block", width: "50%" }}
                  >{`${option.label} (${option.amount} ədəd)`}</Typography>
                  <Typography
                    sx={{ display: "block", width: "50%" }}
                    align="right"
                  >{`${option.price} AZN`}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Məhsulun adı" />
              )}
            />
            <Button
              variant="contained"
              sx={{ borderRadius: "8px", width: "75px", backgroundColor: "#266AEB" }}
              onClick={handleAddProduct}
            >
              <SvgIcon component={PlusIcon}></SvgIcon>
            </Button>
          </Box>
          <Box sx={{ mt: 10 }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={selectedProducts}
                columns={columns}
                // rowsPerPageOptions={[5]}
                rowHeight={80}
              />
            </div>
            <Typography>Toplam {totalAmount}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: 158, textTransform: "capitalize", }}
            variant="outlined"
            onClick={() => {
              setSelectedProducts([]);
              handleClose();
            }}
          >
            İmtina et
          </Button>
          <Button
            sx={{  width: 158, textTransform: "capitalize", backgroundColor: "#266AEB" }}
            variant="contained"
            onClick={() => {
              const itemAmount = selectedProducts.reduce(
                (prev, product) => prev + product.amount,
                0
              );
              const newObj = {
                client: selectedUser.label,
                id: invoices.length + 1,
                invoice: 123456,
                itemAmount: itemAmount,
                status: "gözləyir",
                sum: totalAmount,
                invoiceItems: selectedProducts,
              };
              if (
                selectedInvoice &&
                selectedInvoice?.invoiceItems?.length > 0
              ) {
                dispatch(
                  updateSelectedInvoiceItems({
                    itemAmount: itemAmount,
                    sum: totalAmount,
                    invoiceItems: selectedProducts,
                  })
                );
              } else {
                dispatch(addInvoice(newObj));
              }
              setSelectedProducts([]);
              handleClose();
              setSuccess(true);
            }}
          >
            Yadda saxla
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem onClick={() => props.onDelete(props.row.id)}>Sil</MenuItem>
      </Menu>
    </div>
  );
}
