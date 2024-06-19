import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import '../../css/calendar.css';
import axios from "axios";

const HabitCheck = () => {
    const [value, onChange] = useState(new Date());
    // 습관 완료 날짜
    const [marks, setMarks] = useState([]);
    const [habNo, setHabNo] = useState(0);
    const [habNoList,setHabNoList] = useState([]);

    // button active
    const [activeIndex, setActiveIndex] = useState(0);
    const [habits, setHabits] = useState([]);


    useEffect(() => {
        // 서버에서 데이터를 가져오는 비동기 함수
        fetchHabits();

    }, []);

    useEffect(() => {
        if(habNoList.length > 0){
        setHabNo(habNoList[0])
        }
    }, [habNoList]);

    //습관 체크 주기 & 체크 지우기
    const clickDay = async(value)=>{
        const formatDate = moment(value).format("YYYY-MM-DD");
        if (marks.includes(formatDate)) {
            const dateObject = new Date(formatDate);
            await deleteHabitCheck(habNo, dateObject);
        } else {
            await insertHabitCheck(habNo, formatDate);
        }
        fetchHabitCheck(habNo); // Update marks after insert/delete operation


    }

    useEffect(() => {
        if(habNo!==0) {
            fetchHabitCheck(habNo)
        }
    }, [habNo]);






    // 습관 클릭시 habNo 가져오기, 습관 클릭 액티브
    const handleClick = async (index,buttonText) => {
        setActiveIndex(index);
        const resHabNo = await getHabNoByHabName(buttonText)
        setHabNo(resHabNo);
    };

    /* 각종 함수 */
    const fetchHabits = async () => {
        try {
            const res = await axios.post("/api/habitlist",
                {
                    userNo: 6
                }
            );
            setHabits(res.data.map(habit=>habit.habName))
            setHabNoList(res.data.map(habit=>habit.habNo))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchHabitCheck = async (selectedHabNo) => {
        try {
            const res = await axios.get(`/api/habitcheck?habNo=${selectedHabNo}`
            );
            setMarks(res.data.map(habitcheck=>habitcheck.habcDate))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const insertHabitCheck = async (selectedHabNo,date) => {
        try {
            await axios.post("/api/inserthabitcheck", {
                habNo: selectedHabNo,
                habcDate:date}
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteHabitCheck = async (habNo, date)=>{
        try {
            await axios.post("/api/deletehabitcheck",{
                habNo: habNo,
                habcDate:date
            })
        }catch(error){
            console.error('Error deleting data:', error);
        }
    }

    const getHabNoByHabName = async (habName) => {
        try {
            const res = await axios.post("/api/habitno",{
                habName: habName
            }
            )
            return res.data;
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5">
                        <div className="p-3 border bg-light">
                            <div className="list-group">
                                {habits.map((buttonText, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`list-group-item list-group-item-action ${index === activeIndex ? 'active' : ''}`}
                                        aria-current={index === activeIndex ? "true" : undefined}
                                        onClick={() => handleClick(index, buttonText)}
                                    >
                                        {buttonText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 col-sm-7">
                        <div className="p-3 border bg-light">
                            {/*Right Component*/}

                            <div>
                                <Calendar onChange={onChange} value={value}
                                          calendarType="gregory"
                                          formatDay={(locale, date) => moment(date).format("DD")}
                                          tileClassName={({ date, view }) => {
                                              if (view === 'month' && marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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