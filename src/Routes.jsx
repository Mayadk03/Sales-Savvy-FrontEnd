import { Route, Routes } from "react-router-dom";
import RegistrationPage from './RegistrationPage';
import LoginPage from "./LoginPage";
import CustomerHomePage from "./CustomerHomePage";
import AdminDashBoard from "./AdminDashBoard";

const AppRoutess=()=> {
    return (
        <Routes>
        <Route path='/register' element={<RegistrationPage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/customerhome" element={<CustomerHomePage />}></Route>
        <Route path="/adminhome" element={<AdminDashBoard />}></Route>
      </Routes>
    )
  }
  export default AppRoutess;