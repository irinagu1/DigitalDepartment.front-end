import "./css/App.css";

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";

import Header from "./components/general/header/Header";
import Main from "./pages/Main/Main";
import DocumentCategories from "./pages/DocumentCategories";
import SendMessage from "./pages/SendMessage/SendMessage";
import AllDocuments from "./pages/AllDocuments";
import AllRoles from "./pages/Roles/AllRoles";
import AddRole from "./pages/Roles/AddRole";
import UpdateRole from "./pages/Roles/UpdateRole";
import AllUsers from "./pages/Users/AllUsers";
import AddUser from "./pages/Users/AddUser";
import UpdateUser from "./pages/Users/UpdateUser";
import DocumentStatuses from "./pages/DocumentStatuses";
import ChangePassword from "./pages/Users/ChangePassword";
import DocumentsActions from "./pages/DocumentsActions";
import DocumentReport from "./pages/DocumentReport";
import AboutUser from "./components/Users/AboutUser";
import AllPositions from "./pages/Positions/AllPositions";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.accessToken ? true : false
  );

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
            <Route path="/sendmessage" element={<SendMessage />} />
            <Route path="/documentstatuses" element={<DocumentStatuses />} />
            <Route
              path="/documentcategories"
              element={<DocumentCategories />}
            />
            <Route path="/alldocuments" element={<AllDocuments />} />
            <Route path="/roles" element={<AllRoles />} />
            <Route path="/roles/add" element={<AddRole />} />
            <Route path="/roles/update" element={<UpdateRole />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/about" element={<AboutUser />} />
            <Route path="/users/update" element={<UpdateUser />} />
            <Route path="users/password" element={<ChangePassword />} />
            <Route path="/alldocuments/info" element={<DocumentsActions />} />
            <Route path="/document/report" element={<DocumentReport />} />
            <Route path="/positions" element={<AllPositions />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
