import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MainCard from "./MainCard";

const permissionsNames = [
  {
    name: "Create",
    info: {
      text: "К списку документов",
      description: "Перейти к просмотру хранилища документов",
      link: "/href",
    },
  },
  {
    name: "Read",
    info: {
      text: "Загрузить документы",
      description:
        "Перейти к загрузке документов в систему",
      link: "/href",
    },
  },
  {
    name: "Update",
    info: {
      text: "Обо мне",
      description: "Перейти к настройке своего аккаунта",
      link: "/href",
    },
  },
];
const buttonsDescription = [
  {
    text: "К списку документов",
    description: "Перейти к просмотру хранилища документов",
    link: "/href",
  },
  {
    text: "Загрузить документы",
    description:
      "Перейти к выбору документов и их адресатов с последующим добавлением в систему",
    link: "/href",
  },
  {
    text: "Обо мне",
    description: "Перейти к настройке своего аккаунта",
    link: "/href",
  },
  {
    text: "Пользователи",
    description:
      "Перейти к редактированию аккаунтов существующих пользователей и созданию новых ",
    link: "/href",
  },
  {
    text: "Категории документов",
    description:
      "Перейти к редактированию справочной информации о категориях документов",
    link: "/href",
  },
  {
    text: "Статусы документов",
    description:
      "Перейти к редактированию справочной информации о статусах документов",
    link: "/href",
  },
  {
    text: "Роли",
    description: "Перейти к редактированию ролей и разрешений для них",
    link: "/href",
  },
];

export default function Main() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mt: 15,
        pb: 10,
      }}
    >

      {permissionsNames.map((perm) => {
        return(  localStorage.getItem("permissions").includes(perm.name) ? <MainCard props={perm.info} /> : null);
    //    localStorage.getItem("permissions").includes(perm.name) ? (
      //    return (<MainCard props={perm.info} />);
       // ) : null;
      })}
    </Stack>
  );
}
