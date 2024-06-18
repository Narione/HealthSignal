import React, { useEffect, useState } from 'react';
import WeatherComponent from "./Weather";

const Header = () => {

    return (
        <>
            <div style={{display: "flex", justifyContent: "flex-end"}}>

                <a className="nav-link menu1" href="contact.html">내정보</a>
                <a className="nav-link menu1" href="contact.html">회원가입</a>
            </div>
            <nav className="navbar main-nav navbar-expand-lg px-2 px-sm-0 py-2 py-lg-4" style={{fontSize: "16px"}}>
                <div className="container">
                    <a className="navbar-brand" href="index.html"><img src="images/logo.png" alt="logo"/></a>
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
                                        <a className="dropdown-item active" href="index.html">건강모니터링</a>
                                    </li>
                                    <li className="mb-3">
                                        <a className="dropdown-item" href="homepage-2.html">건강정보입력</a>
                                    </li>
                                    <li className="mb-3">
                                        <a className="dropdown-item active3" href="homepage-3.html">습관체크</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item active3" href="homepage-4.html">AI Helper</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown @@pages">
                                <a className="nav-link dropdown-toggle menu1" href="#" data-toggle="dropdown">건강플래너
                                    {/*<span><i className="ti-angle-down"></i></span>*/}
                                </a>
                                <ul className="dropdown-menu">

                                    <li className="mb-3">
                                        <a className="dropdown-item @@team" href="team.html">셀프검진</a></li>
                                    <li><a className="dropdown-item @@career" href="career.html">병원예약</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown @@pages">
                                <a className="nav-link dropdown-toggle menu1" href="#" data-toggle="dropdown">소셜피트니스
                                    {/*<span><i className="ti-angle-down"></i></span>*/}
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="mb-3">
                                        <a className="dropdown-item @@team" href="team.html">인증게시판</a></li>
                                    <li className="mb-3">
                                        <a className="dropdown-item @@career" href="career.html">랭킹</a></li>
                                    <li><a className="dropdown-item @@career" href="career.html">소셜채팅</a></li>
                                </ul>
                            </li>
                            <li className="nav-item @@contact">
                                <a className="nav-link menu1" href="contact.html">스토어</a>
                            </li>
                            <li className="nav-item @@contact">
                                <a className="nav-link menu1" href="contact.html">고객센터</a>
                            </li>
                        </ul>

                    </div>

                <WeatherComponent/>
                </div>
            </nav>

        </>
    )
};

export default Header;
