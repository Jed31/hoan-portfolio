import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router";

import HeroGradient from "../../components/HeroGradient/HeroGradient";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";

import { projectsVN as projects } from "./projectsVN";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";
import { RiArrowRightDownLine } from "react-icons/ri";

const HomeVN = () => {
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
                <NavBar lang="VN" />
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
                            <p>Dự án tiêu biểu</p>
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
                                <button style={{ color: "white" }}>Xem thêm dự án</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta-bg-img">
                        <img src="/cta/cta-bg.png" alt="" />
                    </div>
                    <div className="cta-title">
                        <p>Chào mừng đến với không gian của tôi</p>
                    </div>
                    <div className="cta-header">
                        <h2>
                            Xin chào! Tôi là Hoan.
                            Tôi là một nhà thiết kế đến từ Việt Nam và đã du học tại Hàn Quốc.
                        </h2>
                    </div>
                    <div className="cta-btn">
                        <button>Tìm hiểu về tôi</button>
                    </div>
                </section>

                <section className="manifesto" id="manifesto" ref={manifestoRef}>
                    <div className="container">
                        <div className="manifesto-header">
                            <HiArrowRight size={13} />
                            <p>Tuyên ngôn</p>
                        </div>
                        <div className="manifesto-title">
                            <h1>
                                Đam mê sâu sắc trong việc tạo ra những
                                trải nghiệm thị giác đầy cảm xúc và ý nghĩa.
                                Tập trung vào sự hòa quyện giữa sáng tạo, chiến lược và công nghệ tiên tiến.
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="processes">
                    <div className="container">
                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>Hội nhập</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-1.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        Bắt nguồn từ sự sáng tạo, tôi kết nối các nền văn hóa để tạo nên những thiết kế
                                        vượt thời gian và không gian. Tôi phát triển tại giao điểm của những ý tưởng,
                                        hợp nhất các góc nhìn đa dạng thành một tầm nhìn liền mạch.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>Hợp tác</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-2.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        Sáng tạo là một quá trình tập thể. Hợp tác là nền tảng của tôi—kết hợp ý tưởng,
                                        tài năng và tầm nhìn để tạo ra những trải nghiệm vang dội khắp mọi nơi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="process">
                            <div className="process-title">
                                <RiArrowRightDownLine />
                                <p>Thách thức</p>
                            </div>
                            <div className="process-info">
                                <div className="process-icon">
                                    <div className="process-icon-wrapper">
                                        <img src="/processes/icon-3.png" alt="" />
                                    </div>
                                </div>
                                <div className="process-description">
                                    <p>
                                        Tôi thách thức những quy ước và tái định nghĩa những khả năng.
                                        Tôi dám vượt qua các giới hạn, mang đến những giải pháp
                                        táo bạo và đầy tác động.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="marquee">
                    <div className="marquee-text">
                        <h1>Xem thêm tại nvh.com</h1>
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
                                <p>Tinh thần</p>
                            </div>
                            <div className="about-copy">
                                <p>
                                    Tinh thần của tôi là sự sáng tạo không giới hạn.
                                    Dù bạn là người mộng mơ, người khám phá mới hay ai đó
                                    tìm về chốn quen, tôi luôn chào đón những ai dám
                                    tưởng tượng. Hợp tác với tôi là đón nhận nguồn cảm hứng,
                                    sự gắn kết và tiềm năng vô tận.
                                </p>
                            </div>
                        </div>
                        <div className="about-col">
                            <div className="cta-btn">
                                <button>Xem thêm tại nvh.com</button>
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
                            <p>Liên hệ</p>
                        </div>

                        <div className="footer-title">
                            <h1>Liên hệ dự án</h1>
                        </div>

                        <div className="footer-email">
                            <p>Kết nối để cộng tác</p>
                            <h2 onClick={handleCopyEmail} style={{ cursor: "pointer" }}>
                                {isCopied ? "Đã sao chép!" : "nvh@gmail.com"}
                            </h2>
                        </div>

                        <div className="footer-content">
                            <div className="footer-col">
                                <div className="footer-col-header">
                                    <p>Nền tảng khác</p>
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

export default Transition(HomeVN);
