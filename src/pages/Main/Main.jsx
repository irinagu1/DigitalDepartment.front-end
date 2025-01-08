import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MainCard from "./MainCard";
import { useContext } from "react";
import { LoginContext } from "../../App";
import { Navigate } from "react-router-dom";

const permissionsNames = [
  {
    name: "Просмотр пользователей",
    info: {
      text: "К списку документов",
      description: "Перейти к просмотру хранилища документов",
      link: "/alldocuments",
    },
  },
  {
    name: "Просмотр пользователей",
    info: {
      text: "Загрузить документы",
      description: "Перейти к загрузке документов в систему",
      link: "/sendmessage",
    },
  },
  {
    name: "Просмотр пользователей",
    info: {
      text: "Обо мне",
      description: "Просмотреть информацию о себе",
      link: "/users/about",
    },
  },
];
const extraPermissionsNames = [
  {
    name: "Архивирование документов",
    info: {
      text: "Пользователи",
      description: "Перейти к просмотру пользователей",
      link: "/users",
    },
  },
  {
    name: "Архивирование документов",
    info: {
      text: "Роли",
      description: "Перейти к просмотру ролей для пользователей",
      link: "/roles",
    },
  },
  {
    name: "Архивирование документов",
    info: {
      text: "Справочник категорий документов",
      description: "Перейти к просмотру справочника категорий документов",
      link: "/documentcategories",
    },
  },
  {
    name: "Архивирование документов",
    info: {
      text: "Справочник статусов документов",
      description: "Перейти к просмотру справочника статусов документов",
      link: "/documentstatuses",
    },
  },
  {
    name: "Архивирование документов",
    info: {
      text: "Справочник должностей сотрудников",
      description: "Перейти к просмотру справочника должностей",
      link: "/positions",
    },
  },
 /* {
    name: "Просмотр пользователей",
    info: {
      text: "Архив",
      description: "Перейти в архив документов",
      link: "/users",
    },
  },*/
];

export default function Main() {
  const [logged, setLogged] = useContext(LoginContext);

  const usersActions = logged
    ? permissionsNames
        .map((perm) => {
          return localStorage.getItem("permissions").includes(perm.name) ? (
            <MainCard key={perm.info.text} props={perm.info} />
          ) : null;
        })
        .filter((el) => el !== null)
    : null;

  const adminActions = logged
    ? extraPermissionsNames
        .map((perm) => {
          return localStorage.getItem("permissions").includes(perm.name) ? (
            <MainCard key={perm.info.text} props={perm.info} />
          ) : null;
        })
        .filter((el) => el !== null)
    : null;

  const extraPart = logged ? (
    adminActions.length !== 0 ? (
      <>
        <Typography sx={{ color: "primary.main" }}>
          Дополнительные возможности:
        </Typography>
        {adminActions}
      </>
    ) : null
  ) : null;
  return (
    <>
      {logged ? (
        <>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mt: 2,
              pb: 10,
            }}
          >
            <Typography sx={{ color: "primary.main" }}>Меню</Typography>
            {usersActions}
            {extraPart}
          </Stack>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
