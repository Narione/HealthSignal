import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QnaView = () => {
  const { ntcNo } = useParams();
  const [notice, setNotice] = React.useState(null);

  // useEffect(() => {
  //   getNoticeView();
  // }, []);
  //
  // const getNoticeView = async () => {
  //   try {
  //     const res = await axios.get(`/api/notice/view/${ntcNo}`);
  //     setNotice(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // 여기에 DB에서 데이터를 불러오는 로직을 추가합니다.
    // 예제 데이터를 사용합니다.
    const fetchedContent = '여기에 매우 긴 글 내용을 추가하세요..ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ';
    setContent(fetchedContent);

    // 글 내용이 길어질 경우 isExpanded를 true로 설정
    if (fetchedContent.length > 100) {// 임의의 길이 조건
      console.log("100 넘음")
      setIsExpanded(true);
    }
  }, []);

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
                    <th style={{fontWeight: "normal"}} colSpan="4">
                      <div
                          style={{fontSize: "25px", fontWeight: "normal"}}
                      >
                        <img src="/images/icon-letter-q.png"
                             style={{width: "50px", height: "50px"}}
                        /> 제목
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="align-middle" style={{width: "15%", fontWeight: "normal", textAlign: "center"}}>작성자
                    </th>
                    <th className="align-middle bg-white" style={{width: "35%", fontWeight: "normal"}}>되나</th>
                    <th className="align-middle" style={{width: "15%", fontWeight: "normal", textAlign: "center"}}>작성일
                    </th>
                    <th className="align-middle bg-white" style={{width: "35%", fontWeight: "normal"}}>되나</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className= {`align-middle ${isExpanded ? 'expanded': ''}`}
                        style={{height: "200px"}}
                        colSpan="4">
                      <div className="d-flex align-items-center">
                        <div className="ms-3 lh-1">
                          <div>
                              {content}
                          </div>
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

        <div className="row answer mt-4">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                  <tr>
                    <th style={{fontWeight: "normal"}} colSpan="4">
                      <div
                          style={{fontSize: "25px", fontWeight: "normal"}}
                      >
                        <img src="/images/icon-letter-a-.png"
                             style={{width: "50px", height: "50px"}}
                        /> 제목
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="align-middle" style={{width: "15%", fontWeight: "normal", textAlign: "center"}}>작성자
                    </th>
                    <th className="align-middle bg-white" style={{width: "35%", fontWeight: "normal"}}>되나</th>
                    <th className="align-middle" style={{width: "15%", fontWeight: "normal", textAlign: "center"}}>작성일
                    </th>
                    <th className="align-middle bg-white" style={{width: "35%", fontWeight: "normal"}}>되나</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={`align-middle ${isExpanded ? 'expanded' : ''}`}
                        style={{height: "200px"}}
                        colSpan="4">
                      <div className="d-flex align-items-center">
                        <div className="ms-3 lh-1">
                          <div>
                            {content}
                          </div>
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
        <div className="container text-right mt-3">
          <button className="btn btn-primary">목록</button>
          <button className="btn btn-secondary ml-2">수정</button>
          <button className="btn btn-danger ml-2">삭제</button>
        </div>
      </div>
    </>
  );
};

export default QnaView;
