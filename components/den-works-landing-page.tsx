"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu, X, InstagramIcon, MailIcon, Twitter as TwitterIcon} from "lucide-react";

import Link from "next/link";

export function DenWorksLandingPageComponent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const formRef = useRef<HTMLFormElement>(null);

  const sections = ["home", "about", "services", "contact"];
  const testimonials = [
    {
      name: "Om kumar",
      company: "Associate Professor",
      text: "Den Works impressively completed the project ahead of schedule without compromising quality. Their efficiency and dedication make them an invaluable asset. Their early completion not only showcased their professionalism but also provided crucial support to my side business, significantly aiding its growth.",
    },
    {
      name: "Sharan Reddy",
      company: "Tech Founder",
      text: "Their expertise was instrumental in jumpstarting my tech startup. Their insights and guidance accelerated our launch beyond expectations. I highly recommend them to any entrepreneur seeking impactful support.",
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = sections.find((section, index) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom =
            index < sections.length - 1
              ? document.getElementById(sections[index + 1])?.offsetTop ||
                document.body.scrollHeight
              : document.body.scrollHeight;
          return (
            scrollPosition >= top - windowHeight / 2 &&
            scrollPosition < bottom - windowHeight / 2
          );
        }
        return false;
      });
      if (newSection) {
        setCurrentSection(newSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      <div
        className="night-sky fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`sparkle sparkle${i + 1}`}></div>
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Den Works Logo" className="h-20" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-lg uppercase transition-colors ${
                  currentSection === section
                    ? "text-white"
                    : "text-gray-500 hover:text-white font-oswald"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-3xl uppercase transition-colors hover:text-gray-300"
                >
                  {section}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 font-oswald"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I N N O V A T E.
              <br />
              C R E A T E.
              <br />
              D E L I V E R.
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-gray-400 font-josefin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              As a top-tier agency, we go the extra mile to achieve excellence in all we do.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 transition-colors text-lg uppercase"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-oswald">About Us</h2>
            <p className="text-2xl mb-8 text-gray-400 font-josefin">
              Welcome to Den Works, your trusted partner in business growth and
              development. We are an agency dedicated to empowering early stage
              business owners to achieve their fullest potential.
            </p>
            <p className="text-2xl text-gray-400 font-josefin">
              At Den Works, we are a team of passionate founders who came
              together with a single vision: to empower small business owners
              like you. Drawing from our diverse experiences across various
              industries, we understand the unique challenges that entrepreneurs
              face. This firsthand knowledge inspired us to create an agency
              dedicated to providing tailored strategies and comprehensive
              support to help your business thrive.
            </p>
            <br />
            <p className="text-2xl text-gray-400 font-josefin">
              Our journey began when we recognized the need for accessible,
              high-quality services specifically designed for small businesses.
              We've been in your shoes, and we know how crucial it is to have a
              trusted partner by your side. That's why we're committed to
              delivering real results that make a meaningful difference in your
              business.
            </p>
            <br />
            <p className="text-2xl text-gray-400 font-josefin">
              We're not just consultants; we're your collaborators in success.
              At Den Works, we believe that when small businesses flourish,
              entire communities benefit. Join us, and let's work together to
              turn your vision into reality.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center font-oswald">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-josefin">
              {[
                {
                  title: "Web Development",
                  desc: "We transform your ideas into dynamic, high-performance websites tailored specifically to your goals. Our cutting-edge web solutions are designed to engage your audience and set you apart in the digital landscape.",
                },
                {
                  title: "UI/UX Design",
                  desc: "We craft intuitive and visually stunning designs that offer seamless user experiences. Our focus is on creating interfaces that are not only beautiful but also deeply resonate with your users, keeping them engaged and satisfied.",
                },
                {
                  title: "Digital Marketing",
                  desc: "Our innovative digital marketing strategies amplify your online presence and accelerate your growth. We specialize in connecting you with your target audience, boosting engagement, and driving measurable results that propel your business forward.",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="border border-gray-800 p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </motion.div>
              ))}
            </div>
            <br />
            <br />
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-oswald">
                What Our Clients Say
              </h2>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="border border-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
                  >
                    <p className="text-base md:text-lg mb-4 text-gray-200 font-josefin">
                      {testimonials[currentTestimonial].text}
                    </p>
                    <p className="font-semibold text-purple-300 font-josefin">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-pink-300 font-josefin">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="max-w-2xl mx-auto w-full px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center font-oswald">
              Talk Over Coffee?
            </h2>
            
            <div className="  font-josefin">
              
              <div className="text-center mt-8">
                <h3 className="text-xl mb-4">Connect with us on social media or drop us an email.</h3>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://twitter.com/__denworks__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com/den.works"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:den.works.17@proton.me"
                    className="text-gray-400 hover:text-white"
                  >
                    <MailIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8   relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Den Works. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .night-sky {
          background: radial-gradient(
            ellipse at bottom,
            #1b2735 0%,
            #090a0f 100%
          );
        }

        .shooting-star {
          position: fixed;
          width: 200px;
          height: 1.5px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 20%,
            rgba(255, 255, 255, 0.3) 40%,
            transparent 100%
          );
          animation: shoot 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
          transform-origin: right center;
        }

        .shooting-star:nth-child(1) {
          top: 15%;
          right: 30%;
          animation-delay: 0s;
          transform: rotate(-35deg);
        }

        .shooting-star:nth-child(2) {
          top: 35%;
          right: 45%;
          animation-delay: 1.6s;
          transform: rotate(-25deg);
        }

        .shooting-star:nth-child(3) {
          top: 55%;
          right: 25%;
          animation-delay: 3.2s;
          transform: rotate(-30deg);
        }

        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(-35deg) scale(0.3);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          60% {
            transform: translateX(-35vw) translateY(35vh) rotate(-35deg)
              scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-70vw) translateY(70vh) rotate(-35deg)
              scale(0.3);
            opacity: 0;
          }
        }

        .sparkle {
          position: fixed;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: white;
          animation: sparkleFloat 6s ease-in-out infinite;
          box-shadow: 0 0 4px #fff, 0 0 8px #fff, 0 0 12px #fff;
        }

        .sparkle1 {
          left: 10%;
          top: 15%;
          animation-delay: 0s;
        }
        .sparkle2 {
          left: 20%;
          top: 35%;
          animation-delay: 0.3s;
        }
        .sparkle3 {
          left: 30%;
          top: 55%;
          animation-delay: 0.6s;
        }
        .sparkle4 {
          left: 40%;
          top: 25%;
          animation-delay: 0.9s;
        }
        .sparkle5 {
          left: 50%;
          top: 45%;
          animation-delay: 1.2s;
        }
        .sparkle6 {
          left: 60%;
          top: 65%;
          animation-delay: 1.5s;
        }
        .sparkle7 {
          left: 70%;
          top: 20%;
          animation-delay: 1.8s;
        }
        .sparkle8 {
          left: 80%;
          top: 40%;
          animation-delay: 2.1s;
        }
        .sparkle9 {
          left: 90%;
          top: 60%;
          animation-delay: 2.4s;
        }
        .sparkle10 {
          left: 15%;
          top: 75%;
          animation-delay: 2.7s;
        }
        .sparkle11 {
          left: 25%;
          top: 85%;
          animation-delay: 3s;
        }
        .sparkle12 {
          left: 35%;
          top: 10%;
          animation-delay: 3.3s;
        }
        .sparkle13 {
          left: 45%;
          top: 30%;
          animation-delay: 3.6s;
        }
        .sparkle14 {
          left: 55%;
          top: 50%;
          animation-delay: 3.9s;
        }
        .sparkle15 {
          left: 65%;
          top: 70%;
          animation-delay: 4.2s;
        }
        .sparkle16 {
          left: 75%;
          top: 15%;
          animation-delay: 4.5s;
        }
        .sparkle17 {
          left: 85%;
          top: 35%;
          animation-delay: 4.8s;
        }
        .sparkle18 {
          left: 95%;
          top: 55%;
          animation-delay: 5.1s;
        }
        .sparkle19 {
          left: 5%;
          top: 45%;
          animation-delay: 5.4s;
        }
        .sparkle20 {
          left: 95%;
          top: 25%;
          animation-delay: 5.7s;
        }

        @keyframes sparkleFloat {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(0, -30px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
