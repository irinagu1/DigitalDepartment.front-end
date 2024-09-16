import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState, useContext } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddDocumentCategoryModal(props) {
  const [name, setName] = useState("");

  const [show, setShow] = useState(props.show);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={props.toggleShow}
        className="block mx-auto px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Add
      </Button>

      <Modal
        open={props.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Contact Details
          </Typography>

            <form
              onSubmit={(e) => {
                handleClose();
                setName("");
                e.preventDefault();
                props.newDocCategory(name);
              }}
              id="editmodal"
            >
              <div >
                <div>
                  <label>
                    Name
                  </label>
                </div>
                <div >
                  <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="New name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
            <button
                        className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                        onClick={props.toggleShow}
                    >
                        Close
                    </button>
                    <button 
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        form="editmodal"
                    >
                        Add
                    </button>
        </Box>
      </Modal>
    </>
  );
}
