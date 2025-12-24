import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router";

import HeroGradient from "../../components/HeroGradient/HeroGradient";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";

import { projectsKR as projects } from "./projectsKR";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";
import { RiArrowRightDownLine } from "react-icons/ri";

const HomeKR = () => {
    const manifestoRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("nvh@gmail.com");
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    useEffect(() => {
        const scrollTimeout = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }, 0);

        return () => clearTimeout(scrollTimeout);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: ".footer",
            start: "top 80%",
            onEnter: () => {
                document.querySelector(".footer").classList.add("light");
            },
            onLeaveBack: () => {
                document.querySelector(".footer").classList.remove("light");
            },
        });

        if (!isMobile) {
            gsap.set(".project", { opacity: 0.35 });
        }

        if (!isMobile) {
            const projects = document.querySelectorAll(".project");

            projects.forEach((project) => {
                const projectImg = project.querySelector(".project-img img");

                project.addEventListener("mouseenter", () => {
                    gsap.to(project, {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    });

                    gsap.to(projectImg, {
                        scale: 1.2,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                });

                project.addEventListener("mouseleave", () => {
                    gsap.to(project, {
                        opacity: 0.35,
                        duration: 0.5,
                        ease: "power2.out",
                    });

                    gsap.to(projectImg, {
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                });
            });
        }

        const manifestoText = new SplitType(".manifesto-title h1", {
            types: ["words", "chars"],
            tagName: "span",
            wordClass: "word",
            charClass: "char",
        });

        const style = document.createElement("style");
        style.textContent = `
       .word {
         display: inline-block;
         margin-right: 0em;
       }
       .char {
         display: inline-block;
       }
     `;
        document.head.appendChild(style);

        gsap.set(manifestoText.chars, {
            opacity: 0.25,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".manifesto",
                start: "top 35%",
                end: "bottom 75%",
                scrub: true,
                markers: false,
            },
        });

        manifestoText.chars.forEach((char, index) => {
            tl.to(
                char,
                {
                    opacity: 1,
                    duration: 0.1,
                    ease: "none",
                },
                index * 0.1
            );
        });

        gsap.to(".marquee-text", {
            scrollTrigger: {
                trigger: ".marquee",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                markers: false,
                onUpdate: (self) => {
                    const moveAmount = self.progress * -1000;
                    gsap.set(".marquee-text", {
                        x: moveAmount,
                    });
                },
            },
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            manifestoText.revert();
            style.remove();
        };
    }, [isMobile]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const rows = document.querySelectorAll(".row");
        const isMobileView = window.innerWidth <= 900;

        const getStartX = (index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            return direction * (isMobileView ? 150 : 300);
        };

        if (rows.length > 0) {
            rows.forEach((row, index) => {
                const existingTrigger = ScrollTrigger.getAll().find(
                    (st) => st.trigger === ".gallery" && st.vars?.targets === row
                );
                if (existingTrigger) {
                    existingTrigger.kill();
                }

                const startX = getStartX(index);

                gsap.set(row, { x: startX });

                gsap.to(row, {
                    scrollTrigger: {
                        trigger: ".gallery",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: isMobileView ? 0.5 : 1,
                        onUpdate: (self) => {
                            const moveAmount = startX * (1 - self.progress);
                            gsap.set(row, {
                                x: moveAmount,
                            });
                        },
                    },
                });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [isMobile]);

    return (
        <ReactLenis root>
            <div className="home">
                <Cursor />
                <NavBar lang="KR" />
                <section className="hero" id="hero">
                    <HeroGradient />
                    <div className="header-container">
                        <div className="header h-1">
                            <h1>Crafted to Move,</h1>
                            <h1>Designed to Inspire</h1>
                        </div>
                        <div className="header h-2">
                            <h1>Ideas Unleashed,</h1>
                            <h1>Boundaries Broken</h1>
                        </div>
                        <div className="header h-3">
                            <h1>Khơi nguồn sáng tạo,</h1>
                            <h1>Phá bỏ giới hạn</h1>
                        </div>
                        <div className="header h-4" style={{ fontWeight: 'bold' }}>
                            <h1>비전을 잇다,</h1>
                            <h1>한계를 넘는다</h1>
                        </div>
                        <div className="header h-5">
                            <h1>Live by design,</h1>
                            <h1>Not by default</h1>
                        </div>
                    </div>
                </section>

                <section className="work" id="work">
                    <div className="container">
                        <div className="work-header">
                            <HiArrowRight size={13} />
                            <p>주요 프로젝트</p>
                        </div>

                        <div className="projects">
                            <div className="project-col">
                                {projects
                                    .filter((project) => project.column === 1)
                                    .map((project) => (
                                        <Link to="/work" key={project.id}>
                                            <div className="project">
                                                <div className="project-img">
                                                    <img src={project.image} alt="Project Thumbnail" />
                                                </div>
                                                <div className="project-name">
                                                    <h2>{project.title}</h2>
                                                </div>
                                                <div className="project-description">
                                                    <p>{project.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <div className="project-col">
                                {projects
                                    .filter((project) => project.column === 2)
                                    .map((project) => (
                                        <Link to="/work" key={project.id}>
                                            <div className="project">
                                                <div className="project-img">
                                                    <img src={project.image} alt="Project Thumbnail" />
                                                </div>
                                                <div className="project-name">
                                                    <h2>{project.title}</h2>
                                                </div>
                                                <div className="project-description">
                                                    <p>{project.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        <div className="cta-btn" style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "8em" }}>
                            <Link to="/work">
                                <button style={{ color: "white" }}>프로젝트 더 보기</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta-bg-img">
                        <img src="/cta/cta-bg.png" alt="" />
                    </div>
                    <div className="cta-title">
                        <p>저의 공간에 오신 것을 환영합니다</p>
                    </div>
                    <div className="cta-header">
                        <h2>
                            안녕하세요! 저는 베트남에서 왔으며
                            한국에서 그래픽 디자인을 전공하고 있는 호안이라고 합니다.
                        </h2>
                    </div>
                    <div className="cta-btn">
                        <button>저에 대해 알아보기</button>
                    </div>
                </section>

                <section className="manifesto" id="manifesto" ref={manifestoRef}>
                    <div className="container">
                        <div className="manifesto-header">
                            <HiArrowRight size={13} />
                            <p>선언</p>
                        </div>
                        <div className="manifesto-title">
                            <h1>
                                시각적으로 매력적이고 의미 있는 경험을 창조하려는 깊은 열정으로 움직입니다.
                                창의성, 전략, 최첨단 기술의 융합에 중점을 둡니다.
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="processes">
                    <div className="container">
                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>통합</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-1.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        창의성에 뿌리를 두고, 문화의 가교 역할을 하며 시공간을 초월하는 디자인을 만듭니다.
                                        다양한 관점을 하나의 비전으로 통합하며 아이디어의 교차점에서 성장합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>협업</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-2.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        창의성은 집단적인 과정입니다. 협업은 저의 토대이며,
                                        아이디어, 재능, 비전을 융합하여 보편적으로 공감할 수 있는 경험을 창조합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>도전</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-3.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        관습에 도전하고 가능성을 재정의합니다.
                                        과감하게 경계를 허물고 대담하고 임팩트 있는 솔루션을 제공합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="marquee">
                    <div className="marquee-text">
                        <h1>nvh.com에서 더 보기</h1>
                    </div>
                </div>

                <section className="showreel">
                    <VideoPlayer />
                </section>

                <section className="about" id="about">
                    <div className="container">
                        <div className="about-col">
                            <div className="about-header">
                                <HiArrowRight size={13} />
                                <p>정신</p>
                            </div>
                            <div className="about-copy">
                                <p>
                                    저의 정신은 경계 없는 창의성을 구현합니다.
                                    꿈꾸는 자, 새로운 탐험가, 익숙한 곳으로 돌아오는 이 등,
                                    상상할 용기가 있는 모든 분을 환영합니다.
                                    저와의 협업은 영감, 화합, 무한한 잠재력을 포용하는 것을 의미합니다.
                                </p>
                            </div>
                        </div>
                        <div className="about-col">
                            <div className="cta-btn">
                                <button>nvh.com에서 더 보기</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="gallery">
                    <div className="gallery-wrapper">
                        <div className="row">
                            <div className="img">
                                <img src="/marquee/img1.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img2.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img3.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img4.jpeg" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="img">
                                <img src="/marquee/img5.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img6.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img7.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img8.jpeg" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="img">
                                <img src="/marquee/img9.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img10.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img11.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img12.jpeg" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="img">
                                <img src="/marquee/img13.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img14.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img15.jpeg" alt="" />
                            </div>
                            <div className="img">
                                <img src="/marquee/img16.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>



                <section className="footer" id="contact">
                    <div className="container">
                        <div className="footer-header">
                            <HiArrowRight />
                            <p>연락처</p>
                        </div>

                        <div className="footer-title">
                            <h1 style={{ fontSize: "2em" }}>새로운 기회는 언제나 환영입니다!</h1>
                        </div>

                        <div className="footer-email">
                            <p>대화 시작하기</p>
                            <h2 onClick={handleCopyEmail} style={{ cursor: "pointer" }}>
                                {isCopied ? "메일 주소가 복사되었습니다!" : "nvh@gmail.com"}
                            </h2>
                        </div>

                        <div className="footer-content">
                            <div className="footer-col">
                                <div className="footer-col-header">
                                    <p>일상 엿보기</p>
                                </div>
                                <div className="footer-sub-col" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <p>Instagram</p>
                                    <p>LinkedIn</p>
                                    <p>Twitter</p>
                                    <p>Behance</p>
                                    <p>Dribbble</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </ReactLenis>
    );
};

export default Transition(HomeKR);
