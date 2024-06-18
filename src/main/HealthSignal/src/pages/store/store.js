import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Store = () => {
    const navigate = useNavigate();
    // 한 페이지에 보여줄 갤수
    const pageSize = 20;
    // 한 페이지 그룹당 페이지 수
    const pagePerGroup = 10;

    const [pageGroup, setPageGroup] = useState([]);

    // 현재 페이지 그룹
    const [currentPageGroup, setCurrentPageGroup] = useState(1)
    // 물품의 총 개수
    const [storeCount, setStoreCount] = useState(0);
    // 물건 목록
    const [storeList, setStoreList] = useState([]);
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 총 페이지
    const [totalPageCount, setTotalPageCount] = useState(0);

    // 현재 카테고리
    const [category, setCategory] = useState("전체");

    // 물품의 총 개수(페이지 버튼 개수 정하는데 필요)
    const getStoreCnt = (category) => {
        if (category == "전체") {
            axios.post("/api/storecount", {
                strCategory: null
            }).then(res => {
                setStoreCount(res.data);
            })
        } else {
            axios.post("/api/storecount", {
                strCategory: category
            }).then(res => {
                setStoreCount(res.data);
            })
        }

    }

    const getStoreList = (category) => {
        if (category == "전체") {
            axios.post("api/storelist", {
                pageSize: pageSize,
                currentPage: (currentPage - 1) * pageSize
            }).then(res => {
                setStoreList(res.data);
            })
        } else {
            axios.post("api/storelist", {
                strCategory: category,
                pageSize: pageSize,
                currentPage: (currentPage - 1) * pageSize
            }).then(res => {
                setStoreList(res.data);
            })
        }
    }

    useEffect(() => {
        getStoreCnt(category);
        getStoreList(category);
    }, [category]);

    useEffect(() => {
        // 총 페이지의 개수
        setTotalPageCount(Math.ceil(storeCount / pageSize));
        getStoreList(category);
    }, [storeCount, currentPage]);

    useEffect(() => {
        MakePageGroup();
    }, [currentPageGroup]);

    const MakePageGroup = () => {

        // 화면에 보여질 페이지의 첫번째 페이지 번호 = ((페이지 그룹 번호 - 1) * 한 화면에 보여줄 페이지의 개수) + 1
        const startPage = ((currentPageGroup - 1) * pagePerGroup) + 1;
        // 화면에 보여질 페이지의 마지막 페이지 번호 = 페이지 그룹 번호 * 한 화면에 보여줄 페이지의 개수
        const endPage = currentPageGroup * pagePerGroup;

        const newPageGroup = [];

        for (let i = startPage; i <= endPage; i++) {
            newPageGroup.push(i);
        }
        setPageGroup(newPageGroup);
        setCurrentPage(startPage);
    }
    const goPreviousGroup = () => {
        if (currentPageGroup > 1) {
            setCurrentPageGroup(currentPageGroup - 1);
        }
    }

    const goNextGroup = () => {
        if (currentPageGroup * pagePerGroup < totalPageCount) {
            setCurrentPageGroup(currentPageGroup + 1);
        }
    }

    const goButtonPage = (e) => {
        setCurrentPage(e.target.innerText);
        e.target.classList.add('active');
    }

    const goChangeCategory = (e) => {
        setCategory(e.target.innerText.replace("check", ""));
        setCurrentPage(1);
        setCurrentPageGroup(1);
    }

    useEffect(() => {
        console.log(storeList)
    }, [storeList]);


    return (
        <div className="store">
            <div className="text-center mb-3 my-4 mb-4 fs-5">
                <button className="categoryBtn" onClick={goChangeCategory}><span className="material-icons">{category == "전체" ? 'check' : null}</span>전체</button>
                <button className="categoryBtn" onClick={goChangeCategory}><span className="material-icons">{category == "영양제" ? 'check' : null}</span>영양제</button>
                <button className="categoryBtn" onClick={goChangeCategory}><span className="material-icons">{category == "운동기구" ? 'check' : null}</span>운동기구</button>
            </div>

            <div className="container">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        storeList.map((v, i) => {
                            const title = v.strName.replace(/<[^>]*>?/gm, '');
                            const price = v.strPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            return (
                                <div className="col mb-5" key={i}>
                                    <div className="card h-100">
                                        <img className="card-img-top border-bottom" src={v.strImg} alt="..."
                                             style={{height: '50%'}}/>
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder card-title"
                                                    style={{fontSize: "80%"}}>{title}</h5>
                                                <p className="card-text">{price}원</p>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 bg-transparent">
                                            <div className="text-center pt-2">
                                                <a className="btn btn-outline-dark mt-auto">
                                                    View options
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="pagination justify-content-center" style={{cursor:"pointer"}}>
                            <li className="page-item"><a className="page-link" onClick={goPreviousGroup}>Previous</a></li>
                            {
                                pageGroup.map((v, i) => {
                                    return <li className={currentPage == v ? 'page-item active' : 'page-item'} key={i} onClick={goButtonPage}><a className="page-link" >{v}</a></li>
                                })
                            }
                            <li className="page-item"><a className="page-link" onClick={goNextGroup}>Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;