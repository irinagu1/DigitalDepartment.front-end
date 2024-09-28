import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const fetchData = async (url, params) => {
  const appendix = params !== undefined ? params : "";
  const path = baseurl + url + appendix;
  return fetch(path, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export default function UpdateRole() {
  const location = useLocation();
  const { state } = location;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [role, setRole] = useState("");
  const [permissionsForView, setPermissionsForView] = useState([]);

  const [categories, setCategories] = useState(["all"]);
  const [pageState, setPageState] = useState({
    activeCategory: "all",
    activePermissions: [],
  });

  useEffect(() => {
    fetchCategories();
    fetchRole();
    /* fetchOriginalPermissions();
    fetchAllPermissions();*/
    setPerms();
  }, []);

  const fetchRole = async () => {
    const roleFromDb = await fetchData("roles/GetById", "?roleId=" + state.id);
    console.log(roleFromDb);
    setRole(roleFromDb);
  };
  const fetchCategories = async () => {
    const categoriesFromDB = await fetchData("permissions/categories");
    setCategories(categories.concat(categoriesFromDB));
  };

  const setPerms = async () => {
    const permsForRoleFromDb = await fetchData(
      "permissions/GetByRoleId",
      "?roleId=" + state.id
    );
    const permsFromDb = await fetchData("permissions");
    const permsForView = permsFromDb.map((p) => {
      if (permsForRoleFromDb.find((el) => el.name == p.name)) {
        return { ...p, checked: true };
      } else {
        return { ...p, checked: false };
      }
    });
    setPermissionsForView(permsForView);
    setPageState({
      activeCategory: "all",
      activePermissions: permsForView,
    });
  };

  const handleRoleNameChange = (value) => {
    const newRole = {
      ...role,
      name: value,
      normalizedName: value.toUpperCase(),
    };
    setRole(newRole);
  };

  const handleCategoryChange = (value) => {
    if (value === "all") {
      setPageState({
        activeCategory: value,
        activePermissions: permissionsForView,
      });
    } else {
      const newPermissions = permissionsForView.filter(
        (perm) => perm.category == value
      );
      setPageState({
        activeCategory: value,
        activePermissions: newPermissions,
      });
    }
  };

  const handlePermissionChange = (name) => {
    const allPermissions = permissionsForView.map((el) => {
      if (el.name == name) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });
    setPermissionsForView(allPermissions);
    const activePermissions = pageState.activePermissions.map((el) => {
      if (el.name == name) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });
    console.log(activePermissions);
    setPageState({
      activeCategory: pageState.activeCategory,
      activePermissions: activePermissions,
    });
  };

  const handleSubmit = () => {
    const activePermissions = permissionsForView
      .filter((el) => el.checked)
      .map((el) => el.name);
    const newRole = {
      RoleName: role.name,
      Permissions: activePermissions,
    };
    updateRole(newRole);
    console.log("new");
  };

  const updateRole = async (newRole) => {
    return fetch(baseurl + "roles/update?roleId=" + role.id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRole),
    })
      .then((response) => {
        if (response.ok) {
          setSnackbarMessage("Роль обновлена успешно!");
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage("Не удалось обновить роль");
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
        Update Role
      </Typography>
      <InputName
        roleName={role.name}
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
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          handleSubmit();
        }}
      >
        Update
      </Button>
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
