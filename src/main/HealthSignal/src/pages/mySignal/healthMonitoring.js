import React, {useEffect} from 'react';
import axios from "axios";

const HealthMonitoring = () => {
    const [inputHealth, setInputHealth] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);
    //유저정보 불러오기
    const getUserInfo = async () => {
        await axios.post("/api/getuserinfo")
            .then(res=>setUserInfo(res.data))
            .catch(err => console.log(err));
    }

    /* 최근 정보 불러오기 */
    const getInputHealth = () => {
        axios.get(`/api/latestinfo?userNo=${userInfo.userNo}`)
            .then(res=>setInputHealth(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUserInfo()
    }, []);
    useEffect(() => {
        if(userInfo){
        getInputHealth()
        }
    },[userInfo])

    return (
      <main>
        <div className="container px-4">
          <div className="card mb-4">
            <div className="card-header">
              <svg
                className="svg-inline--fa fa-chart-area me-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chart-area"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm96 288H448c17.7 0 32-14.3 32-32V251.8c0-7.6-2.7-15-7.7-20.8l-65.8-76.8c-12.1-14.2-33.7-15-46.9-1.8l-21 21c-10 10-26.4 9.2-35.4-1.6l-39.2-47c-12.6-15.1-35.7-15.4-48.7-.6L135.9 215c-5.1 5.8-7.9 13.3-7.9 21.1v84c0 17.7 14.3 32 32 32z"
                ></path>
              </svg>
              사용자 입력 정보
            </div>
            <div className="card-body">
              <table>
                  <tr>
                      <td style={{width: "100px", padding: '10px'}}>키</td>
                      <td>
                          <input
                              type="text"
                              readOnly
                              value={inputHealth ? inputHealth.iphHeight : null}
                              className="form-control w-100"
                              style={{display: "inline"}}
                          />
                      </td>
                      <td style={{padding: '10px'}}>cm</td>
                  </tr>
                  <tr>
                      <td style={{width: "100px", padding: '10px'}}>몸무게</td>
                      <td>
                          <input
                              type="text"
                              readOnly
                              value={inputHealth ? inputHealth.iphWeight : null}
                              className="form-control w-100"
                              style={{display: "inline"}}
                          />
                      </td>
                      <td style={{padding: '10px'}}>kg</td>
                  </tr>
                  <tr>
                      <td style={{width: "100px", padding: '10px'}}>최고혈압</td>
                      <td>
                          <input
                              type="text"
                              readOnly
                              value={inputHealth ? inputHealth.iphHighPressure : null}
                              className="form-control w-100"
                              style={{display: "inline"}}
                          />
                      </td>
                      <td style={{padding: '10px'}}>mmHg</td>
                  </tr>
                  <tr>
                      <td style={{width: "100px", padding: '10px'}}>최저혈압</td>
                      <td>
                          <input
                              type="text"
                              readOnly
                              value={inputHealth ? inputHealth.iphLowPressure : null}
                              className="form-control w-100"
                              style={{display: "inline"}}
                          />
                      </td>
                      <td style={{padding: '10px'}}>mmHg</td>
                  </tr>
              </table>
            </div>
            <div className="card-footer small text-muted">
                This is the information for {inputHealth ? inputHealth.iphDate : null}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-header">
                  <svg
                    className="svg-inline--fa fa-chart-bar me-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="chart-bar"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                    ></path>
                  </svg>
                  기기 입력 정보
                </div>
                  <div className="card-body">
                      <table>
                          <tr>
                              <td style={{width: "100px", padding: '10px'}}>걸음수</td>
                              <td>
                                  <input
                                      type="text"
                                      readOnly
                                      className="form-control w-100"
                                      style={{display: "inline"}}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td style={{width: "100px", padding: '10px'}}>심박수</td>
                              <td>
                                  <input
                                      type="text"
                                      readOnly
                                      className="form-control w-100"
                                      style={{display: "inline"}}
                                  />
                              </td>
                          </tr>
                      </table>
                  </div>
                  <div className="card-footer small text-muted">
                      Updated yesterday at 11:59 PM
                  </div>
              </div>
            </div>
              <div className="col-lg-6">
                  <div className="card mb-4">
                      <div className="card-header">
                          <svg
                              className="svg-inline--fa fa-chart-pie me-1"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="chart-pie"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              data-fa-i2svg=""
                          >
                              <path
                                  fill="currentColor"
                                  d="M302 240V16.6c0-9 7-16.6 16-16.6C441.7 0 542 100.3 542 224c0 9-7.6 16-16.6 16H302zM30 272C30 150.7 120.1 50.3 237 34.3c9.2-1.3 17 6.1 17 15.4V288L410.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C369.8 495.6 321.8 512 270 512C137.5 512 30 404.6 30 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L318 288H556.4z"
                              ></path>
                          </svg>
                          Pie Chart Example
                      </div>
                      <div className="card-body">
                          <div className="chartjs-size-monitor">
                              <div className="chartjs-size-monitor-expand">
                                  <div className=""></div>
                              </div>
                              <div className="chartjs-size-monitor-shrink">
                      <div className=""></div>
                    </div>
                  </div>
                  <canvas
                    id="myPieChart"
                    width="497"
                    height="248"
                    className="chartjs-render-monitor"
                    style={{
                      display: "block",
                      width: "497px",
                      height: "248px",
                    }}
                  ></canvas>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
};

export default HealthMonitoring;