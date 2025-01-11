import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import SelectCategory from "../../components/Roles/Add/SelectCategory";
import InputName from "../../components/Roles/Add/InputName";
import PermissionsList from "../../components/Roles/Add/PermissionsList";
import { baseurl } from "../../shared";

const fetchData = async (parameter) => {
  return fetch(baseurl + parameter, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export default function AddRole() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [categories, setCategories] = useState(["все"]);
  const [permissions, setPermissions] = useState([]);
  const [pageState, setPageState] = useState({
    activeCategory: "все",
    activePermissions: [],
  });

  useEffect(() => {  
    setLoading(true);
    fetchCategories();
    fetchPermissions();
    setLoading(false);
  }, []);

  const fetchCategories = async () => {
    const categoriesFromDB = await fetchData("permissions/categories");
    const allC = ["все"].concat(categoriesFromDB);
    setCategories(allC);
  };

  const fetchPermissions = async () => {
    const permissionFromDB = await fetchData("permissions");
    const permissonswWithChecked = permissionFromDB.map((el) => {
      return { ...el, checked: false };
    });
    setPageState({
      activeCategory: "все",
      activePermissions: permissonswWithChecked,
    });
    setPermissions(permissonswWithChecked);
  };
  
  const handleRoleNameChange = (value) => {
    setRoleName(value);
  };

  const handleCategoryChange = (value) => {
    if (value === "все") {
      setPageState({
        activeCategory: value,
        activePermissions: permissions,
      });
    } else {
      const newPermissions = permissions.filter(
        (perm) => perm.category == value
      );
      setPageState({
        activeCategory: value,
        activePermissions: newPermissions,
      });
    }
  };

  const handlePermissionChange = (name) => {
    const allPermissions = permissions.map((el) => {
      if (el.name == name) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });
    setPermissions(allPermissions);
    const activePermissions = pageState.activePermissions.map((el) => {
      if (el.name == name) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });
    setPageState({
      activeCategory: pageState.activeCategory,
      activePermissions: activePermissions,
    });
  };

  const clear = () => {
    setRoleName("");
    const perms = permissions.map((el) => {
      return { ...el, checked: false };
    });
    setPermissions(perms);
    setPageState({
      activeCategory: "все",
      activePermissions: perms,
    });
  };

  const handleSubmit = () => {
    const activePermissions = permissions
      .filter((el) => el.checked)
      .map((el) => el.name);
    const newRole = {
      RoleName: roleName,
      Permissions: activePermissions,
    };
    createRole(newRole);
    clear();
    console.log("new");
  };

  const createRole = async (newRole) => {
    return fetch(baseurl + "roles/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRole),
    })
      .then((response) => {
        if (response.ok) {
          setSnackbarMessage("Роль создана успешно!");
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage("Не удалось создать роль");
          setSnackbarSeverity("error");
        }
      })
      .then((data) => {
        setSnackbarOpen(true);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Добавить новую роль
      </Typography>
      <Button
      sx={{mb:2, mr:3}}
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        Добавить
      </Button>
      <Button
        sx={{mb:2}}
        variant="outlined"
        color="primary"
        onClick={() => {
          clear();
        }}
      >
        Очистить
      </Button>
      <InputName
        roleName={roleName}
        handleRoleNameChange={handleRoleNameChange}
      />
      <SelectCategory
        value={pageState.activeCategory}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <PermissionsList
        permissions={pageState.activePermissions}
        handlePermissionChange={handlePermissionChange}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
