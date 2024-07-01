import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import moment from 'moment';

const QnaList = () => {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);

  /* 페이지네이션 */
  const pageSize = 10;
  const pagePerGroup = 10;

  const [pageGroup, setPageGroup] = useState([]);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);
  const [queCount, setQueCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  /* 검색 기능 */
  const [searchType, setSearchType] = useState("default");
  const [searchWord, setSearchWord] = useState("");

  const searchTypeOnChangeHandler = useCallback((e)=>{
    setSearchType(e.target.value);
  },[])

  const searchWordOnChangeHandler = useCallback((e)=>{
    setSearchWord(e.target.value);
  },[])

  useEffect(() => {
    getQueCnt();
    getQuestionList();
  }, []);

 /* 문의글 개수 불러오기 */
  const getQueCnt = () => {
    axios.post("/api/qna/count",{
      searchType: searchType,
      searchWord: searchWord
    })
        .then(res=>setQueCount(res.data));
  }

  /* 리스트 불러오기 */
  const getQuestionList = async() => {
      await axios.post("/api/question/list",{
        pageSize: pageSize,
        currentPage: (currentPage - 1) * pageSize,
        searchType: searchType,
        searchWord: searchWord
      }).then(res=>setQuestionList(res.data)).catch(err=>console.error(err))
  }

  const printConsole = () => {
    console.log(searchType, searchWord)
  }

  useEffect(() => {
    setTotalPageCount(Math.ceil(queCount / pageSize));
    getQuestionList();
  }, [queCount, currentPage]);

  useEffect(() => {
    MakePageGroup();
  }, [currentPageGroup, totalPageCount]);

  const MakePageGroup = () => {
    const startPage = ((currentPageGroup - 1) * pagePerGroup) + 1;
    const endPage = Math.min(currentPageGroup * pagePerGroup, totalPageCount);
    const newPageGroup = [];

    for (let i = startPage; i <= endPage; i++) {
      newPageGroup.push(i);
    }
    setPageGroup(newPageGroup);
  };

  const goPreviousGroup = () => {
    if (currentPageGroup > 1) {
      setCurrentPageGroup(currentPageGroup - 1);
      setCurrentPage((currentPageGroup - 2) * pagePerGroup + 1);
    }
  };

  const goNextGroup = () => {
    if (currentPageGroup * pagePerGroup < totalPageCount) {
      setCurrentPageGroup(currentPageGroup + 1);
      setCurrentPage(currentPageGroup * pagePerGroup + 1);
    }
  };

  const goButtonPage = (page) => {
    setCurrentPage(page);
  };

  const goSearch= () => {
    getQueCnt();
    getQuestionList();
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
          <select className="form-select" defaultValue="default" style={{width:"10%"}}
                  onChange={searchTypeOnChangeHandler}>
            <option value="default">선택</option>
            <option value="title">제목</option>
            <option value="id">아이디</option>
          </select>
          <input type="text" className="form-control" style={{width:"30%"}}
                 onChange={searchWordOnChangeHandler}
          />
          <button className="btn btn-secondary" type="button" onClick={goSearch}>검색</button>
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
                                <a className="text-inherit text-black text-decoration-none"
                                   onClick={() => {
                                     navigate(`/qna/view/${v.queNo}`)
                                   }}>
                                  {v.queTitle}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <span>{v.userNickname}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span>{moment(v.queCreDate).format('YYYY-MM-DD')}</span>
                          </td>
                          <td className="align-middle text-center">
                            {v.queAnswer == "Y" ? <span style={{color: "blue"}}>답변완료</span> : <span>답변대기</span>}
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
                  onClick={() => {
                    navigate("/qna/user/add")
                  }}
              >
                글 작성
              </button>
            </div>
            {/*페이징 버튼*/}
            <div className="container">
              <div className="row">
                <div className="col">
                  <ul className="pagination justify-content-center" style={{cursor: "pointer"}}>
                    <li className="page-item">
                      <a className="page-link" onClick={goPreviousGroup} href="#">Previous</a>
                    </li>
                    {
                      pageGroup.map((v, i) => (
                          <li
                              className={`page-item ${currentPage === v ? 'active' : ''}`}
                              key={i}
                              onClick={() => goButtonPage(v)}
                          >
                            <a className="page-link" href="#">{v}</a>
                          </li>
                      ))
                    }
                    <li className="page-item">
                      <a className="page-link" onClick={goNextGroup} href="#">Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default QnaList;
