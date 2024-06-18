import React, {useEffect, useState} from 'react';
import axios from "axios";


const MyPage = () => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfo();
    }, []);


    // 현재 세션에 접속되있는 유저의 정보 얻어오기
    const getUserInfo = () => {
        axios.post("api/getuserinfo")
            .then(res => {
                setUserInfo(res.data);
                console.log(res.data)
            })

    }

    return (

        <section class="bg-light py-3 py-md-5 py-xl-8">
            <div class="container">
                <div class="row gy-4 gy-lg-0">
                    <div class="col-12 col-lg-4 col-xl-3">
                        <div class="row gy-4">
                            <div class="col-12">
                                <div class="card widget-card border-light shadow-sm"  >
                                    <div class="card-header text-bg-primary">환영합니다. goo99님</div>
                                    <div class="card-body">
                                        <img
                                            src="/images/profile/개죽이.png"
                                            className="img-fluid rounded-circle"
                                            style={{width: '200px', height: '200px'}}
                                            alt="profile"
                                        />
                                        <h5 class="text-center mb-1 mt-3">user</h5>
                                        <p class="text-center text-secondary mb-4">Project Manager</p>
                                        <ul class="list-group list-group-flush mb-4">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">랭킹</h6>
                                                <span>28</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">친구 수</h6>
                                                <span>42</span>
                                            </li>
                                        </ul>
                                        <div class="d-grid m-0 text-center">
                                            <button class="btn btn-outline-primary" type="button" >프로필 수정</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-8">
                        <div class="card widget-card border-light shadow-sm" >
                            <div class="card-body p-4">
                                <ul class="nav nav-tabs" id="profileTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile-tab-pane" type="button" role="tab"
                                                aria-controls="profile-tab-pane" aria-selected="false">프로필
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="overview-tab" data-bs-toggle="tab"
                                                data-bs-target="#overview-tab-pane" type="button" role="tab"
                                                aria-controls="overview-tab-pane" aria-selected="true">개인정보
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="password-tab" data-bs-toggle="tab"
                                                data-bs-target="#password-tab-pane" type="button" role="tab"
                                                aria-controls="password-tab-pane" aria-selected="false">비밀번호변경
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content pt-4" id="profileTabContent">
                                    <div class="tab-pane fade show active" id="overview-tab-pane" role="tabpanel"
                                         aria-labelledby="overview-tab" tabindex="0">

                                        <h5 class="mb-3">상세정보</h5>
                                        <div class="row g-0">
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">닉네임</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">guoo99</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">나이</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">28</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">주소</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">대전광역시 중구 계룡로 825 (용두동, 희영빌딩 2층) 201호</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Address</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">Mountain View, California</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Country</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">United States</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Job</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">Project Manager</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Company</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">GitHub Inc</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Phone</div>
                                            </div>
                                            <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">+1 (248) 679-8745</div>
                                            </div>
                                            <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div class="p-2">Email</div>
                                            </div>
                                           <div
                                                class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div class="p-2">leo@example.com</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel"
                                         aria-labelledby="profile-tab" tabindex="0">
                                        <form action="#!" class="row gy-3 gy-xxl-4">
                                            <div className="col-12">
                                                <div className="row gy-2">
                                                    {/*<label className="col-12 form-label m-0">Profile Image</label>*/}
                                                    {/*<div className="col-12">*/}
                                                    {/*    <img src="/images/assets/profile1.jpg" class="img-fluid"*/}
                                                    {/*         alt="goo99" style={{width: '130px', height: '130px'}}/>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="inputFirstName" className="form-label">닉네임</label>
                                                <input type="text" className="form-control" id="inputFirstName"
                                                       value="goo99"/>
                                                <label htmlFor="inputSkills" className="form-label mt-2">나이</label>
                                                <input type="text" className="form-control" id="inputSkills"
                                                       value="28"/>
                                                <label htmlFor="inputAddress" className="form-label mt-2">지역</label>
                                                <input type="text" className="form-control" id="inputAddress"
                                                       value="대전"/>
                                                <label htmlFor="inputEmail" className="form-label mt-2">이메일</label>
                                                <input type="email" className="form-control" id="inputEmail"
                                                       value="g0099@example.com"/>
                                                <label htmlFor="inputMessage" className="form-labe mt-2">상태 메세지</label>
                                                <div className="row">
                                                    <div className="col-12 mt-2">
                                                    <textarea style={{width: '328px', height: '150px'}}>

                                                    </textarea>
                                                    </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mt-4" > 저장 </button>
                                                </div>
                                        </form>
                                    </div>

                                    <div class="tab-pane fade" id="password-tab-pane" role="tabpanel"
                                         aria-labelledby="password-tab" tabindex="0">
                                        <form action="#!">
                                        <div class="row gy-3 gy-xxl-4">
                                            <div class="col-12">
                                                    <label for="currentPassword" class="form-label">현재 비밀번호</label>
                                                    <input type="password" class="form-control" id="currentPassword"/>
                                                </div>
                                                <div class="col-12">
                                                    <label for="newPassword" class="form-label mt-2">새 비밀번호</label>
                                                    <input type="password" class="form-control" id="newPassword"/>
                                                </div>
                                                <div class="col-12">
                                                    <label for="confirmPassword" class="form-label mt-2">비밀번호 확인</label>
                                                    <input type="password" class="form-control" id="confirmPassword"/>
                                                </div>
                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-primary mt-4" >비밀번호 변경
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