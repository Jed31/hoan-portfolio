import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./NavBar.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";

const NavBar = ({ lang = "EN" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);

  const translations = {
    EN: {
      work: "Work",
      manifesto: "Manifesto",
      spirit: "Spirit",
      contact: "Contact",
    },
    VN: {
      work: "Dự án",
      manifesto: "Tuyên ngôn",
      spirit: "Tinh thần",
      contact: "Liên hệ",
    },
    KR: {
      work: "작품",
      manifesto: "선언",
      spirit: "정신",
      contact: "연락처",
    },
  };

  const t = translations[lang] || translations.EN;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        gsap.to(navbarRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(navbarRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === ".footer") {
        trigger.kill();
      }
    });

    ScrollTrigger.create({
      trigger: ".footer",
      start: isMobile ? "top 90%" : "top 80%",
      end: "bottom top",
      onEnter: () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.add("dark");
      },
      onLeaveBack: () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.remove("dark");
      },
      onRefresh: () => {
        const navbar = document.querySelector(".navbar");
        const footerBounds = document
          .querySelector(".footer")
          ?.getBoundingClientRect();
        if (navbar && footerBounds) {
          const triggerPoint = window.innerHeight * (isMobile ? 0.9 : 0.8);
          if (footerBounds.top <= triggerPoint) {
            navbar.classList.add("dark");
          } else {
            navbar.classList.remove("dark");
          }
        }
      },
    });

    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop;
          const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;

          window.scrollTo({
            top: targetPosition - navbarHeight,
            behavior: "smooth",
          });
        }
      }
    };

    const links = document.querySelectorAll(".nav-links a, .logo a");
    links.forEach((link) => {
      link.removeEventListener("click", handleClick);
      link.addEventListener("click", handleClick);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".footer") {
          trigger.kill();
        }
      });
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [isMobile]);

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero">
            <h3>NVH's</h3>
            <span>home</span>
          </a>
        </div>

        <div className="nav-items">
          <div className="langs">
            <Link to="/">
              <p className={lang === "EN" ? "current-lang" : ""}>EN</p>
            </Link>
            <Link to="/vn">
              <p className={lang === "VN" ? "current-lang" : ""}>VN</p>
            </Link>
            <Link to="/kr">
              <p className={lang === "KR" ? "current-lang" : ""}>KR</p>
            </Link>
          </div>

          <div className="nav-links">
            <a href="#work">
              <p>{t.work}</p>
            </a>
            <a href="#manifesto">
              <p>{t.manifesto}</p>
            </a>
            <a href="#about">
              <p>{t.spirit}</p>
            </a>
            <a href="#contact">
              <p>{t.contact}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
