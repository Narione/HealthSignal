import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NoticeView = () => {
  const { ntcNo } = useParams();
  const [notice, setNotice] = React.useState(null);

  useEffect(() => {
    getNoticeView();
  }, []);

  const getNoticeView = async () => {
    try {
      const res = await axios.get(`/api/notice/view/${ntcNo}`);
      setNotice(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <h3 className="text-center">공지사항</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-12">
            {notice ? (
              <div className="card">
                <div className="table-responsive">
                  <table className="text-nowrap mb-0 table">
                    <thead className="table-light">
                      <tr>
                        <th style={{ fontWeight: "normal" }}>
                          <div
                            style={{ fontSize: "25px", fontWeight: "normal" }}
                          >
                            {notice.ntcTitle}
                          </div>
                          <div>{notice.userNo}</div>
                          <div>
                            <span>{notice.ntcCreDate}</span>
                            <span className="ml-5">
                              조회 {notice.ntcHits}{" "}
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <div className="ms-3 lh-1">
                              <div>{notice.ntcContent}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white text-center card-footer">
                  <div className="container text-right">
                    <button className="btn btn-primary">목록</button>
                    <button className="btn btn-secondary ml-2">수정</button>
                    <button className="btn btn-danger ml-2">삭제</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeView;
