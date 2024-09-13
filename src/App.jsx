import "./css/App.css";

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import DocumentStatuses from "./components/general/DocumentStatuses";
import Header from "./components/general/header/Header";
import Main from "./pages/Main/Main";
import DocumentCategories from "./pages/DocumentCategories";


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
          <Route path="/documentstatuses" element={<DocumentStatuses/> } />
          <Route path="/documentcategories" element={<DocumentCategories/> } />
          <Route path="/main" element={<Main/>} />
        </Routes>
        </Header>

      </BrowserRouter>

    </LoginContext.Provider>
  );
}

export default App;
