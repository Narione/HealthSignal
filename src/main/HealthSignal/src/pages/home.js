import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [index, setIndex] = useState(0);
    const slideInterval = 1800; // Slide transition interval in milliseconds
    const totalSlides = 3; // Total number of slides

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
        }, slideInterval);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [totalSlides, slideInterval]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="body-wrapper">
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null} fade={true}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/assets/G1.png"
                        alt="First slide"
                        style={{ height: 700, objectFit: 'cover' }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/assets/K6.png"
                        alt="Second slide"
                        style={{ height: 700, objectFit: 'cover' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/assets/K5.png"
                        alt="Third slide"
                        style={{ height: 700, objectFit: 'cover' }}
                    />
                </Carousel.Item>
            </Carousel>


            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-6 order-2 order-md-1 text-center text-md-left">
                        <h2 className="text-dark font-weight-bold mb-4">맞춤형 헬스케어 플랫폼 </h2>
                        <h3 className="text-dark mb-4 font-weight-bold ">"헬스 시그널 : Health Signal" </h3>
                    </div>
                    <div className="col-md-6 text-center order-1 order-md-2">
                        <img className="img-fluid" src="images/phone.png" alt="screenshot"/>
                    </div>
                </div>
            </div>
            <section className="section pt-0 position-relative pull-top ">
                <div className="container">
                    <div className=" rounded shadow p-5">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                <i className="ti-pulse text-primary h1"></i>
                                <h3 className="mt-4 text-dark h5">My Signal</h3>
                                <p className="regular text-muted"> 심박수, 혈압, 활동량 등을 실시간으로 측정하고 추적</p>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                <i className="ti-calendar text-primary h1"></i>
                                <h3 className="mt-4  text-dark h5 ">Health Planner</h3>
                                <p className="regular text-muted"> 병력, 투약 내역, 건강검진 결과 등을 종합적으로 관리</p>
                            </div>
                            <div className="col-lg-4 col-md-12 mt-5 mt-lg-0 text-center">
                                <i className="ti-world text-primary h1"></i>
                                <h3 className="mt-4 text-capitalize h5 ">Social Fitness</h3>
                                <p className="regular text-muted"> 친구들의 실시간 운동 데이터를 공유</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service section bg-gray">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Social Fitness</h2>
                                <p>운동에 관심 있는 사용자들이 서로 정보를 교류하고 동기부여를 받을 수 있습니다</p>
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-lg-6 align-self-center">

                            <div className="service-thumb left ">
                                <img className="img-fluid" src="images/feature/iphone-ipad.jpg" alt="iphone-ipad"  />
                            </div>
                        </div>
                        <div className="col-lg-5 mr-auto align-self-center">
                            <div className="service-box">
                                <div className="row align-items-center">
                                    <div className="col-md-6 col-xs-12">
                                        <div className="service-item">
                                            <i className="ti-sharethis"></i>
                                            <h3>운동 계획 공유</h3>
                                            <p>운동 계획을 세우면 친구들과 공유할 수 있고 친구들의 운동 계획도 확인할 수 있습니다</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <div className="service-item">
                                            <i className="ti-plus"></i>
                                            <h3> 친구 추가 및 관리</h3>
                                            <p>운동을 함께 하고 싶은 친구들을 찾아 추가할 수 있고 친구 목록을 관리할 수도 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <div className="service-item">
                                            <i className="ti-cup"></i>
                                            <h3>운동 챌린지</h3>
                                            <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
                                                Curabitur aliquet quam id dui</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <div className="service-item">
                                            <i className="ti-signal"></i>
                                            <h3>실시간 운동 트래킹</h3>
                                            <p>친구들의 실시간 운동 데이터(거리, 시간, 칼로리 등)를
                                                공유하고 서로 모니터링할 수 있습니다</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 m-md-auto align-self-center">
                                <div className="block">
                                    <a href="index.html">
                                        <img src="/images/footerlogo.png" alt="footer-logo" width="230px"/>
                                    </a>
                                    <ul className="social-icon list-inline">
                                        <li className="list-inline-item">
                                            <a href="https://www.facebook.com/themefisher"><i
                                                className="ti-facebook"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="https://twitter.com/themefisher"><i className="ti-twitter"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="https://www.instagram.com/themefisher/"><i
                                                className="ti-instagram"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-5 mt-lg-0">
                                <div className="block-2">
                                    <h6>Product</h6>
                                    <ul>
                                        <li><a href="team.html">Teams</a></li>
                                        <li><a href="blog.html">Blogs</a></li>
                                        <li><a href="FAQ.html">FAQs</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-5 mt-lg-0">
                                <div className="block-2">
                                    <h6>Resources</h6>
                                    <ul>
                                        <li><a href="sign-up.html">Singup</a></li>
                                        <li><a href="sign-in.html">Login</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-5 mt-lg-0">
                                <div className="block-2">
                                    <h6>Company</h6>
                                    <ul>
                                        <li><a href="career.html">Career</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li><a href="team.html">Investor</a></li>
                                        <li><a href="privacy.html">Terms</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-5 mt-lg-0">
                                <div className="block-2">
                                    <h6>Company</h6>
                                    <ul>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li><a href="team.html">Team</a></li>
                                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center bg-dark py-4">
                    <small className="text-secondary">Copyright &copy;
                        <script>document.write(new Date().getFullYear())</script>
                        . Designed &amp; Developed by <a href="https://themefisher.com/">Themefisher</a></small>
                </div>

                <div className="text-center bg-dark py-1">
                    <small className="text-secondary"><p>Distributed By <a
                        href="https://themewagon.com/">Themewagon</a>
                    </p></small>
                </div>
            </footer>


            <div className="scroll-top-to">
                <i className="ti-angle-up"></i>
            </div>
        </div>
    );}