import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Selfcheckup3 = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const [checkedList, setCheckedList] = useState([]);

    const [userInfo, setUserInfo] = useState({});

    const [abdomen1Flag, setAbdomen1Flag] = useState(false);
    const [abdomen2Flag, setAbdomen2Flag] = useState(false);
    const [abdomen3Flag, setAbdomen3Flag] = useState(false);

    const [back1Flag, setBack1Flag] = useState(false);

    const [chest1Flag, setChest1Flag] = useState(false);
    const [chest2Flag, setChest2Flag] = useState(false);

    const [hand1Flag, setHand1Flag] = useState(false);
    const [hand2Flag, setHand2Flag] = useState(false);

    const [neck1Flag, setNeck1Flag] = useState(false);
    const [neck2Flag, setNeck2Flag] = useState(false);

    const [head1Flag, setHead1Flag] = useState(false);
    const [head2Flag, setHead2Flag] = useState(false);


    useEffect(() => {
        setCheckedList(location.state.sort());
        getUserInfo();
    }, []);

    useEffect(() => {
        console.log(checkedList);
        if (checkedList) {
            if (checkedList.includes("abdomen1") || checkedList.includes("abdomen2")) {
                setAbdomen1Flag(true);
            }
            if (checkedList.includes("abdomen3") || checkedList.includes("abdomen4") || checkedList.includes("abdomen5")) {
                setAbdomen2Flag(true);
            }
            if (checkedList.includes("abdomen6")) {
                setAbdomen3Flag(true);
            }
            if (checkedList.includes("back1") || checkedList.includes("back2") || checkedList.includes("back3")) {
                setBack1Flag(true);
            }
            if (checkedList.includes("chest1") || checkedList.includes("chest2")) {
                setChest1Flag(true);
            }
            if (checkedList.includes("chest3")) {
                setChest2Flag(true);
            }
            if (checkedList.includes("neck1")) {
                setNeck1Flag(true)
            }
            if (checkedList.includes("neck2") || checkedList.includes("neck3")) {
                setNeck2Flag(true)
            }
            if (checkedList.includes("head1") || checkedList.includes("head2") || checkedList.includes("head3")) {
                setHead1Flag(true)
            }
            if (checkedList.includes("head4") || checkedList.includes("head5")) {
                setHead2Flag(true)
            }
            if (checkedList.includes("hand1") || checkedList.includes("hand2")) {
                setHand1Flag(true)
            }
            if (checkedList.includes("hand3") || checkedList.includes("hand4")) {
                setHand2Flag(true)
            }
        }

    }, [checkedList]);

    // 현재 세션에 접속되있는 유저의 정보 얻어오기
    const getUserInfo = () => {
        axios.post("api/getuserinfo")
            .then(res => {
                setUserInfo(res.data);
                console.log(res.data)
            })
    }


    return (
        <div className="text-center mt-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="ti-widget-alt ms-2"></div>
                <h3 className="ms-2 mb-0">검진 설계 결과보기</h3>
                <div className="ti-widget-alt ms-2"></div>
            </div>

            <div className="d-flex justify-content-center">
                <div>
                    <div className="d-flex align-items-center mt-4">
                        <div className="bg-primary h-150 opacity-75" style={{width: '250px'}}>
                            <ul className="list-unstyled text-white text-center">
                                <li className="text-white mt-2">설계대상자</li>
                                <li className="text-white fw-bold fs-5">{userInfo.userName}</li>
                                <li className="text-white">본인</li>
                            </ul>
                        </div>
                        <div className="ti-angle-down ms-4"></div>
                        <div className="ms-2 fw-bold">고객님의 검진 설계 결과 아래와 같이 분석되었습니다.</div>
                    </div>
                    <div className=" p-3 mt-5 mb-5 fw-bolder" style={{height: '20%', backgroundColor: 'rgba(108, 117, 125, 0.1)'}}>
                        {
                            abdomen1Flag ?
                                <li>
                                    위암 : 위암은 위장의 악성 종양을 의미합니다. 즉, 위의 내피에서 발생하는 암 종양입니다.
                                </li> :
                                null
                        }
                        {
                            abdomen2Flag ?
                                <li>
                                    위십이지장염 : 샘창자 점막에 생기는 염증.
                                </li> :
                                null
                        }
                        {
                            abdomen3Flag ?
                                <li>
                                    장염 : 창자의 점막이나 근질에 생기는 염증. 세균 감염이나 폭음ㆍ폭식 따위로 인하여 복통, 설사, 구토, 발열 따위가 나타납니다.
                                </li> :
                                null
                        }
                        {
                            back1Flag ?
                                <li>
                                    허리디스크 : 허리디스크는 척추 뼈와 뼈 사이의 구조물인 디스크가 탈출된 증상을 말합니다.
                                </li> :
                                null
                        }
                        {
                            chest1Flag ?
                                <li>
                                    폐렴 : 기침이 지속되면서 가슴 통증과 숨이 차다는 증상이 있을 경우, 폐렴일 가능성이 있습니다. 폐렴은 폐의 염증으로 인한 감염 입니다.
                                </li> :
                                null
                        }
                        {
                            chest2Flag ?
                                <li>
                                    유방 종양 : 양성 또는 악성 종양은 유방 내부에서 발생할 수 있으며, 통증 없이 발견되는 경우가 있을 수 있습니다.
                                </li> :
                                null
                        }
                        {
                            neck1Flag ?
                                <li>
                                    식도염 : 식도 점막이 염증을 일으켜 짓무르는 질환으로, 감염이나 산, 알칼리의 자극, 약물 등에 의해 발생할 수 있으며 통증이나 출혈 등의 증상
                                </li> :
                                null
                        }
                        {
                            neck2Flag ?
                                <li>
                                    림프절 염증 : 바이러스나 세균 같은 미생물 감염으로 인한 염증과 우리 몸에서 생겨난 자가면역반응에 의해 생기는 염증입니다.
                                </li> :
                                null
                        }
                        {
                            head1Flag ?
                                <li>
                                    중추성 어지럼증 : 뇌의 이상으로 생기며, 말초성 어지러움은 귀 속 평형을 담당하는 기관의 이상으로 생깁니다.
                                </li> :
                                null
                        }
                        {
                            head2Flag ?
                                <li>
                                    신경통 : 경추의 특정 신경이 압박을 받거나 염증이 있을 때 목 뒤에서 시작된 근육 긴장 및 통증입니다.
                                </li> :
                                null
                        }
                        {
                            hand1Flag ?
                                <li>
                                    손목터널증후군 : 손바닥과 손목의 연결 부위인 신경이 눌려 손목에 통증을 느끼는 증상입니다.
                                </li> :
                                null
                        }
                        {
                            hand2Flag ?
                                <li>
                                    류마티스 관절염 : 류마티스관절염은 손과 손목, 발과 발목 등을 비롯한 여러 관절에서 염증이 나타나는 만성 염증성 질환입니다.
                                </li> :
                                null
                        }

                    </div>

                    <div className="ti-pencil-alt fw-bold">고객님께 추천하는 검사 항목입니다.</div>

                    <div className="container mt-5">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">의심질환</th>
                                <th scope="col">권고사항</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                abdomen1Flag ?
                                <tr>
                                    <td>위암</td>
                                    <td>위내시경 검사</td>
                                </tr>
                                    :
                                    null
                            }
                            {
                                abdomen2Flag ?
                                    <tr>
                                        <td>위십이지장염</td>
                                        <td>위내시경 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                abdomen3Flag ?
                                    <tr>
                                        <td>장염</td>
                                        <td>위내시경 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                back1Flag ?
                                    <tr>
                                        <td>허리디스크</td>
                                        <td>디스크 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                chest1Flag ?
                                    <tr>
                                        <td>페렴</td>
                                        <td>혈액 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                chest2Flag ?
                                    <tr>
                                        <td>유방 종양</td>
                                        <td>유방 초음파 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                neck1Flag ?
                                    <tr>
                                        <td>식도염</td>
                                        <td>내시경 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                neck2Flag ?
                                    <tr>
                                        <td>림프절 염증</td>
                                        <td>초음파 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                head1Flag ?
                                    <tr>
                                        <td>중추성 어지럼증</td>
                                        <td>MRI 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                head2Flag ?
                                    <tr>
                                        <td>신경통</td>
                                        <td>신경전도 검사</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                hand1Flag ?
                                    <tr>
                                        <td>손목터널증후군</td>
                                        <td>MRI</td>
                                    </tr>
                                    :
                                    null
                            }
                            {
                                hand2Flag ?
                                    <tr>
                                        <td>류마티스 관절염</td>
                                        <td>혈액검사</td>
                                    </tr>
                                    :
                                    null
                            }

                            </tbody>
                        </table>
                        <h6 className="text-center mt-5 mb-4">지금 바로 건강검진을 예약해보세요.</h6>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <button className="btn bg-primary btn-lg text-white mx-2 text-white" onClick={() => navigate("/reserve")} >검진예약하기</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Selfcheckup3;
