import React from 'react';
import {useParams} from "react-router-dom";

const AdminAdd = () => {
    const { queNo } = useParams();


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
                                        <th className="align-middle bg-white">
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
                                            첨부파일
                                        </th>
                                        <th
                                            className="align-middle bg-white"
                                            style={{fontWeight: "normal" }}
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
                                        <td className="align-middle" colSpan="2">
                                            <div style={{ padding: "10px" }}>
                            <textarea
                                className="form-control"
                                rows="15"
                                style={{ width: "100%", resize: "none" }}
                            ></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style={{ margin: "10px", textAlign: "right" }}>
                            <button type="button" className="btn btn-primary">
                                답변 등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAdd;