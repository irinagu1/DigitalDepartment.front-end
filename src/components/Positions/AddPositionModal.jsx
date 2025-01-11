import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Input } from "@mui/material";
import { styled } from "@mui/system";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(3),
  width: "400px",
  outline: "none",
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

const ModalBody = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ModalActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export default function AddPositionModal(props) {
  const [name, setName] = useState("");

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const create = () => {
    setShow(false);
    setName("");
    props.newPosition(name);
  };
  return (
    <>
      <StyledModal open={props.show} onClose={handleClose}>
        <StyledBox>
          <ModalHeader>
            <Typography variant="h6" component="h2">
              Новая должность
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography variant="h6" component="h6">
              Имя
            </Typography>
            <div>
              <Input
                id="name"
                type="text"
                value={name}
                placeholder="Имя..."
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </ModalBody>
          <ModalActions>
            <Button
              onClick={props.toggleShow}
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Отмена
            </Button>
            <Button
              onClick={create}
              form="editmodal"
              color="primary"
              variant="contained"
            >
              Создать
            </Button>
          </ModalActions>
        </StyledBox>
      </StyledModal>
      <Button
        onClick={props.toggleShow}
        sx={{ borderRadius: 28 }}
        variant="contained"
        endIcon={<AddCircleOutlineOutlined />}
      >
        Добавить должность
      </Button>
    </>
  );
}
