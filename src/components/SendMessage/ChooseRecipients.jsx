import { useEffect, useReducer, useState } from "react";
import { baseurl } from "../../shared";
import ChooseElement from "./ChooseElement";
import { PropaneSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeRoles": {
      return { roles: action.newRoles, users: state.users };
    }
    case "changeUsers":
      {
        return { roles: state.roles, users: action.newUsers };
      }
      defalut: {
        return state;
      }
  }
};

export default function ChooseRecipients(props) {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, { roles: [], users: [] });
  useEffect(() => {
    fetchInformation();
  }, []);
  useEffect(() => {
    props.recipientsChange(state);
  }, [state]);

  const fetchInformation = async () => {
    const resultRoles = await fetch(baseurl + "roles");
    const allRoles = await resultRoles.json();
    const justRoles = allRoles.map((el) => ({ id: el.id, name: el.name }));

    const resultUsers = await fetch(baseurl + "users");
    const allUsers = await resultUsers.json();
    const justUsers = allUsers.map((el) => ({ id: el.id, name: el.userName }));

    setRoles(justRoles);
    setUsers(justUsers);
    setLoading(false);
  };

  function changeUsers(newUsers) {
    dispatch({ type: "changeUsers", newUsers: newUsers });
  }

  function changeRoles(newRoles) {
    dispatch({ type: "changeRoles", newRoles: newRoles });
  }
  return (
    <>
      <Typography>Роли:</Typography>
      <ChooseElement
        content="Роль"
        data={roles}
        loading={loading}
        handleChange={changeRoles}
      ></ChooseElement>
      <Typography> Отдельные пользователи:</Typography>
      <ChooseElement
        content="Пользователь"
        data={users}
        loading={loading}
        handleChange={changeUsers}
      ></ChooseElement>
    </>
  );
}
