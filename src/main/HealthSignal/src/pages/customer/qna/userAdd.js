import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserAdd = () => {


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
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th
                        style={{
                          width: "15%",
                          fontWeight: "normal",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <div style={{ fontWeight: "normal" }}>제목</div>
                      </th>
                      <th colSpan="3" className="align-middle bg-white">
                        <input className="form-control" type="text" />
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
                        공개여부
                      </th>
                      <th
                        className="align-middle bg-white"
                        style={{ width: "35%", fontWeight: "normal" }}
                      >
                        <span style={{ marginLeft: "20px" }}>
                          <label htmlFor="public">
                            <input
                              type="radio"
                              id="public"
                              name="publicFlag"
                              value="Y"
                              // onChange={genderOnChangeHandler}
                            />{" "}
                            공개
                          </label>
                        </span>
                        <span style={{ marginLeft: "30px" }}>
                          <label htmlFor="private">
                            <input
                              type="radio"
                              id="private"
                              name="publicFlag"
                              value="N"
                              // onChange={genderOnChangeHandler}
                            />{" "}
                            비공개
                          </label>
                        </span>
                      </th>
                      <th
                        className="align-middle"
                        style={{
                          width: "15%",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        첨부파일
                      </th>
                      <th
                        className="align-middle bg-white"
                        style={{ width: "35%", fontWeight: "normal" }}
                      >
                        <input
                          className="form-control"
                          type="file"
                          id="formFileMultiple"
                          multiple
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle" colSpan="4">
                              <div style={{padding:'10px'}}>
                                  <textarea className="form-control"
                                            rows="15"
                                            style={{width:"100%"}}
                                  ></textarea>
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

export default UserAdd;
