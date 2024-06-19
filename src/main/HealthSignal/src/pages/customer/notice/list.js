import React from "react";

const NoticeList = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <h3 className="text-center">공지사항</h3>
          </div>
          <div className="col-12 text-right">
            <button
              className="btn"
              style={{ backgroundColor: "#007bff", color: "white" }}
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
                      <th>제목</th>
                      <th>조회수</th>
                      <th>작성자</th>
                      <th>작성일</th>
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
                      <td className="align-middle">34</td>
                      <td className="align-middle">
                        <span className="badge bg-warning">Medium</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-1.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-2.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-3.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img
                                src="/images/brand/slack-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                Slack Team UI Design
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">47</td>
                      <td className="align-middle">
                        <span className="badge bg-danger">High</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-4.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-5.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-6.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img
                                src="/images/brand/github-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                GitHub Satellite
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">120</td>
                      <td className="align-middle">
                        <span className="badge bg-info">Low</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-7.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-8.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-9.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img
                                src="/images/brand/3dsmax-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                3D Character Modelling
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">89</td>
                      <td className="align-middle">
                        <span className="badge bg-warning">Medium</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-10.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-11.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-12.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-primary">
                              <img
                                src="/images/brand/layers-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                Webapp Design System
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">108</td>
                      <td className="align-middle">
                        <span className="badge bg-success">Track</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-13.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-14.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-15.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img
                                src="/images/brand/github-logo.svg"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <a className="text-inherit" href="/#">
                                Github Event Design
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">120</td>
                      <td className="align-middle">
                        <span className="badge bg-info">Low</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-16.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-17.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm">
                            <img
                              alt="avatar"
                              src="images/avatar/avatar-18.jpg"
                              className="rounded-circle"
                            />
                          </span>
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
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
