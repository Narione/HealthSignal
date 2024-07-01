import React, { useCallback, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "../../css/calendar.css";
import axios from "axios";

const HabitCheck = () => {
  // 세션에 담긴 회원정보
  const [userInfo, setUserInfo] = useState({});
  const [value, onChange] = useState(new Date());
  // 습관 완료 날짜
  const [marks, setMarks] = useState([]);
  const [habNo, setHabNo] = useState(0);
  const [habNoList, setHabNoList] = useState([]);

  // button active
  const [activeIndex, setActiveIndex] = useState(0);
  const [habits, setHabits] = useState([]);

  //인풋창 열기
  const [inputFlag, setInputFlag] = useState(false);
  const [habitInput, setHabitInput] = useState("");

  //핸들러
  const habitOnChangeHandler = useCallback((e) => {
    setHabitInput(e.target.value);
  }, []);

  //ref
  const habitInputRef = useRef();

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo != {}) {
      fetchHabits();
    }
  }, [userInfo]);

  useEffect(() => {
    if (habNoList.length > 0) {
      setHabNo(habNoList[0]);
    }
  }, [habNoList]);

  //습관 체크 주기 & 체크 지우기
  const clickDay = async (value) => {
    const formatDate = moment(value).format("YYYY-MM-DD");
    if (marks.includes(formatDate)) {
      const dateObject = new Date(formatDate);
      await deleteHabitCheck(habNo, dateObject);
    } else {
      await insertHabitCheck(habNo, formatDate);
    }
    fetchHabitCheck(habNo); // Update marks after insert/delete operation
  };

  useEffect(() => {
    if (habNo !== 0) {
      fetchHabitCheck(habNo);
    }
  }, [habNo]);

  // 습관 클릭시 habNo 가져오기, 습관 클릭 액티브
  const handleClick = async (index, buttonText) => {
    setActiveIndex(index);
    const resHabNo = await getHabNoByHabName(buttonText);
    setHabNo(resHabNo);
  };

  /* 각종 함수 */

  //세션에 저장된 회원정보 가져오기
  const getUserInfo = async () => {
    await axios.post("api/getuserinfo").then((res) => {
      setUserInfo(res.data);
      console.log("세션정보", res.data);
    });
  };

  const fetchHabits = async () => {
    if (userInfo == "getUserInfoFail") {
      alert("로그인에 실패하였습니다.");
    }

    try {
      const res = await axios.post("/api/habitlist", {
        userNo: userInfo.userNo,
      });
      setHabits(res.data.map((habit) => habit.habName));
      setHabNoList(res.data.map((habit) => habit.habNo));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHabitCheck = async (selectedHabNo) => {
    try {
      const res = await axios.get(`/api/habitcheck?habNo=${selectedHabNo}`);
      setMarks(res.data.map((habitcheck) => habitcheck.habcDate));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const insertHabitCheck = async (selectedHabNo, date) => {
    try {
      await axios.post("/api/inserthabitcheck", {
        habNo: selectedHabNo,
        habcDate: date,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteHabitCheck = async (habNo, date) => {
    try {
      await axios.post("/api/deletehabitcheck", {
        habNo: habNo,
        habcDate: date,
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const getHabNoByHabName = async (habName) => {
    try {
      const res = await axios.post("/api/habitno", {
        userNo: userInfo.userNo,
        habName: habName,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* 습관 추가 */
  const openInput = () => {
    setInputFlag(true);
  };
  const addHabit = async () => {
    try {
      await axios.post("/api/addhabit", {
        userNo: userInfo.userNo,
        habName: habitInput,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
    console.log("activeIndex", activeIndex);
    fetchHabits();
    setHabitInput("");
    setActiveIndex(0);
  };

  /* 습관 제거 */

  const deleteHabit = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      console.log("activeIndex", activeIndex);
      try {
        const res = await axios.post("/api/deletehabit", {
          habNo: habNo});
        fetchHabits();
        setActiveIndex(0);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  /* 키보드 누르기 */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키를 눌렀을 때 실행할 함수 호출
      addHabit();
    }
  }

  return (
    <>
      <div className="container">
        <div className="col-12 mb-3">
          <h3 className="text-center mt-5 pt-3 mb-5">습관체크</h3>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="p-3 border bg-light">
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={openInput}
                >
                  <h5>➕</h5>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={deleteHabit}
                >
                  <h5>➖</h5>
                </button>
              </div>

              {inputFlag ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <input
                    className="form-control main"
                    type="text"
                    placeholder="습관명 입력"
                    onChange={habitOnChangeHandler}
                    value={habitInput}
                    ref={habitInputRef}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    className="form-control main btn text-white bg-secondary"
                    style={{
                      marginLeft: "5px",
                      width: "auto",
                      maxWidth: "30%",
                      whiteSpace: "nowrap",
                    }}
                    onClick={addHabit}
                  >
                    추가
                  </button>
                  <button
                    type="button"
                    className="form-control main btn text-white bg-secondary"
                    style={{
                      marginLeft: "5px",
                      width: "auto",
                      maxWidth: "30%",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setInputFlag(false);
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : null}

              <div className="list-group">
                {habits.map((buttonText, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`list-group-item list-group-item-action ${index === activeIndex ? "active" : ""}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => handleClick(index, buttonText)}
                  >
                    {buttonText}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-sm-5">
            <div className="p-3 border bg-light">
              {/*Right Component*/}

              <div>
                <Calendar
                  onChange={onChange}
                  value={value}
                  calendarType="gregory"
                  formatDay={(locale, date) => moment(date).format("DD")}
                  tileClassName={({ date, view }) => {
                    if (
                      view === "month" &&
                      marks.find((x) => x === moment(date).format("YYYY-MM-DD"))
                    ) {
                      return "highlight";
                    }
                    return null; // Ensure no class is applied if the condition is not met
                  }}
                  onClickDay={clickDay}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitCheck;
