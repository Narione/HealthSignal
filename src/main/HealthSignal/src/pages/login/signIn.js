import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [id, setId] =useState("");
    const [pw, setPw] =useState("");
    const [warning, setWarning] =useState(false);
    const [noValue,setNoValue]=useState(false);

    const warningRef = useRef();
    const idOnChangeHandler = useCallback((e)=>{
        setId(e.target.value);
    },[])
    const pwOnChangeHandler = useCallback((e)=>{
        setPw(e.target.value);
    },[])

    const goSignIn = async () => {
        if( id=="" || pw=="" ){
            setNoValue(true);
            return;
        }else{
            setNoValue(false);
        }
        try {
            const res = await axios.post("/api/login",
                {userId: id, userPw: pw});
            console.log(res.data);
            const data = res.data;
            if(data === "불일치"){
                setWarning(true);
                return;
            }
            navigate(-1);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            goSignIn();
        }
    }

    return (
        <>
            <body className="body-wrapper" data-spy="scroll" data-target=".privacy-nav">
            <section className="user-login section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="content text-center p-5" style={{width:"500px",border:"1px solid lightgrey", borderRadius:"12px"}}>
                                    <div className="logo mb-5">
                                        <a href="index.html"><img src="/images/logo.png" alt=""/></a>
                                    </div>
                                    <form action="#">
                                        <input className="form-control main" type="text" placeholder="ID"
                                               onChange={idOnChangeHandler}
                                               required/>
                                        <input className="form-control main" type="password" placeholder="Password"
                                               onChange={pwOnChangeHandler}
                                               required onKeyDown={pressEnter}/>
                                        {warning?<div style={{color: "red", marginBottom:"10px"}}>아이디 혹은 비밀번호가 일치하지않습니다.</div>:null}
                                        {noValue?<div style={{color: "green", marginBottom:"10px"}}>아이디, 비밀번호를 입력해주세요.</div>:null}
                                        <button className="btn btn-main-sm"
                                                type="button"
                                                onClick={goSignIn}>sign in
                                        </button>
                                    <button className="btn btn-main-sm ml-3"
                                                type="button"
                                                onClick={()=>{navigate("/")}}>cancel
                                        </button>
                                    </form>

                                    <div className="new-acount">
                                        <a href="contact.html">Forget your password?</a>
                                        <p>Don't Have an account? <a href="/signup"> SIGN UP</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="scroll-top-to">
                <i className="ti-angle-up"></i>
            </div>
            </body>
        </>
    );
};

export default SignIn;