import "./App.css";
import EnhancedTable from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import SvgIcon from "@mui/material/SvgIcon";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SuccessModal from "./components/SuccessModal/SuccessModal";
import ResponsiveDrawer from "./components/Sidebar/Sedibar";
import { useDispatch } from "react-redux";
import { setInvoices } from "./features/invoiceSlice";
import Button from "@mui/material/Button";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";

function App() {
  const [isSuccess, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios("http://localhost:3000/data").then((res) =>
      dispatch(setInvoices(res.data))
    );
  }, [dispatch]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="App">
      <ResponsiveDrawer>
        <Box
          sx={{
            padding: "30px",
            textAlign: "right",
            border: "1px solid #ECECEE",
            borderRadius: "15px",
            ml: 5,
          }}
        >
          <Typography sx={{ textAlign: "left" }} variant="h6">
            Qaimələr
          </Typography>
          <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 3, textTransform: "capitalize", backgroundColor: "#266AEB" }}>
            <SvgIcon component={PlusIcon}></SvgIcon>
            Yeni qaimə
          </Button>
          {open && (
            <Modal setSuccess={setSuccess} open={open} setOpen={setOpen} />
          )}
          <EnhancedTable modalOpen={() => setOpen(true)} />
          <SuccessModal isSuccess={isSuccess} setOpen={setSuccess} />
        </Box>
        {/* <Alert severity="error" >This is an error alert — check it out!</Alert> */}
      </ResponsiveDrawer>
    </div>
  );
}

export default App;
