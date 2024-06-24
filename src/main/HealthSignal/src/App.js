import './App.css';
import Home from "./pages/home";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import SignUp from "./pages/login/signUp";
import Header from "./component/Header";

import Store from "./pages/store/store";
import MyPage from "./pages/login/myPage";
import SignIn from "./pages/login/signIn";
import HabitCheck from "./pages/mySignal/habitCheck";
import NoticeList from "./pages/customer/notice/list";
import NoticeView from "./pages/customer/notice/view";
import QnaList from "./pages/customer/qna/list";
import QnaView from "./pages/customer/qna/view";
import UserAdd from "./pages/customer/qna/userAdd";

function App() {

    const location = useLocation();
    const hideHeaderRoutes = ['/signup','/signin'];


    return (
        <>
            {!hideHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/store" element={<Store/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/habitcheck" element={<HabitCheck/>}/>
                <Route path="/notice/list" element={<NoticeList/>}/>
                <Route path="/notice/view/:ntcNo" element={<NoticeView/>}/>
                <Route path="/qna/list" element={<QnaList/>} />
                <Route path="/qna/view" element={<QnaView/>} />
                <Route path="/qna/user/add" element={<UserAdd/>} />
                {/*<Route path="/login" element={<Login/>}/>*/}


            </Routes>
        </>
    )
}

const MainApp = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default MainApp;