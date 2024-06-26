import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const sidoRef = useRef();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [address, setAddress] = useState("");             /* 상세 주소 */
    const [sidoAddress, setSidoAddress] = useState("");
    const [cmpAddress, setCmpAddress] = useState("");       /* 완성된 형식의 주소 */

    const [daumAddr, setDaumAddr] = useState({})



    const idOnChangeHandler = useCallback((e) => {
        setId(e.target.value);
        setIdCheckFlag(false);
    }, []);
    const pwOnChangeHandler = useCallback((e) => {
        setPw(e.target.value);
    }, []);
    const pwConfirmOnChangeHandler = useCallback((e) => {
        setPwConfirm(e.target.value);
    }, []);
    const nameOnChangeHandler = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const nicknameOnChangeHandler = useCallback((e) => {
        setNickname(e.target.value);
    }, []);
    const emailOnChangeHandler = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const genderOnChangeHandler = useCallback((e) => {
        setGender(e.target.value);
    }, []);
    const birthOnChangeHandler = useCallback((e) => {
        setBirth(e.target.value);
    }, []);
    const addressOnChangeHandler = useCallback((e) => {
        setAddress(e.target.value);

    }, []);
    const sidoAddressOnChangeHandler = useCallback((e) => {
        setSidoAddress(e.target.value);
    }, []);



    const [idCheckFlag, setIdCheckFlag] = useState(false);
    const [signupFlag, setSignupFlag] = useState(false);

    const validationCheck = () => {
        const messages = {
            id: id ? '' : '아이디를 입력해주세요.',
            pw: pw ? '' : '비밀번호를 입력해주세요.',
            pwConfirm: pw === pwConfirm ? '' : '비밀번호가 일치하지 않습니다.',
            name: name ? '' : '이름을 입력해주세요.',
            nickname: nickname ? '' : '닉네임을 입력해주세요.',
            email: email ? '' : '이메일을 입력해주세요.',
            gender: gender ? '' : '성별을 선택해주세요.',
            birth: birth ? '' : '생일을 입력해주세요.',
            address: address ? '' : '주소를 입력해주세요.',
            idCheck: idCheckFlag ? '' : '아이디 중복확인을 해주세요.'
        };

        setValidationMessages(messages);

        // Check if all validation messages are empty
        return Object.values(messages).every(message => message === '');
    };

    const goSignUp = async () => {

        console.log(daumAddr);
        setSignupFlag(true);
        if (validationCheck()) {
            axios.post("api/signup", {
                userId: id,
                userPw: pw,
                userName: name,
                userNickname: nickname,
                userEmail: email,
                userGender: gender,
                userBirth: birth,
                userAddress: cmpAddress,
                userCity: sidoAddress
            }).then((res) => {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            });
        }
        console.log(cmpAddress)
        console.log(sidoAddress);
    }

    const goIdCheck = () => {
        axios.post("api/idcheck", {
            userId: id
        }).then((res) => {
            if (res.data === "idCheckSuccess") {
                setIdCheckFlag(true);
                setValidationMessages(prev => ({ ...prev, idCheck: '사용 가능한 아이디입니다.', idCheckColor: 'blue' }));
            } else if (res.data === "idCheckFail") {
                setIdCheckFlag(false);
                setValidationMessages(prev => ({ ...prev, idCheck: '이미 존재하는 아이디입니다.', idCheckColor: 'red' }));
            }
        });
    }

    const [validationMessages, setValidationMessages] = useState({
        id: '',
        pw: '',
        pwConfirm: '',
        name: '',
        nickname: '',
        email: '',
        gender: '',
        birth: '',
        address: '',
        idCheck: '',
        idCheckColor: 'red'
    });

    useEffect(() => {
        if (daumAddr !== {}) {
            setCmpAddress(daumAddr.addr + " " + address + daumAddr.extraAddr);
            setSidoAddress(daumAddr.sido);
        }
    }, [daumAddr, address]);

    function sample6_execDaumPostcode() {

        new window.daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.

                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수
                // let shorthand: false;

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === 'R') {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }

                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode;
                // document.getElementById("sample6_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample6_detailAddress").focus();

                // 주소 데이터 생성
                setDaumAddr({zipcode: data.zonecode, addr: addr, extraAddr: extraAddr, sido: data.sido});
            }
        }).open()

    }



    return (
        <>
            <body className="body-wrapper" data-spy="scroll" data-target=".privacy-nav">
            <section className="user-login section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="content text-center border p-5" style={{ width: '500px' }}>
                                    <div className="logo mb-5">
                                        <a onClick={() => navigate("/")}><img src="images/logo.png" alt=""/></a>
                                    </div>
                                    <form>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <input className="form-control main" type="text" placeholder="ID" required
                                                   onChange={idOnChangeHandler}/>
                                            <button type="button"
                                                    className="form-control main btn text-white bg-secondary"
                                                    style={{
                                                        marginLeft: '5px',
                                                        width: 'auto',
                                                        maxWidth: '30%',
                                                        whiteSpace: 'nowrap'
                                                    }} onClick={goIdCheck}>중복확인
                                            </button>
                                        </div>
                                        <div style={{color: "red", display: validationMessages.id ? 'block' : 'none'}}>
                                            {validationMessages.id}
                                        </div>
                                        <div style={{
                                            color: validationMessages.idCheckColor,
                                            display: validationMessages.idCheck ? 'block' : 'none'
                                        }}>
                                            {validationMessages.idCheck}
                                        </div>
                                        <input className="form-control main" type="password" placeholder="Password"
                                               required onChange={pwOnChangeHandler}/>
                                        <div style={{color: "red", display: validationMessages.pw ? 'block' : 'none'}}>
                                            {validationMessages.pw}
                                        </div>
                                        <input className="form-control main" type="password"
                                               placeholder="Password Confirm"
                                               required onChange={pwConfirmOnChangeHandler}/>
                                        <div style={{
                                            color: "red",
                                            display: validationMessages.pwConfirm ? 'block' : 'none'
                                        }}>
                                            {validationMessages.pwConfirm}
                                        </div>
                                        <input className="form-control main" type="text" placeholder="Name"
                                               required onChange={nameOnChangeHandler}/>
                                        <div
                                            style={{color: "red", display: validationMessages.name ? 'block' : 'none'}}>
                                            {validationMessages.name}
                                        </div>
                                        <input className="form-control main" type="text" placeholder="Nickname"
                                               required onChange={nicknameOnChangeHandler}/>
                                        <div style={{
                                            color: "red",
                                            display: validationMessages.nickname ? 'block' : 'none'
                                        }}>
                                            {validationMessages.nickname}
                                        </div>
                                        <input className="form-control main" type="email" placeholder="Email Address"
                                               required onChange={emailOnChangeHandler}/>
                                        <div style={{
                                            color: "red",
                                            display: validationMessages.email ? 'block' : 'none'
                                        }}>
                                            {validationMessages.email}
                                        </div>
                                        <div style={{color: "grey", marginLeft: "10px", textAlign: "left"}}>Gender
                                            <span style={{marginLeft: "120px"}}>
                                                    <label htmlFor="male">
                                                        <input type="radio" id="male" name="gender" value="m"
                                                               onChange={genderOnChangeHandler}/> 남
                                                    </label>
                                                </span>
                                            <span style={{marginLeft: "30px"}}>
                                                    <label htmlFor="female">
                                                        <input type="radio" id="female" name="gender" value="f"
                                                               onChange={genderOnChangeHandler}/> 여
                                                    </label>
                                                </span>
                                        </div>
                                        <div style={{
                                            color: "red",
                                            display: validationMessages.gender ? 'block' : 'none'
                                        }}>
                                            {validationMessages.gender}
                                        </div>
                                        <br/>
                                        <div style={{textAlign: "left", marginLeft: "10px"}}>
                                            <label htmlFor="birthday">Birth</label>
                                            <input type="date" id="birthday" name="birthday"
                                                   style={{marginLeft: "130px"}} onChange={birthOnChangeHandler}/>
                                        </div>
                                        <div style={{
                                            color: "red",
                                            display: validationMessages.birth ? 'block' : 'none'
                                        }}>
                                            {validationMessages.birth}
                                        </div>
                                        <br/>

                                        {/*주소 입력*/}
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <input className="form-control main" type="text" id="sample6_postcode" placeholder="우편번호" readOnly
                                                   />
                                            <button type="button"
                                                    className="form-control main btn text-white bg-secondary"
                                                    style={{
                                                        marginLeft: '5px',
                                                        width: 'auto',
                                                        maxWidth: '30%',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    onClick={sample6_execDaumPostcode}>우편번호찾기
                                            </button>
                                        </div>
                                        <input type="text" id="sample6_address" placeholder="주소"
                                               className="form-control main" readOnly value={daumAddr.addr}/>
                                        <input type="text" id="sample6_detailAddress" placeholder="상세주소"
                                               className="form-control main"  onChange={addressOnChangeHandler}
                                               style={{width: "49%", display: "inline"}}/>
                                        <input type="text" id="sample6_extraAddress" placeholder="참고항목"
                                               className="form-control main" readOnly value={daumAddr.extraAddr}
                                               style={{width: "49%", display: "inline", marginLeft: "5px"}}/>
                                        <input type="hidden" onChange={sidoAddressOnChangeHandler} />

                                        <div style={{
                                            color: "red",
                                            display: validationMessages.address ? 'block' : 'none'
                                        }}>
                                            {validationMessages.address}
                                        </div>
                                        <div>
                                            <button className="btn btn-primary m-3" onClick={goSignUp}
                                                    type="button">Sign Up
                                            </button>
                                            <button className="btn btn-primary" onClick={() => navigate("/")}
                                                    type="button">Cancel
                                            </button>
                                        </div>
                                    </form>
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

    )
}