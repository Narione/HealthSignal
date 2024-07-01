import React, {useEffect, useState} from 'react';
import axios from "axios";

const Ranking = () => {

    // 세션에 저장된 유저 정보
    const [userInfo, setUserInfo] = useState({});

    const [userCity, setUserCity] = useState("");
    const [rankingList, setRankingList] = useState([]);

    useEffect(() => {
        if (userInfo !== {}) {
            setUserCity(userInfo.userCity)
        }
    }, [userInfo]);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userCity) {
            console.log(userCity);
            getRankList();
        }
    }, [userCity]);

    // 현재 세션에 접속되있는 유저의 정보 얻어오기
    const getUserInfo = () => {
        axios.post("/api/getuserinfo")
            .then(res => {
                setUserInfo(res.data);
                console.log(res.data);
            })
    }

    const getRankList = () => {
        axios.post("/api/ranklist", {
            userCity: userCity
        }).then(res => {
            console.log(res.data);
            setRankingList(res.data);
        })
    }

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <div className="title-text">
                                <h2>우리동네 월간 랭킹</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="home" role="tabpanel">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center" scope="col">순위</th>
                                            <th className="text-center" scope="col">프로필</th>
                                            <th className="text-center" scope="col">점수</th>
                                            <th style={{width:"10%"}}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rankingList.map((v, i) => {
                                                return (
                                                    <tr className="inner-box">
                                                        <th scope="row" className="align-middle">
                                                            <div className="event-date">
                                                                <div className="text-center">{i + 1}</div>
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className="text-center">
                                                                <div>
                                                                    <img
                                                                        src={
                                                                            // 만약 userPhoto가 없으면 성별에 따라 기본 프로필 이미지 분기
                                                                            v.userPhoto ? `/images/profile/${v.userPhoto}` : v.userGender === "m" ? "/images/profile/male.jpg" : "/images/profile/female.jpg"
                                                                        }
                                                                        className="img-fluid rounded-circle align-content-center"
                                                                        style={{
                                                                            width: '50px',
                                                                            height: '50px',
                                                                            border: 'solid 1px'
                                                                        }}
                                                                        alt="profile"
                                                                    />

                                                                    {v.userNickname}
                                                                </div>

                                                            </div>
                                                        </td>
                                                        <td className="text-center align-middle">
                                                            {v.totalScore}
                                                        </td>
                                                        <td>
                                                            <div className="btn btn-outline-success">
                                                                <a>상세보기</a>
                                                            </div>

                                                        </td>

                                                    </tr>
                                                )
                                            })


                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Ranking;