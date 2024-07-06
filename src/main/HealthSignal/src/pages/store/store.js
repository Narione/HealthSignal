import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Store = () => {
    const navigate = useNavigate();
    const pageSize = 20;
    const pagePerGroup = 10;

    const [pageGroup, setPageGroup] = useState([]);
    const [currentPageGroup, setCurrentPageGroup] = useState(1);
    const [storeCount, setStoreCount] = useState(0);
    const [storeList, setStoreList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [category, setCategory] = useState("전체");

    const getStoreCnt = (category) => {
        axios.post("/api/storecount", { strCategory: category === "전체" ? null : category })
            .then(res => setStoreCount(res.data));
    };

    const getStoreList = (category) => {
        axios.post("/api/storelist", {
            strCategory: category === "전체" ? null : category,
            pageSize: pageSize,
            currentPage: (currentPage - 1) * pageSize
        }).then(res => setStoreList(res.data));
    };

    useEffect(() => {
        getStoreCnt(category);
        getStoreList(category);
    }, [category]);

    useEffect(() => {
        setTotalPageCount(Math.ceil(storeCount / pageSize));
        getStoreList(category);
    }, [storeCount, currentPage]);

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

    const goChangeCategory = (e) => {
        setCategory(e.target.innerText.replace("check", ""));
        setCurrentPage(1);
        setCurrentPageGroup(1);
    };

    useEffect(() => {
        console.log(storeList);
    }, [storeList]);

    return (
        <div className="store">
            <div className="text-center mb-3 my-4 mb-4 fs-5">
                <button className="categoryBtn" onClick={goChangeCategory}>
                    <span className="material-icons">{category === "전체" ? 'check' : null}</span>
                    전체
                </button>
                <button className="categoryBtn" onClick={goChangeCategory}>
                    <span className="material-icons">{category === "영양제" ? 'check' : null}</span>
                    영양제
                </button>
                <button className="categoryBtn" onClick={goChangeCategory}>
                    <span className="material-icons">{category === "운동기구" ? 'check' : null}</span>
                    운동기구
                </button>
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
                                             style={{height: '50%'}} />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder card-title" style={{ fontSize: "80%" }}>{title}</h5>
                                                <p className="card-text">{price}원</p>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 bg-transparent">
                                            <div className="text-center pt-2">
                                                <a className="btn btn-outline-dark mt-auto" href={v.strLink} target="_blank">구매하러 가기</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="pagination justify-content-center" style={{ cursor: "pointer" }}>
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
    );
};

export default Store;
