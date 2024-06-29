import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment";

const QnaView = () => {
  const navigate = useNavigate();

  const { queNo } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [question, setQuestion] = React.useState(null);
  const [answer, setAnswer] = React.useState(null);
  const [privateInfo, setPrivateInfo] = React.useState(null);
  //관리자여부
  const [isAdmin, setIsAdmin] = React.useState(false);


  useEffect(() => {
    getUserInfo();
    getPrivateInfo();
  }, []);

  //관리자 여부 설정
  useEffect(() => {
    if(userInfo!=null){
      if(userInfo.userId == "admin"){
        setIsAdmin(true);
      }
    }
  }, [userInfo]);

  //비밀글 불러오기
  useEffect(() => {
    if (privateInfo != null) {
      if (privateInfo.quePublic === "Y"||privateInfo.userNo == userInfo.userNo||userInfo.userId === "admin") {
        getQuestionView();
      } else {
        alert("비밀글입니다.");
        navigate("/qna/list")
      }
    }
  }, [privateInfo]);

  //답변글 불러오기
  useEffect(()=>{
    if(question!=null){
    getAnswerView();
    }
  },[question])


  /* 각종함수 */
  const getUserInfo = async () => {
    await axios.post("/api/getuserinfo").then((res) => {
      setUserInfo(res.data);
      console.log("세션정보", res.data);
    });
  };

  const getPrivateInfo = async () => {
    try{
      const res = await axios.get(`/api/qna/private?queNo=${queNo}`);
      setPrivateInfo(res.data);
    }catch(error){
      console.error("Error selecting data:", error);
    }
  }

  const getQuestionView = async () => {


    try {
      const res = await axios.get(`/api/question/view?queNo=${queNo}`);
      setQuestion(res.data);
    } catch (error) {
      console.error(error);
    }


  };

  const deleteQuestion = async () => {
    await axios.get(`/api/question/delete?queNo=${queNo}`).then((res) => {
      if(res.data===1){
        navigate("/qna/list");
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  const getAnswerView = async () => {
    try{
      const res = await axios.get(`/api/answer/view?queNo=${queNo}`);
      setAnswer(res.data);
    }catch (err){
      console.error(err);
    }
  }








  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <h3 className="text-center">문의 게시판</h3>
          </div>
        </div>
        <div className="row question">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th style={{ fontWeight: "normal" }} colSpan="4">
                        <div style={{ fontSize: "25px", fontWeight: "normal" }}>
                          <img
                            src="/images/qna/icon-letter-q.png"
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                          {question?question.queTitle:null}
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="align-middle"
                        style={{
                          width: "15%",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        작성자
                      </th>
                      <th
                        className="align-middle bg-white"
                        style={{ width: "35%", fontWeight: "normal" }}
                      >
                        {question?question.userNo:null}
                      </th>
                      <th
                        className="align-middle"
                        style={{
                          width: "15%",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        작성일
                      </th>
                      <th
                        className="align-middle bg-white"
                        style={{ width: "35%", fontWeight: "normal" }}
                      >
                        {question?moment(question.queCreDate).format('YYYY-MM-DD HH:mm'):null}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          height: "200px",
                          // wordWrap: "break-word",
                          // wordBreak: "normal",
                          maxHeight: "200px", /* 최대 높이 설정 */
                          overflow: "hidden", /* 내용이 넘칠 경우 숨기기 */
                          transition: "max-height 0.3s ease", /* 높이 변경 시 애니메이션 추가 */
                        }}
                        colSpan="4"
                      >
                        {question?question.queContent:null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {answer?(<div className="row answer mt-4">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th style={{ fontWeight: "normal" }}>
                        <div style={{ fontSize: "25px", fontWeight: "normal" }}>
                          <img
                            src="/images/qna/icon-letter-a.png"
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                          {answer?answer.ansTitle:null}
                        </div>
                      </th>
                        <th style={{width:"20%", verticalAlign:"middle", fontWeight:"normal"}}>{answer?moment(answer.ansCreDate).format('YYYY-MM-DD HH:mm'):null}</th>
                    </tr>
                  </thead>
                    <tbody>
                    <tr>
                    <td
                        style={{
                          height: "200px",
                          wordWrap: "break-word",
                          wordBreak: "normal",
                          maxHeight: "200px", /* 최대 높이 설정 */
                          overflow: "hidden", /* 내용이 넘칠 경우 숨기기 */
                          transition: "max-height 0.3s ease", /* 높이 변경 시 애니메이션 추가 */
                        }}
                        colSpan="2"
                    >
                      {answer?answer.ansContent:null}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>):null}
        <div className="container text-right mt-3">
          <button className="btn btn-primary" onClick={()=>{navigate("/qna/list")}}>목록</button>
          {isAdmin?(<><button className="btn btn-secondary ml-2" onClick={()=>{navigate(`/qna/admin/add/${queNo}`)}}>답변하기</button>
              <button className="btn btn-secondary ml-2">답변수정</button></>):null}
          <button className="btn btn-danger ml-2" onClick={deleteQuestion}>삭제</button>
        </div>
      </div>
    </>
  );
};

export default QnaView;
