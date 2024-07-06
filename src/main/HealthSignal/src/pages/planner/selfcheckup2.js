import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, useNavigate} from "react-router-dom";

const SelfCheckup2 = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const bodyInfo = {...location.state};

    const [selectParts, setSelectParts] = useState([]);

    const [checkedItems, setCheckedItems] = useState([]);


    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedItems([...checkedItems, value]); // value를 배열에 추가
        } else {
            setCheckedItems(checkedItems.filter(item => item !== value)); // value를 배열에서 제거
        }
    };


    useEffect(() => {
        setSelectParts(bodyInfo.selectedParts);
    }, []);



    return (
        <Container>
            <div className="text-center fw-bold mb-4" style={{position: 'relative'}}>
                <h6 className="fw-bold mb-2 text-center py-2"
                    style={{
                        backgroundColor: 'rgba(108, 117, 125, 0.1)',
                        borderRadius: '8px',
                        width: '350px',
                        height: '50px',
                        margin: 'auto'
                    }}>
                    증상을 읽고 해당 사항에 체크해주시기 바랍니다.
                    (해당되는 경우에만 체크, 2개 이상 체크 가능)
                </h6>
            </div>


            {
                selectParts.map((v, i) => {
                    if (v === 'abdomen') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/abdomen.png" alt="이미지"
                                             style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">윗배</span>
                                        <Form.Group>
                                            <Form.Check
                                                type="checkbox"
                                                label="속쓰림 , 소화불량, 명치 주변 불편감이 있다."
                                                value="abdomen1"
                                                onChange={handleCheckboxChange}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="반듯이 누워 있으면 복부 통증이 심해지며 무릅을 끌어 당긴 자세는 증상이 덜하다."
                                                value="abdomen2"
                                                onChange={handleCheckboxChange}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="상복부 불쾌감, 식욕부진, 소화불량 증상이 있다."
                                                value="abdomen3"
                                                onChange={handleCheckboxChange}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="갈비뼈 바로 아래, 오른쪽 복부에 지속적이고 심한 통증이 있다."
                                                value="abdomen4"
                                                onChange={handleCheckboxChange}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="왼쪽 상복부 통증이 있다."
                                                value="abdomen5"
                                                onChange={handleCheckboxChange}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="배꼽 주위 통증이 지속되다가 오른쪽 아랫배로 통증이 이동했다."
                                                value="abdomen6"
                                                onChange={handleCheckboxChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    if (v === 'back') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/back.png" alt="이미지"
                                             style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">등·허리</span>
                                        <Form.Group>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Form.Check type="checkbox" label="등 부위가 뭉치고 통증이 있다."
                                                            value="back1"
                                                            onChange={handleCheckboxChange}/>
                                            </div>
                                            <Form.Check type="checkbox" label="엉덩이 천장관절염과 함께 허리통증이 나타난다."
                                                        value="back2"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="허리 및 옆구리에 둔한 통증이 느껴진다."
                                                        value="back3"
                                                        onChange={handleCheckboxChange}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    if (v === 'chest') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/chest.png" alt="이미지" style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">가슴</span>
                                        <Form.Group>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Form.Check type="checkbox" label="오랜 기침이 3주 이상 지속되었다."
                                                            value="chest1"
                                                            onChange={handleCheckboxChange}/>
                                            </div>
                                            <Form.Check type="checkbox" label="가슴이 답답하고, 통증이 있거나 숨이차다."
                                                        value="chest2"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="유방 심부나 유방 피부 밑 겨드랑이 근처에 통증이 없는 덩어리가 만져진다."
                                                        value="chest3"
                                                        onChange={handleCheckboxChange}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    if (v === 'hand') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/hand.png" alt="이미지" style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">손·발</span>
                                        <Form.Group>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Form.Check type="checkbox" label="엄지와 2,3,4 손가락 일부가 저리다."
                                                            value="hand1"
                                                            onChange={handleCheckboxChange}/>
                                            </div>
                                            <Form.Check type="checkbox" label="손마디가 뻣뻣해지고 손마디가 붇는다."
                                                        value="hand2"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="엄지발가락, 발목, 무릎 등 한군데 관절이 부어 오르고 통증이 느껴진다."
                                                        value="hand3"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="손, 발이 쥐가 날때 처럼 저리거나 화끈거림, 심한 경우 고통과 통증이 있다."
                                                        value="hand4"
                                                        onChange={handleCheckboxChange}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    if (v === 'head') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/head.png" alt="이미지"
                                             style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">머리</span>
                                        <Form.Group>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Form.Check type="checkbox" label="눕거나 앉아 있을 때는 어지러움을 못느끼다가 서거나 걸을때 중심을 잡지 못한다."
                                                            value="head1"
                                                            onChange={handleCheckboxChange}/>
                                            </div>
                                            <Form.Check type="checkbox" label="심한 어지럼이 1분 정도 지속되다  머리를 움직이지 않으면 좋아지는 일이 반복된다."
                                                        value="head2"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="두통이 있으면서 눈앞이 흐릿하고 시력이 떨어지는거 같다."
                                                        value="head3"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="목 뒤가 뻣뻣하고 어깨와 팔을 따라서 저리거나 아프다."
                                                        value="head4"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="이마와 눈밑에 통증이 동반된 두통이 있다."
                                                        value="head5"
                                                        onChange={handleCheckboxChange}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    if (v === 'neck') {
                        return (
                            <Row className="justify-content-center mb-4">
                                <Col md={6}>
                                    <Form style={{textAlign: 'left'}}>
                                        <img src="/images/Symptom/neck.png" alt="이미지"
                                             style={{maxWidth: '30px', marginRight: '10px'}}/>
                                        <span className="fw-bold">목</span>
                                        <Form.Group>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Form.Check type="checkbox" label="음식물 섭취시 이물감, 신물 올라옴, 마른 기침 등의 증상이 있다."
                                                            value="neck1"
                                                            onChange={handleCheckboxChange}/>
                                            </div>
                                            <Form.Check type="checkbox" label="목 전면에 만져지는 혹이 있거나 부어있다."
                                                        value="neck2"
                                                        onChange={handleCheckboxChange}/>
                                            <Form.Check type="checkbox" label="뒷머리와 뒷목 등이 묵직하고 통증이 있다."
                                                        value="neck3"
                                                        onChange={handleCheckboxChange}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        )
                    }

                    return null; // or any other fallback if needed
                })
            }

            <div className="d-flex justify-content-center mb-5">
                <button className="btn bg-primary btn-lg text-white mx-2" onClick={() => navigate("/selfcheckup")}>이전</button>
                <button className="btn bg-primary btn-lg text-white mx-2" onClick={() => navigate("/selfcheckup3", {
                    state: checkedItems
                })}>다음</button>
            </div>
        </Container>
    );
};

export default SelfCheckup2;
