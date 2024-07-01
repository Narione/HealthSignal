import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const UserAdd = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  //글요소
  const [title, setTitle] = useState("");
  const [publicYN, setPublicYN] = useState("");
  const [content, setContent] = useState("");

  // 첨부파일 관련
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(()=>{
    console.log("selectedFile",selectedFile)
  },[selectedFile])

  //핸들러
  const titleOnChangeHandler = useCallback((e)=>{
    setTitle(e.target.value);
  },[])

  const publicOnChangeHandler = useCallback((e)=>{
    setPublicYN(e.target.value);
  },[])

  const contentOnChangeHandler = useCallback((e)=>{
    setContent(e.target.value);
  },[])

  const fileOnChangeHandler = useCallback((e) => {
    setSelectedFile(e.target.files);
  }, []);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수
    getUserInfo();
  }, []);

  // 로그인 정보 불러오기
  const getUserInfo = async () => {
    await axios.post("/api/getuserinfo").then((res) => {
      setUserInfo(res.data);
      console.log("세션정보", res.data);
    });
  };

  // 질문글 추가하기
  const goAddQuestion=async ()=>{

    if(publicYN == ""){
      alert("공개여부를 선택해주세요.");
      return;
    }

    await axios.post("/api/question/add",{
      userNo: userInfo.userNo,
      queTitle:title,
      queContent:content,
      quePublic:publicYN
    }).then((res) => {
      console.log("adding result: ",res.data);
      if(res.data === 1){
        navigate("/qna/list")
      }
    })

    uploadSelectFile();

  }

  /* 첨부파일 관련 함수 */
  const uploadSelectFile = () => {
    const formData = new FormData();

    // for...of 루프로 파일을 formData에 추가
    for (const [index, file] of Array.from(selectedFile).entries()) {
      formData.append(`file${index}`, file);
    }

    axios.post("/api/question/file/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log('Files uploaded successfully:', res.data);
          // 업로드 성공 후 추가 로직 처리
        })
        .catch(err => {
          console.error('File upload error:', err);
          // 업로드 실패 후 추가 로직 처리
        });
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        // setUserPreview(reader.result);
        resolve();
      };
    });
  };

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
                        <input className="form-control" type="text" onChange={titleOnChangeHandler}/>
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
                              onChange={publicOnChangeHandler}
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
                              onChange={publicOnChangeHandler}
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
                          onChange={fileOnChangeHandler}
                          accept=".jpg, .png, .gif"
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
                                            style={{width:"100%", resize:"none"}}
                                            onChange={contentOnChangeHandler}
                                  ></textarea>
                              </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{margin:'10px', textAlign:'right'}}>
            <button type="button" className="btn btn-primary" onClick={goAddQuestion}>글 등록</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdd;
