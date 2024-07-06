import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const HealthMonitoring = () => {
  const [inputHealth, setInputHealth] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  //유저정보 불러오기
  const getUserInfo = async () => {
    await axios
      .post("/api/getuserinfo")
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  };

  /* 최근 정보 불러오기 */
  const getInputHealth = () => {
    axios
      .get(`/api/latestinfo?userNo=${userInfo.userNo}`)
      .then((res) => setInputHealth(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo) {
      getInputHealth();
    }
  }, [userInfo]);

  return (
    <main>
        <div className="container px-4 w-25">
            <div className="row mb-3">
                <div className="col-12 mb-3">
                    <h3 className="text-center menuTitle">건강 모니터링</h3>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <span className="ti-stats-up mr-1" />
                    사용자 입력 정보
                </div>
                <div className="card-body">
                    <table>
                        <tr>
                            <td style={{width: "100px", padding: "10px"}}>키</td>
                            <td>
                                <input
                                    type="text"
                                    readOnly
                                    value={inputHealth ? inputHealth.iphHeight : null}
                                    className="form-control w-100"
                                    style={{display: "inline"}}
                                />
                            </td>
                            <td style={{padding: "10px"}}>cm</td>
                        </tr>
                        <tr>
                            <td style={{width: "100px", padding: "10px"}}>몸무게</td>
                            <td>
                                <input
                                    type="text"
                                    readOnly
                                    value={inputHealth ? inputHealth.iphWeight : null}
                                    className="form-control w-100"
                                    style={{display: "inline"}}
                                />
                            </td>
                            <td style={{padding: "10px"}}>kg</td>
                        </tr>
                        <tr>
                            <td style={{width: "100px", padding: "10px"}}>최고혈압</td>
                            <td>
                                <input
                                    type="text"
                                    readOnly
                                    value={inputHealth ? inputHealth.iphHighPressure : null}
                                    className="form-control w-100"
                                    style={{display: "inline"}}
                                />
                            </td>
                            <td style={{padding: "10px"}}>mmHg</td>
                        </tr>
                        <tr>
                            <td style={{width: "100px", padding: "10px"}}>최저혈압</td>
                            <td>
                                <input
                                    type="text"
                                    readOnly
                                    value={inputHealth ? inputHealth.iphLowPressure : null}
                                    className="form-control w-100"
                                    style={{display: "inline"}}
                                />
                            </td>
                            <td style={{padding: "10px"}}>mmHg</td>
                        </tr>
                    </table>
                </div>
                <div className="card-footer small text-muted">
                    This is the value for{" "}
                    {inputHealth
                        ? moment(inputHealth.iphDate).format("YYYY-MM-DD")
                        : null}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <span className="ti-pulse mr-1"/>
                            기기 입력 정보
                        </div>
                        <div className="card-body">
                            <table>
                                <tr>
                                    <td style={{width: "100px", padding: "10px"}}>걸음수</td>
                                    <td>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control w-100"
                                            style={{display: "inline"}}
                                        />
                                    </td>
                                    <td style={{padding: "10px"}}>걸음2</td>
                                </tr>
                                <tr>
                                    <td style={{width: "100px", padding: "10px"}}>심박수</td>
                                    <td>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control w-100"
                                            style={{display: "inline"}}
                                        />
                                    </td>
                                    <td style={{padding: "10px"}}>bpm</td>
                                </tr>
                            </table>
                            <div className="text-center mt-2">
                                <button className="btn btn-outline-secondary">전송</button>
                            </div>
                        </div>
                        <div className="card-footer small text-muted">
                            This is the value for{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default HealthMonitoring;
