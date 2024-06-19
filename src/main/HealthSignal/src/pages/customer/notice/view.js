import React from "react";

const NoticeView = () => {
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
            <div className="card">
              <div className="table-responsive">
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th>
                          <div>제목</div>
                          <div>작성자:</div>
                          <div><span>날짜:</span><span className="ml-5">조회수: </span></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img
                                src="/images/brand/dropbox-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                Dropbox Design System
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeView;
