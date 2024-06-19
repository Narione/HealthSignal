import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const MyPage = () => {
    const uploadBtn = useRef();
    const navigate = useNavigate();

    // 세션에 저장된 유저 정보
    const [userInfo, setUserInfo] = useState({});

    const [userNo, setUserNo] = useState(0);
    const [userNickname, setUserNickname] = useState("");
    const [userLikeTime, setUserLikeTime] = useState("");
    const [userLikeActivity, setUserLikeActivity] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [userPhoto, setUserPhoto] = useState("/images/profile/saryo.jpg");
    // 첨부파일 관련
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState("");

    const nicknameOnChangeHandler = useCallback((e) => {
        setUserNickname(e.target.value);
    }, []);
    const likeTimeOnChangeHandler = useCallback((e) => {
        setUserLikeTime(e.target.value);
    }, []);
    const activityOnChangeHandler = useCallback((e) => {
        setUserLikeActivity(e.target.value);
    }, []);
    const messageOnChangeHandler = useCallback((e) => {
        setUserMessage(e.target.value);
    }, []);

    const fileOnChangeHandler = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo != {}) {
            setUserNo(userInfo.userNo);
            setUserNickname(userInfo.userNickname);
            setUserLikeTime(userInfo.userLiketime);
            setUserLikeActivity(userInfo.userLikeactivity);
            setUserMessage(userInfo.userMessage);
        }

    }, [userInfo]);

    // useEffect(() => {
    //     if (!selectedFile) {
    //         uploadSelectFile()
    //     }
    // }, [selectedFile]);

    // 현재 세션에 접속되있는 유저의 정보 얻어오기
    const getUserInfo = () => {
        axios.post("api/getuserinfo")
            .then(res => {
                setUserInfo(res.data);
                console.log(res.data)
            })
    }

    const goProfileUpdate = () => {
        axios.post("api/update/profile", {
            userNo: userNo,
            userNickname: userNickname,
            userLiketime: userLikeTime,
            userLikeactivity: userLikeActivity,
            userMessage: userMessage
        }).then(res => {
            if (res.data === "updateProfileSuccess") {
                alert("프로필 정보가 업데이트 되었습니다.");
                navigate("/mypage");
                window.location.reload();
            }
        })
    }

    const goClickUpload = () => {
        uploadBtn.current.click();
    }
    const uploadSelectFile = () => {
        // const formData = new FormData();
        // formData.append("file", selectedFile);
        //
        // axios.post("/api/file/upload", formData, {
        //     headers: {
        //         'Content-Type':'multipart/form-data'
        //     }
        // }).then(res => {
        //     console.log(res.data);
        // });
        console.log(selectedFile);
        encodeFileToBase64(selectedFile);


    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setUserPhoto(reader.result);
                resolve();
            };
        });
    };


    return (

        <section className="bg-light py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row gy-4 gy-lg-0">
                    <div className="col-12 col-lg-4 col-xl-3">
                        <div className="row gy-4">
                            <div className="col-12">
                                <div className="card widget-card border-light shadow-sm"  >

                                    <div className="card-body">
                                        <div className="text-center">
                                            <img
                                                // src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-19/ic_user-1.png"
                                                src={userPhoto}
                                                className="img-fluid rounded-circle align-content-center"
                                                style={{width: '200px', height: '200px', border:'solid 1px'}}
                                                alt="profile"
                                            />

                                            <h5 className="text-center mb-1 mt-3">{userNickname}</h5>
                                        </div>


                                        <ul className="list-group list-group-flush mb-4">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">랭킹</h6>
                                                <span>28</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">친구 수</h6>
                                                <span>42</span>
                                            </li>
                                        </ul>
                                        <div className="d-grid m-0 text-center">
                                            <form>
                                                <input type="file" id="fileInput" style={{display:"none"}} onChange={fileOnChangeHandler} ref={uploadBtn} accept=".jpg, .png, .gif"/>
                                                <button className="btn btn-outline-primary" type="button" onClick={goClickUpload}>프로필 이미지 수정</button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-8">
                        <div className="card widget-card border-light shadow-sm" >
                            <div className="card-body p-4">
                                <ul className="nav nav-tabs" id="profileTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile-tab-pane" type="button" role="tab"
                                                aria-controls="profile-tab-pane" aria-selected="true">프로필
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="overview-tab" data-bs-toggle="tab"
                                                data-bs-target="#overview-tab-pane" type="button" role="tab"
                                                aria-controls="overview-tab-pane" aria-selected="false">개인정보
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="password-tab" data-bs-toggle="tab"
                                                data-bs-target="#password-tab-pane" type="button" role="tab"
                                                aria-controls="password-tab-pane" aria-selected="true">비밀번호변경
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade" id="overview-tab-pane" role="tabpanel"
                                         aria-labelledby="overview-tab" tabIndex="0">

                                        <h5 className="mb-3">상세정보</h5>
                                        <div className="row g-0">
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">닉네임</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">gudrn</div>
                                            </div>

                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">지역</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">대전광역시 중구 계룡로 825 (용두동, 희영빌딩 2층) 201호</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Address</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">Mountain View, California</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Country</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">United States</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Job</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">Project Manager</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Company</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">GitHub Inc</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Phone</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">+1 (248) 679-8745</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Email</div>
                                            </div>
                                           <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">leo@example.com</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel"
                                         aria-labelledby="profile-tab" tabIndex="0">
                                        <div className="row gy-3 gy-xxl-4">

                                            <div className="col-12 col-md-6">
                                                <label htmlFor="inputFirstName">닉네임</label>
                                                <input type="text" className="form-control" id="inputFirstName"
                                                       onChange={nicknameOnChangeHandler} value={userNickname}/>
                                                {/*여기수정*/}
                                                <label htmlFor="inputAddress" className="mt-2">지역</label>
                                                <input type="text" className="form-control" id="inputAddress"
                                                       value={userInfo.userCity} disabled='true'/>
                                                <label htmlFor="inputTime" className="mt-2">활동
                                                    시간대</label>
                                                <br/>
                                                <select id="inputTime" onChange={likeTimeOnChangeHandler}
                                                        defaultValue={userLikeTime}>
                                                    <option value="" selected={userLikeTime === ""}>자주 운동하시는 시간대를
                                                        알려주세요.
                                                    </option>
                                                    <option value="평일 새벽" selected={userLikeTime === "평일 새벽"}>평일 새벽
                                                    </option>
                                                    <option value="평일 오전" selected={userLikeTime === "평일 오전"}>평일 오전
                                                    </option>
                                                    <option value="평일 오후" selected={userLikeTime === "평일 오후"}>평일 오후
                                                    </option>
                                                    <option value="휴일 새벽" selected={userLikeTime === "휴일 새벽"}>휴일 새벽
                                                    </option>
                                                    <option value="휴일 오전" selected={userLikeTime === "휴일 오전"}>휴일 오전
                                                    </option>
                                                    <option value="휴일 오후" selected={userLikeTime === "휴일 오후"}>휴일 오후
                                                    </option>
                                                </select>
                                                <br/>
                                                <label htmlFor="inputActivity" className="mt-2">선호 운동</label>
                                                <input type="text" className="form-control" id="inputActivity"
                                                       placeholder="ex)걷기, 조깅, 자전거" onChange={activityOnChangeHandler}
                                                       value={userLikeActivity}/>
                                                <label htmlFor="inputMessage" className="mt-2">상태 메세지</label>
                                                <div className="row">
                                                    <div className="col-12 mt-2">
                                                    <textarea style={{width: '328px', height: '150px'}} onChange={messageOnChangeHandler} value={userMessage} />
                                                    </div>
                                                </div>
                                                <button type="button" className="btn btn-primary mt-4" onClick={goProfileUpdate}>저장</button>
                                                <button type="button" className="btn btn-primary mt-4" onClick={uploadSelectFile}>프로필 이미지 저장</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="password-tab-pane" role="tabpanel"
                                         aria-labelledby="password-tab" tabIndex="0">
                                        <form action="">
                                        <div className="row gy-3 gy-xxl-4">
                                            <div className="col-12">
                                                    <label htmlFor="currentPassword" className="form-label">현재 비밀번호</label>
                                                    <input type="password" className="form-control" id="currentPassword"/>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="newPassword" className="form-label mt-2">새 비밀번호</label>
                                                    <input type="password" className="form-control" id="newPassword"/>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="confirmPassword" className="form-label mt-2">비밀번호 확인</label>
                                                    <input type="password" className="form-control" id="confirmPassword"/>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary mt-4" >비밀번호 변경
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default MyPage;