import React, {useEffect, useState} from 'react';
import axios from "axios";

const MedicineStore = () => {

    const [storeCount, setStoreCount] = useState(0);
    const [storeList, setStoreList] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const [page, setPage] = useState(1);

    // 물품의 총 개수(페이지 버튼 개수 정하는데 필요)
    const getStoreCnt = () => {
        axios.post("/api/storecount", {
            strCategory: "medicine"
        }).then(res => {
            setStoreCount(res.data);
        })

    }

    const getStoreList = () => {
        axios.post("api/storelist", {
            strCategory: "medicine",
            pageSize: pageSize,
            page: page
        }).then(res => {
            setStoreList(res.data);
        })
    }

    useEffect(async () => {
        await getStoreCnt();
        await getStoreList();
    }, []);

    return (
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {
                storeList.map((v, i) => {
                    return (
                        <div className="col mb-5" key={i}>
                            <div className="card h-100">
                                <img className="card-img-top" src={v.strImg}
                                     alt="..."/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{v.strName}</h5>
                                        {v.strPrice}
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View
                                        options</a></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default MedicineStore;