import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useBeforeUnload, useNavigate} from "react-router-dom";



const MyPage = () => {
    const uploadBtn = useRef();
    const confirmNewPasswordRef = useRef();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const passwordFormRef = useRef();

    const navigate = useNavigate();

    // 세션에 저장된 유저 정보
    const [userInfo, setUserInfo] = useState({});

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [userNo, setUserNo] = useState(0);
    const [userNickname, setUserNickname] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userLikeTime, setUserLikeTime] = useState("");
    const [userLikeActivity, setUserLikeActivity] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const [changeProfileFlag, setChangeProfileFlag] = useState(false);
    const [userPreview, setUserPreview] = useState("");

    const [passwordConfirmFlag, setPasswordConfirmFlag] = useState(true);
    const [currentPasswordFlag, setCurrentPasswordFlag] = useState(true);

    // 첨부파일 관련
    const [selectedFile, setSelectedFile] = useState(null);

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
    const currentPasswordOnchangeHandler = useCallback((e) => {
        setCurrentPassword(e.target.value);
    }, []);
    const newPasswordOnChangeHandler = useCallback((e) => {
        setNewPassword(e.target.value);
    }, []);
    const confirmNewPasswordOnChangeHandler = useCallback((e) => {
        setConfirmNewPassword(e.target.value);
    }, []);


    const fileOnChangeHandler = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo != {}) {
            setUserName(userInfo.userName);
            setUserId(userInfo.userId);
            setUserAddress(userInfo.userAddress);
            setUserEmail(userInfo.userEmail);
            setUserBirth(userInfo.userBirth);
            setUserNo(userInfo.userNo);
            setUserNickname(userInfo.userNickname);
            setUserLikeTime(userInfo.userLiketime);
            setUserLikeActivity(userInfo.userLikeactivity);
            setUserMessage(userInfo.userMessage);
            setUserPhoto(userInfo.userPhoto);
            setUserGender(userInfo.userGender);

            if (userInfo.userPhoto) {
                setUserPreview("/images/profile/" + userInfo.userPhoto);
            }
        }

    }, [userInfo]);

    useEffect(() => {
        if (selectedFile) {
            encodeFileToBase64(selectedFile);
            if (changeProfileFlag) {
                // 기존 프로필 이미지 파일 삭제
                deleteOldFile();
            }
            // 업로드된 프로필 이미지 파일을 pc에 저장
            uploadSelectFile();
            setChangeProfileFlag(true);
        }
    }, [selectedFile]);

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
            userMessage: userMessage,
            userPhoto: userPhoto
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
        const formData = new FormData();
        formData.append("file", selectedFile);
        axios.post("/api/file/upload", formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then(res => {
            setUserPhoto(res.data);
            return(res.data);
        });
    }

    const deleteOldFile = () => {
        axios.post("/api/file/delete", userPhoto)
            .then(res => {
            return(res.data)
            }
        )
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setUserPreview(reader.result);
                resolve();
            };
        });
    };

    const goUpdatePw = (e) => {
        e.preventDefault();
        if (!passwordFormRef.current.checkValidity()) {
            passwordFormRef.current.reportValidity();
        } else {

            setCurrentPasswordFlag(true);
            setPasswordConfirmFlag(true);
            if ( (newPassword !== confirmNewPassword) && (newPassword !== "") ) {
                setPasswordConfirmFlag(false);
                currentPasswordRef.current.value = "";
                newPasswordRef.current.value = "";
                confirmNewPasswordRef.current.value = "";
                return
            } else {
                setPasswordConfirmFlag(true);
                axios.post("/api/login", {
                    userId: userId,
                    userPw: currentPassword
                }).then(
                    res => {
                        if (res.data === "불일치") {
                            setCurrentPasswordFlag(false);
                            currentPasswordRef.current.value = "";
                            newPasswordRef.current.value = "";
                            confirmNewPasswordRef.current.value = "";
                        } else {
                            console.log(newPassword);
                            axios.post("/api/update/password", {
                                userNo: userNo,
                                userPw: newPassword
                            }).
                            then(res => {
                                if (res.data === "updatePasswordSuccess") {
                                    alert("비밀번호 변경이 완료되었습니다.");
                                    navigate("/mypage");
                                    window.location.reload();
                                }
                            })
                        }
                    }
                )
            }
        }



    }

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
                                                src = {
                                                     // 만약 userPhoto가 없으면 성별에 따라 기본 프로필 이미지 분기
                                                    userPreview ? userPreview : userGender === "m" ? "/images/profile/male.jpg" : "/images/profile/female.jpg"
                                                }
                                                // src={userPreview}
                                                className="img-fluid rounded-circle align-content-center"
                                                style={{width: '200px', height: '200px', border: 'solid 1px'}}
                                                alt="profile"
                                            />

                                            <div className="d-grid mt-3 text-center">
                                                <button className="btn btn-outline-primary" type="button"
                                                        onClick={goClickUpload}>수정
                                                </button>
                                            </div>
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


                                        <div className="row g-0">
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">아이디</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{userId}</div>
                                            </div>

                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">이름</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{userName}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">주소</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{userAddress}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">생년월일</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{userBirth}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">이메일</div>
                                            </div>
                                            <div
                                                className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{userEmail}</div>
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
                                                        <textarea style={{width: '328px', height: '150px'}}
                                                                  onChange={messageOnChangeHandler}
                                                                  value={userMessage}/>
                                                    </div>
                                                </div>
                                                <form>
                                                    <input type="file" id="fileInput" style={{display: "none"}}
                                                           onChange={fileOnChangeHandler} ref={uploadBtn}
                                                           accept=".jpg, .png, .gif"/>
                                                    <button type="button" className="btn btn-primary mt-4"
                                                            onClick={goProfileUpdate}>저장
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="password-tab-pane" role="tabpanel"
                                         aria-labelledby="password-tab" tabIndex="0">
                                        <form action="" ref={passwordFormRef} className={'needs-validation'}>
                                        <div className="row gy-3 gy-xxl-4">
                                                <div className="col-12">
                                                    <label htmlFor="currentPassword" className="form-label">현재 비밀번호</label>
                                                    <input type="password" className="form-control" ref={currentPasswordRef} onChange={currentPasswordOnchangeHandler} required/>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="newPassword" className="form-label mt-2">새 비밀번호</label>
                                                    <input type="password" className="form-control" ref={newPasswordRef} onChange={newPasswordOnChangeHandler} required/>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="confirmPassword" className="form-label mt-2">비밀번호 확인</label>
                                                    <input type="password" className="form-control" ref={confirmNewPasswordRef} onChange={confirmNewPasswordOnChangeHandler} required/>
                                                </div>

                                                <div className="col-12">
                                                    {
                                                        !passwordConfirmFlag ?
                                                            <div style={{color: "red"}}>비밀번호와 비밀번호 확인이 일치하지 않습니다.</div> :
                                                            null
                                                    }
                                                    {
                                                        !currentPasswordFlag ?
                                                            <div style={{color: "red"}}>현재 비밀번호가 일치하지 않습니다.</div> :
                                                            null
                                                    }

                                                    <button type="submit" onClick={goUpdatePw} className="btn btn-primary mt-4" >비밀번호 변경
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