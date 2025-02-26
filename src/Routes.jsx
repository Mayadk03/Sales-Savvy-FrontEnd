import { Route, Routes } from "react-router-dom";
import RegistrationPage from './RegistrationPage';
import LoginPage from "./LoginPage";
import CustomerHomePage from "./CustomerHomePage";

const AppRoutess=()=> {
    return (
        <Routes>
        <Route path='/register' element={<RegistrationPage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/customerhome" element={<CustomerHomePage />}></Route>
      </Routes>
    )
  }
  export default AppRoutess;