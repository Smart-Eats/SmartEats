import React, { useEffect, useState } from "react";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText/ShinyText";
import styles from "./HomePage.module.css";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import AnimatedContent from "./AnimatedContent/AnimatedContent";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "../ui/animated-modal";
import { useNavigate } from "react-router-dom";


const HomePageContent = () => {
  const navigate = useNavigate();
  const { setOpen } = useModal();

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <ModalBody>
  <ModalContent className="text-center p-10 bg-white rounded-3xl shadow-2xl max-w-lg mx-auto animate-fade-in scale-100">
    <div className="mb-6">
      <h2 className="text-4xl font-extrabold text-emerald-600 leading-tight tracking-tight">
        🛡️ Let’s Personalize Your Health!
      </h2>
      <p className="text-gray-700 mt-4 text-base sm:text-lg font-medium leading-relaxed">
        Your journey to smarter, healthier eating starts here. 🚀
        <br />
        This is <span className="text-rose-500 font-semibold">essential</span> to unlock your experience.
      </p>
    </div>

    <div className="mb-6">
      <img
        src="/Images/modal/restriction.png"
        alt="Health Form Illustration"
        className="w-48 h-48 mx-auto animate-bounce-slow"
      />
    </div>

    <button
      onClick={() => {
        navigate("/layout/health-form");
      }}
      className="text-black border-2 bg-yellow-200 border-red-500 font-bold text-lg px-10 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"

    >
      📝 Start Now – Fill This Form
    </button>

    {/* Optional footer message to subtly enforce */}
    <p className="text-sm text-red-800 mt-4 italic ">
      This is required to continue using Smart Eats.
    </p>
  </ModalContent>
</ModalBody>

  );
};

const HomePage = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  const velocity = 50;
  return (
    <div className={styles.fullPageHero}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1 className={styles.headline}>
              <span className={styles.headlineMain}>
                <ShinyText
                  text="Smart Eats"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </span>
              <span className={styles.headlineSub}>
                <BlurText
                  text="Nutrition Reimagined"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl mb-8"
                />
              </span>
            </h1>
            <TextGenerateEffect
              words="Your personal nutrition coach powered by AI. Eat smart, live better. Start your journey toward a healthier life today with our personalized meal plans."
              className={styles.description}
            />

            <div className={styles.buttonGroup}>
              <Link to="/layout/nutrition-finder">
                <button className={styles.primaryBtn}>
                  <ShinyText
                    text="Nutrition Finder"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                  />
                </button>
              </Link>
              <Link to="/layout/upload">
                <button className={styles.secondaryBtn}>
                  <ShinyText
                    text="Uplaod Image Now"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                  />
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <AnimatedContent
              distance={150}
              direction="horizontal"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <img
                src="/Images/pine/main_img.png"
                alt="Healthy food"
                className={styles.foodImage}
              />
            </AnimatedContent>
          </div>
        </div>
      </div>
      <Modal>
        <HomePageContent />
      </Modal>
    </div>
  );
};

export default HomePage;
