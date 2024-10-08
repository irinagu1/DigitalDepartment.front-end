import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import { baseurl } from "../../shared";

import MainForm from "../../components/SendMessage/MainForm";
import StyledContainer from "../../components/StyledContainer";
import { Typography } from "@mui/material";

export default function SendMessage() {
  return (
    <StyledContainer>
      <Typography variant="h4" align="center">
        Создание документов
      </Typography>
      <MainForm></MainForm>
    </StyledContainer>
  );
}
