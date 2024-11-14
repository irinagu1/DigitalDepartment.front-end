import { useEffect, useState } from "react";
import { baseurl } from "../../../../shared";
import { IconButton, MenuItem, Select } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

const fetchData = async (parameter) => {
  const dataName =
    parameter == "status" ? "documentstatuses" : "documentcategories";
  return fetch(baseurl + dataName, {
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

export default function MyPropsList(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    const fetchInfo = async () => {
      const infoFromDB = await fetchData(props.parameter);
      setList(infoFromDB);
    };

    fetchInfo();
    setLoading(false);
  }, []);

  useEffect(() => {
    const newObj = list.filter((e) => e.id === value);
    const newName =
      newObj[0] !== undefined && newObj[0].name ? newObj[0].name : "";
    props.handleUpdate(props.parameter, newName);
  }, [value]);

  const handleChange = (info) => {
    setValue(info);
  };
  return (
    <>
      {!loading && list.length !== 0 ? (
        <Select
          fullWidth
          key={list[0].id}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={value}
        >
          <IconButton onClick={() => setValue("")}>
            <ClearIcon />
          </IconButton>{" "}
          {list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <p>wait</p>
      )}
    </>
  );
}
