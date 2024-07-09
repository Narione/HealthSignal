import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";


const Certboard2 = () => {

    const [steps ,setSteps] = useState("")
    const [morning , setMorning] = useState("")
    const [lunch  , setLunch] = useState("")
    const [dinner , setDinner] = useState("")
    const [userNo,  setUserNo] = useState(0)


    // 세션에 저장된 유저 정보
    const [userInfo, setUserInfo] = useState({});
    // 현재 세션에 접속되있는 유저의 정보 얻어오기

   useEffect(async ()=>{

       const res = await axios.post("/api/getuserinfo")
       setUserNo(res.data.userNo)
   },[])

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
            const res = await axios.post("/api/addCM", {
                cmntStep: steps,
                cmntBft: morning,
                cmntLCH: lunch,
                cmntDIR: dinner,
                userNo: userNo
            });
            window.location.href= "/certboard"

        } catch (error) {
            console.error("업데이트 에러야", error);
        }
    };
    return (
        <div className="certboard" style={{ textAlign: 'center' }}>
            <h2>게시판</h2>

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
                    />
                </div>
                <div>
                    <label htmlFor="morning">아침:</label><br />
                    <input
                        type="text"
                        id="morning"
                        name="morning"
                        value={morning}
                        onChange={MorningOnChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="lunch">점심:</label><br />
                    <input
                        type="text"
                        id="lunch"
                        name="lunch"
                        value={lunch}
                        onChange={LunchOnChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="dinner">저녁:</label><br />
                    <input
                        type="text"
                        id="dinner"
                        name="dinner"
                        value={dinner}
                        onChange={DinnerOnChangeHandler}
                    />
                </div>
                <button className="mt-4" type="button" onClick={addPost}>게시글 작성</button>
            </form>
        </div>
    );
};

export default Certboard2;
