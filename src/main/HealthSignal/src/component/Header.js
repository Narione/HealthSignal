import React, { useEffect, useState } from 'react';
import WeatherComponent from "./Weather";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();

    const [nowLoginFlag, setNowLoginFlag] = useState(false);
    const [loginNickname, setLoginNickname] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userPhoto, setUserPhoto] = useState("/images/profile/" + "white.png");

    const loginCheck = () => {
        axios.post("/api/getuserinfo")
            .then(res => {
                if (res.data === "getUserInfoFail") {
                    setNowLoginFlag(false);  // 지금 로그인중인 유저의 정보가 세션에 없을때
                } else {
                    setNowLoginFlag(true);
                    setLoginNickname(res.data.userNickname);
                    if (res.data.userPhoto == null) {
                        setUserPhoto(null);
                    } else {
                        setUserPhoto(res.data.userPhoto);
                    }
                    setUserGender(res.data.userGender);
                }
            })
    }

    //로그인 안되어있으면 이동 막기
    const loginNeed = () =>{
        if(!nowLoginFlag){
            alert("로그인이 필요한 기능입니다.");
            return;
        }
    }

    const goLogout = () => {
        axios.post("/api/logout")
            .then(res => {
                if (res.data === "logoutSuccess") {
                    setNowLoginFlag(false);
                }
            })
        alert("로그아웃 되었습니다.");
        navigate("/");
    }

    useEffect(() => {
        loginCheck();
    }, [nowLoginFlag]);



    return (
        <div className={"mt-4"}>
            {
                nowLoginFlag ?
                    <div style={{display: "flex", justifyContent: "flex-end", lineHeight:"3"}}>
                        <img
                            src={
                                // 만약 userPhoto가 없으면 성별에 따라 기본 프로필 이미지 분기
                                userPhoto ? "/images/profile/" + userPhoto : userGender === "m" ? "/images/profile/male.jpg" : "/images/profile/female.jpg"
                            }
                            className="img-fluid rounded-circle align-content-center"
                            style={{width: '50px', height: '50px', border: 'solid 1px'}}
                            alt="profile"
                        />
                        <div className="nav-link mr-3 fw-bold">{loginNickname}님</div>
                        <a className="nav-link mr-3" onClick={() => navigate("/mypage")}>내정보</a>
                        <a className="nav-link mr-3" onClick={() => goLogout()}>로그아웃</a>

                    </div>
                    :
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <a className="nav-link mr-2" onClick={() => navigate("/signin")}>로그인</a>
                        <a className="nav-link mr-4" onClick={() => navigate("/signup")}>회원가입</a>
                    </div>
            }


            <nav className="navbar main-nav navbar-expand-lg px-2 px-sm-0 py-2 py-lg-4" style={{fontSize: "16px", zIndex: "1000"}}>
                <div className="container">
                    <a className="navbar-brand" onClick={() => navigate("/")}><img src="/images/logo.png"
                                                                                   alt="logo"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="ti-menu"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" style={{marginLeft: "3em"}}>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle menu1" href="#" data-toggle="dropdown">마이시그널
                                    {/*<span><i className="ti-angle-down"></i></span>*/}
                                </a>
                                <ul className="dropdown-menu menu2">
                                    <li className="mb-3">
                                        <a className="dropdown-item" onClick={()=> {
                                            if(!nowLoginFlag){
                                                alert("로그인이 필요한 기능입니다.");
                                            }else {
                                                navigate("/monitoring");
                                            }
                                        }}>건강모니터링</a>
                                    </li>
                                    <li className="mb-3">
                                        <a className="dropdown-item" onClick={()=> {
                                            if(!nowLoginFlag){
                                                alert("로그인이 필요한 기능입니다.");
                                            }else {navigate("/healthinfo")}}}>건강정보입력</a>
                                    </li>
                                    <li className="mb-3">
                                        <a className="dropdown-item active3"  onClick={()=> {
                                            if(!nowLoginFlag){
                                                alert("로그인이 필요한 기능입니다.");
                                            }else {navigate("/habitcheck")}}}>습관체크</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown @@pages">
                                <a className="nav-link dropdown-toggle menu1" href="#" data-toggle="dropdown">건강플래너
                                    {/*<span><i className="ti-angle-down"></i></span>*/}
                                </a>
                                <ul className="dropdown-menu">

                                    <li className="mb-3">
                                        <a className="dropdown-item @@team" onClick={()=> {
                                            if(!nowLoginFlag){
                                                alert("로그인이 필요한 기능입니다.");
                                            }else {navigate("/selfcheckup")}}}>셀프검진</a></li>
                                    <li><a className="dropdown-item @@career" onClick={() => navigate("/reserve")}>병원예약</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown @@pages">
                                <a className="nav-link dropdown-toggle menu1" href="#" data-toggle="dropdown">소셜피트니스
                                    {/*<span><i className="ti-angle-down"></i></span>*/}
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="mb-3">
                                        <a className="dropdown-item @@team"  onClick={()=> {
                                            if(!nowLoginFlag){
                                                alert("로그인이 필요한 기능입니다.");
                                            }else {navigate("/certboard")}}}>인증게시판</a></li>
                                    {/*<li className="mb-3">*/}
                                    {/*    <a className="dropdown-item @@career" onClick={() => navigate("/social/ranking")}>랭킹</a></li>*/}
                                </ul>
                            </li>
                            <li className="nav-item @@contact">
                                <a className="nav-link menu1" onClick={() => navigate("/store")}>스토어</a>
                            </li>
                            <li className="nav-item @@contact">
                                <a className="nav-link menu1" onClick={()=> {
                                    if(!nowLoginFlag){
                                        alert("로그인이 필요한 기능입니다.");
                                    }else {navigate("/qna/list")}}}>고객센터</a>
                            </li>
                        </ul>

                    </div>
                    <div className="mr-5">
                        <WeatherComponent/>
                    </div>
                </div>
            </nav>

        </div>
    )
};

export default Header;
