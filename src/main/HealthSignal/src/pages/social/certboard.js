import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Certboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cmList, setCmList] = useState([]);
    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post("/api/getCL");
            setCmList(res.data);
        };
        fetchData();
    }, []);

    // Calculate the start and end index of items to display on the current page
    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleClickPrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    // Slice cmList to display only items for the current page
    const currentItems = cmList.slice(startIndex, endIndex);

    // Generate page numbers
    const pageNumbers = Array.from({ length: Math.ceil(cmList.length / itemsPerPage) }, (_, index) => index + 1);

    // Function to navigate to Certboard2 component
    const navigateToCertboard2 = () => {
        navigate('/certboard2');
    };

    return (
        <div className="container">
            <button className="btn btn-primary mb-3 my-5" onClick={navigateToCertboard2}>글쓰기</button>
            <div className="row mb-5">
                {currentItems.map((cm, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="card-title text-center">걸음수: {cm.cmntStep}</h6>
                                <h6 className="card-title text-center">아침: {cm.cmntBft}</h6>
                                <h6 className="card-title text-center">점심: {cm.cmntLCH}</h6>
                                <h6 className="card-title text-center">저녁: {cm.cmntDIR}</h6>
                                <hr className="my-3"/>
                                <h6 className="card-title text-center">닉네임: {cm.nickName}</h6>
                                <h6 className="card-title text-center">랭킹: {startIndex + index + 1}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav aria-label="Page navigation example" className="mr-5">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={handleClickPrevious}>Previous</a>
                    </li>
                    {pageNumbers.map(pageNumber => (
                        <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(cmList.length / itemsPerPage) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={handleClickNext}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Certboard;
