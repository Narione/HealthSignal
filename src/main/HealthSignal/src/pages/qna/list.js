import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import moment from 'moment';

const QnaList = () => {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    getQuestionList();
  }, []);
  /* 리스트 불러오기 */
  const getQuestionList = async() => {
    try {
      const res = await axios.get("/api/question/list");
      setQuestionList(res.data);
      console.log(res.data);
    }catch(err) {
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
        <div className="bg-gray d-flex justify-content-center p-3 mb-3">
          <select className="form-select" defaultValue="default" style={{width:"10%"}}>
            <option value="default">선택</option>
            <option value="title">제목</option>
            <option value="id">아이디</option>
          </select>
          <input type="text" className="form-control" style={{width:"30%"}}/>
          <button className="btn btn-secondary" type="button">검색</button>
        </div>
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                  <tr>
                    <th style={{width: "7%", textAlign: "center"}}>번호</th>
                    <th style={{textAlign: "center"}}>제목</th>
                    <th style={{width: "10%", textAlign: "center"}}>작성자</th>
                    <th style={{width: "10%", textAlign: "center"}}>작성일</th>
                    <th style={{width: "10%", textAlign: "center"}}>처리상태</th>
                  </tr>
                  </thead>
                  <tbody>
                  {questionList.map((v, i) => {
                    return (
                        <tr key={i}>
                          <td className="align-middle text-center">
                            <span>{v.queNo}</span>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <div className="ms-3 lh-1">
                                {v.quePublic == "N" ? <img src="/images/qna/icon-closed-padlock.png"/> : null}
                                <a className="text-inherit text-black text-decoration-none" onClick={() => {
                                  navigate(`/qna/view/${v.queNo}`)
                                }}>
                                  {v.queTitle}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span>{v.userNo}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>{moment(v.queCreDate).format('YYYY-MM-DD')}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>답변대기</span>
                          </td>
                        </tr>);
                  })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 text-right">
              <button
                  className="btn btn-primary mt-2"
                  onClick={()=>{navigate("/qna/user/add")}}
              >
                글 작성
              </button>
            </div>
            <nav aria-label="Page navigation example" className="mt-2">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>
    </>
  );
};

export default QnaList;
