import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const SelfCheckup = () => {

    const navigate = useNavigate();
    const [selectedParts, setSelectedParts] = useState([]);

    // 이미지를 클릭할 때 호출될 함수
    const handleClick = (part) => {
        if (selectedParts.includes(part)) {
            setSelectedParts(selectedParts.filter(item => item !== part));
        } else {
            setSelectedParts([...selectedParts, part]);
        }
    };

    // 선택된 부위의 이미지 상태를 결정하는 함수
    const determineImageSrc = (part, onSrc, offSrc) => {
        return selectedParts.includes(part) ? onSrc : offSrc;
    };

    const goNextCheckUp = () => {
        if (!selectedParts.length) {
            alert("신체부위를 선택해주세요.");
            return;
        }
        navigate("/selfcheckup2", {state: {
            selectedParts: selectedParts
            }});
    }

    useEffect(() => {
        console.log(selectedParts);
    }, [selectedParts]);

    return (
        <div className="part_choice">
            <div className="part_choiceHeader ">
                <h4 className="fw-bold">설계를 원하는 신체 부위를 선택하세요</h4>
            </div>
            <div className="part_choiceInner">
                <ol className="clearfix">
                    <li className="ico_01" onClick={() => handleClick('abdomen')}>
                        <img
                            src={determineImageSrc('abdomen', '/images/Symptom/abdomen_on.png', '/images/Symptom/abdomen_off.png')}
                            alt="윗배"
                            className="img-hover"
                        />
                    </li>
                    <li className="ico_02" onClick={() => handleClick('back')}>
                        <img
                            src={determineImageSrc('back', '/images/Symptom/back_on.png', '/images/Symptom/back_off.png')}
                            alt="등허리"
                        />
                    </li>
                    <li className="ico_03" onClick={() => handleClick('chest')}>
                        <img
                            src={determineImageSrc('chest', '/images/Symptom/chest_on.png', '/images/Symptom/chest_off.png')}
                            alt="가슴"
                        />
                    </li>
                    <li className="ico_04" onClick={() => handleClick('hand')}>
                        <img
                            src={determineImageSrc('hand', '/images/Symptom/hand_on.png', '/images/Symptom/hand_off.png')}
                            alt="손발"
                        />
                    </li>
                    <li className="ico_05" onClick={() => handleClick('head')}>
                        <img
                            src={determineImageSrc('head', '/images/Symptom/head_on.png', '/images/Symptom/head_off.png')}
                            alt="머리"
                        />
                    </li>
                    <li className="ico_06" onClick={() => handleClick('neck')}>
                        <img
                            src={determineImageSrc('neck', '/images/Symptom/neck_on.png', '/images/Symptom/neck_off.png')}
                            alt="목"
                        />
                    </li>
                </ol>
            </div>
            <div className="part_choiceHeader ">
                <h4 className="fw-bold mt-4">(복수선택가능)</h4>
            </div>
            <div className="d-flex justify-content-center ">
                <button className="btn bg-primary btn-lg text-white" onClick={goNextCheckUp}>다음</button>
            </div>
        </div>
    );
};

export default SelfCheckup;
