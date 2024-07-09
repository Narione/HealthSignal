import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../../css/calendar.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HealthInfo = () => {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [mark, setMark] = useState([]); // 예제 데이터를 위해 빈 배열로 초기화
    const [userInfo, setUserInfo] = useState({});

    const [selectDayInfo, setSelectDayInfo] = useState({});

    const [today, setToday] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [highPressure, setHighPressure] = useState("");
    const [lowPressure, setLowPressure] = useState("");

    const heightOnChangeHandler = (e) => {
        setHeight(e.target.value);
    }

    const weightOnChangeHandler = (e) => {
        setWeight(e.target.value);
    }

    const highPressureOnChangeHandler = (e) => {
        setHighPressure(e.target.value);
    }
    const lowPressureOnChangeHandler = (e) => {
        setLowPressure(e.target.value);
    }

    const onChangeDay = (date) => {
        setDate(moment(date).format("YYYY-MM-DD"));
    };

    // 숫자와 점(.)만 입력 가능하도록 하는 함수
    // const checkNumber = (e) => {
    //     const charCode = e.which ? e.which : e.keyCode;
    //     const inputValue = e.target.value;
    //
    //     // Allow only numbers (0-9) and one period (.)
    //     if ((charCode < 48 || charCode > 57) && charCode !== 46) {
    //         e.preventDefault();
    //     }
    //
    //     // Prevent more than one period (.)
    //     if (charCode === 46 && inputValue.includes('.')) {
    //         e.preventDefault();
    //     }
    //
    //     // Allow deleting characters
    //     if (charCode === 8 || charCode === 46) {
    //         return;
    //     }
    // };

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (date > today) {
            alert("오늘까지의 날짜만 선택 가능합니다.");
            setDate("");
            return
        }
        if (date !== "") {
            getSelectDayInfo();
        }
    }, [date]);

    useEffect(() => {
        console.log(selectDayInfo);
        setHeight(selectDayInfo.iphHeight);
        setWeight(selectDayInfo.iphWeight);
        setHighPressure(selectDayInfo.iphHighPressure);
        setLowPressure(selectDayInfo.iphLowPressure);
    }, [selectDayInfo]);

    useEffect(() => {

        console.log(today)

    }, [today]);

    // 현재 세션에 접속되있는 유저의 정보 얻어오기
    const getUserInfo = () => {
        axios.post("api/getuserinfo")
            .then(res => {
                setUserInfo(res.data);
                console.log(res.data)

            })
    }

    const getSelectDayInfo = () => {
        const localDate = moment(date).format('YYYY-MM-DD');
        console.log(localDate);
        axios.post("/api/calendarcheck", {
            userNo: userInfo.userNo,
            iphDate: localDate
        }).then(
            res => {
                if (res.data) {
                    setSelectDayInfo(res.data);
                } else {
                    setSelectDayInfo("");
                }

            }
        )

    }

    const insertHealthInfo = () => {
        const localDate = moment(date).format('YYYY-MM-DD');
        axios.post("/api/inserthealthinfo", {
            userNo: userInfo.userNo,
            iphDate: localDate,
            iphHeight: height,
            iphWeight: weight,
            iphHighPressure: highPressure,
            iphLowPressure: lowPressure
        }).then(
            res => {
                if (res.data === "success") {
                    alert("입력되었습니다.");
                    navigate("/healthinfo");
                }
            }
        )
    };

    return (
        <>
            <Calendar
                onChange={onChangeDay} // useState로 포커스 변경 시 현재 날짜 받아오기
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                value={date}
                navigationLabel={null}
                showNeighboringMonth={false} // 이전, 이후 달의 날짜는 보이지 않도록 설정
                className="mx-auto w-full text-sm border-b calHealthInfo"
                tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                    // 추가할 html 태그를 변수 초기화
                    let html = [];
                    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        html.push(<div className="dot" key={date}></div>);
                    }
                    // 다른 조건을 주어서 html.push에 추가적인 html 태그를 적용할 수 있음.
                    return (
                        <div className="flex justify-center items-center absoluteDiv">
                            {html}
                        </div>
                    );
                }}
            />
            {
                selectDayInfo ? (
                    <div className="container d-flex flex-column align-items-center">
                        <div className="mb-3 d-flex align-items-center mt-4">
                            <label className="col-auto text-end pe-2">키는</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                readOnly={true}
                                value={height}
                                name="height"

                                onChange={heightOnChangeHandler}
                            />
                            <label className="col-auto">cm 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">몸무게는</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                readOnly={true}
                                value={weight}
                                name="weight"

                                onChange={weightOnChangeHandler}
                            />
                            <label className="col-auto">kg 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">최고 혈압은</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                readOnly={true}
                                value={highPressure}
                                name="highBp"
                                maxLength="3"

                                onChange={highPressureOnChangeHandler}
                            />
                            <label className="col-auto">mmHg 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">최저 혈압은</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                readOnly={true}
                                value={lowPressure}
                                name="lowBp"
                                maxLength="3"

                                onChange={lowPressureOnChangeHandler}
                            />
                            <label className="col-auto">mmHg 입니다.</label>
                        </div>
                    </div>
                ) : (
                    <div className="container d-flex flex-column align-items-center">
                        <div className="mb-3 d-flex align-items-center mt-4">
                            <label className="col-auto text-end pe-2">키는</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                value={height}
                                name="height"

                                onChange={heightOnChangeHandler}
                            />
                            <label className="col-auto">cm 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">몸무게는</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                value={weight}
                                name="weight"

                                onChange={weightOnChangeHandler}
                            />
                            <label className="col-auto">kg 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">최고 혈압은</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                value={highPressure}
                                name="highBp"
                                maxLength="3"

                                onChange={highPressureOnChangeHandler}
                            />
                            <label className="col-auto">mmHg 입니다.</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-auto text-end pe-2">최저 혈압은</label>
                            <input
                                type="text"
                                className="form-control me-2 fixed-width-input"
                                value={lowPressure}
                                name="lowBp"
                                maxLength="3"

                                onChange={lowPressureOnChangeHandler}
                            />
                            <label className="col-auto">mmHg 입니다.</label>
                        </div>
                        <button className="btn btn-outline-primary" onClick={insertHealthInfo}>저장</button>
                    </div>
                )
            }


        </>
    );
};

export default HealthInfo;
