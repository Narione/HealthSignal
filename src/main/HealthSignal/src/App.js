import './App.css';
import Home from "./pages/home";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import SignUp from "./pages/login/signUp";
import Header from "./component/Header";

import Store from "./pages/store/store";
import MyPage from "./pages/login/myPage";
import SignIn from "./pages/login/signIn";
import HabitCheck from "./pages/mySignal/habitCheck";
import QnaList from "./pages/qna/list";
import QnaView from "./pages/qna/view";
import UserAdd from "./pages/qna/userAdd";
import AdminUpdate from "./pages/qna/adminUpdate";
import AdminAdd from "./pages/qna/adminAdd";
import Reserve from "./pages/planner/reserve";
import Ranking from "./pages/social/ranking";
import HealthInfo from "./pages/mySignal/healthInfo";

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
                <Route path="/reserve" element={<Reserve/>}/>
                <Route path="/habitcheck" element={<HabitCheck/>}/>
                <Route path="/qna/list" element={<QnaList/>} />
                <Route path="/qna/view/:queNo" element={<QnaView/>} />
                <Route path="/qna/user/add" element={<UserAdd/>} />
                <Route path="/qna/admin/add/:queNo" element={<AdminAdd/>} />
                <Route path="/qna/admin/update" element={<AdminUpdate/>} />
                <Route path="/social/ranking" element={<Ranking/>} />
                <Route path="/healthinfo" element={<HealthInfo/>} />
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