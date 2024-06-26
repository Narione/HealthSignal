import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QnaView = () => {
  const { queNo } = useParams();
  const [question, setQuestion] = React.useState(null);

  useEffect(() => {
    getQuestionView();
  }, []);

  const getQuestionView = async () => {
    try {
      const res = await axios.get(`/api/question/view?queNo=${queNo}`);
      console.log(res.data);
      setQuestion(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
                        {question?question.queCreDate:null}
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

        <div className="row answer mt-4">
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
                          제목
                        </div>
                      </th>
                        <th style={{width:"20%", verticalAlign:"middle", fontWeight:"normal"}}>2024.06.26 11:41</th>
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
                      내용
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-right mt-3">
          <button className="btn btn-primary">목록</button>
          <button className="btn btn-secondary ml-2">답변하기</button>
          <button className="btn btn-secondary ml-2">답변수정</button>
          <button className="btn btn-danger ml-2">삭제</button>
        </div>
      </div>
    </>
  );
};

export default QnaView;
