import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Certboard2 = () => {
    const navigate = useNavigate();
    const [steps ,setSteps] = useState("")
    const [morning , setMorning] = useState("")
    const [lunch  , setLunch] = useState("")
    const [dinner , setDinner] = useState("")
    const [userNo,  setUserNo] = useState(0)


    // 세션에 저장된 유저 정보
    const [userInfo, setUserInfo] = useState({});
    // 현재 세션에 접속되있는 유저의 정보 얻어오기

    useEffect(()=>{
        getUserInfo();
    },[])

    useEffect(()=>{
        if(userInfo !== null){
            setUserNo(userInfo.userNo)
        }
    },[userInfo])

    const getUserInfo = async () => {
        await axios.post("/api/getuserinfo").then(res=>setUserInfo(res.data));
    }

    //걸음수
    const StepOnChangeHandler = useCallback((e) => {
        setSteps(e.target.value);
    }, []);

    //아침
    const MorningOnChangeHandler = useCallback((e) => {
        setMorning(e.target.value);
    }, []);

    //점심
    const LunchOnChangeHandler = useCallback((e) => {
        setLunch(e.target.value);
    }, []);

    //저녁

    const DinnerOnChangeHandler = useCallback((e) => {
        setDinner(e.target.value);
    }, []);


    // 게시글 추가 함수
    const addPost = async () => {
        try {
            await axios.post("/api/addCM", {
                cmntStep: steps,
                cmntBft: morning,
                cmntLCH: lunch,
                cmntDIR: dinner,
                userNo: userNo
            });
            navigate("/certboard");
        } catch (error) {
            console.error("업데이트 에러야", error);
        }
    };
    return (
        <div className="certboard container" style={{ textAlign: 'center', paddingLeft:"400px",paddingRight:"400px" }}>
            <h2 className="mb-5">인증게시판</h2>

            {/* 게시글 작성 폼 */}
            <form>
                <div>
                    <label htmlFor="steps">걸음수:</label><br />
                    <input
                        type="text"
                        id="steps"
                        name="steps"
                        value={steps}
                        onChange={StepOnChangeHandler}
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="morning">아침식단:</label><br />
                    <input
                        type="text"
                        id="morning"
                        name="morning"
                        value={morning}
                        onChange={MorningOnChangeHandler}
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="lunch">점심식단:</label><br />
                    <input
                        type="text"
                        id="lunch"
                        name="lunch"
                        value={lunch}
                        onChange={LunchOnChangeHandler}
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="dinner">저녁식단:</label><br />
                    <input
                        type="text"
                        id="dinner"
                        name="dinner"
                        value={dinner}
                        onChange={DinnerOnChangeHandler}
                        className="form-control"
                    />
                </div>
                <button className="mt-4 btn btn-secondary" type="button" onClick={addPost}>게시글 작성</button>
            </form>
        </div>
    );
};

export default Certboard2;
