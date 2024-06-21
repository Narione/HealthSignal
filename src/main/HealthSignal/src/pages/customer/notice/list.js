import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NoticeList = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    getNoticeList();
  }, []);
  /* 리스트 불러오기 */
  const getNoticeList = async() => {
    try {
      const res = await axios.get("/api/notice/list");
      setNoticeList(res.data);
    }catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <h3 className="text-center">공지사항</h3>
          </div>
          <div className="col-12 text-right">
            <button
              className="btn btn-primary"
            >
              글 작성
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th style={{width: "7%", textAlign:"center"}}>번호</th>
                      <th style={{textAlign:"center"}}>제목</th>
                      <th style={{width: "7%", textAlign:"center"}}>조회수</th>
                      <th style={{width: "10%", textAlign:"center"}}>작성자</th>
                      <th style={{width: "10%", textAlign:"center"}}>작성일</th>
                      <th style={{width: "10%", textAlign:"center"}}>처리상태</th>
                    </tr>
                  </thead>
                  <tbody>
                  {noticeList.map((v,i)=> {
                    return (
                        <tr key={i}>
                          <td className="align-middle text-center">
                            <span>{v.ntcNo}</span>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <div className="ms-3 lh-1">
                                <a className="text-inherit text-black text-decoration-none" onClick={() => {
                                  navigate(`/notice/view/${v.ntcNo}`)
                                }}>
                                  {v.ntcTitle}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span>{v.ntcHits}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>{v.userNo}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>{v.ntcCreDate}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>답변대기</span>
                          </td>
                        </tr>);
                  })}
                  </tbody>
                </table>
              </div>
              <div className="bg-white text-center card-footer">
                <a className="link-primary" href="/#">
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeList;
