import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Reserve = () => {
    const navigate = useNavigate()
    const findRef = useRef();

    const [userCity, setUserCity] = useState("");
    const [hospitalList, setHospitalList] = useState([]);
    const [hospitalCnt, setHospitalCnt] = useState(0);

    const [hospitalFind, setHospitalFind] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    const hospitalFindOnChangeHandler = (e) => {
        setHospitalFind(e.target.value);
        console.log(hospitalFind);
    }


// 현재 이용자의 도시 확인
    const userCityCheck = () => {
        axios.post("/api/getuserinfo")
            .then(res => {
                if (res.data === "getUserInfoFail") {
                } else {
                    setUserCity(res.data.userCity);

                }
            })
    }

    const getHospitalList = () => {
        axios.post("/api/hoslist", {
            hosCity: userCity,
            visibleCount: visibleCount,
            hosFind: hospitalFind
        }).then(res => {
            setHospitalList(res.data);
        })
    }

    const getHospitalCnt = () => {
        axios.post("/api/hoscount", {
            hosCity: userCity,
            hosFind: hospitalFind
        }).then(res => {
            setHospitalCnt(res.data);
        })
    }

    const goFindHospital = () => {
        setVisibleCount(10);
        getHospitalList();
        getHospitalCnt();

    }

    useEffect(() => {
        userCityCheck();
    }, []);

    useEffect(() => {
        if (userCity != null) {
            getHospitalList(userCity);
            getHospitalCnt(userCity);

        }
    }, [userCity, visibleCount]);



    return (

        <div>

            <section className="py-5">
                <div className="container">
                    <select value={userCity} onChange={(e) => setUserCity(e.target.value)}>
                        <option value="">전국</option>
                        <option value="강원">강원</option>
                        <option value="경기">경기</option>
                        <option value="경남">경남</option>
                        <option value="경북">경북</option>
                        <option value="광주">광주</option>
                        <option value="대구">대구</option>
                        <option value="대전">대전</option>
                        <option value="부산">부산</option>
                        <option value="서울">서울</option>
                        <option value="세종시">세종시</option>
                        <option value="울산">울산</option>
                        <option value="인천">인천</option>
                        <option value="전남">전남</option>
                        <option value="전북">전북</option>
                        <option value="제주">제주</option>
                        <option value="충남">충남</option>
                        <option value="충북">충북</option>
                    </select>
                    <input type="text" className="ml-2" ref={findRef} onChange={hospitalFindOnChangeHandler}/>
                    <button onClick={goFindHospital}>찾기</button>
                    <div className="row flex-column flex-lg-row row-cols-2">
                        {
                            hospitalList.map((v, i) => {
                                const randomNumber = Math.floor(Math.random() * 100) + 1;
                                return (
                                    <div key={i}>
                                        <div className="col mb-6 mb-lg-0">
                                            <div className="card text-center mt-5">
                                                <div>
                                                    <div className="card-img-top d-flex justify-content-center">
                                                        <img className="img-fluid mt-3"
                                                             style={{
                                                                 height: '200px',
                                                                 width: '300px'
                                                             }} // 이미지 크기 고정 (예시로 200px 높이, 300px 너비)
                                                             src={`/images/hospital/${i + randomNumber}.png`}
                                                             alt=""/>
                                                    </div>
                                                </div>
                                                <div className="card-body mx-auto">
                                                    <div style={{width: '100%'}}>
                                                        <h3 className="mt-3 mb-4">{v.hosName}</h3>
                                                    </div>
                                                    <p className="mt-3 mb-4">{v.hosCategory}</p>
                                                    <p className="mt-3 mb-4">{v.hosAddress}</p>
                                                    <p className="mt-3 mb-4">{v.hosPhone}</p>
                                                    <hr className="my-4"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-column">
                                                        <div className="d-flex align-items-center my-4">
                                                            <button className="btn btn-warning"
                                                                    onClick={() => window.open(v.hosUrl)}>방문 예약
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {hospitalCnt > visibleCount + 10 ?
                    <div className="d-flex justify-content-center my-4">
                        <button className="btn btn-success w-75"
                                onClick={() => setVisibleCount(visibleCount + 10)}>더보기
                        </button>
                    </div>
                    : null
                }


            </section>
        </div>
    );
};

export default Reserve;