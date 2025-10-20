// ================= Fade-in Scroll Observer (재등장 가능) =================
(function () {
  // jQuery와 충돌 방지 (IIFE + $ 미사용)
  document.addEventListener("DOMContentLoaded", function () {
    const fadeItems = document.querySelectorAll(".fade-item");
    if (!fadeItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            // 화면에서 벗어나면 다시 초기화 (재등장 가능)
            entry.target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.3, // 30% 보이면 활성화
      }
    );

    fadeItems.forEach((el) => observer.observe(el));
  });

  // ================= Scroll Indicator + Arrows Hide Control =================
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const logoImg = document.querySelector(".logo img");
    const scrollIndicator = document.getElementById("scrollIndicator");
    const arrows = document.querySelector(".arrows");
    const hero = document.getElementById("hero");
    const intro = document.querySelector("#intro");

    if (!header || !hero || !intro || !scrollIndicator || !arrows || !logoImg)
      return;

    // 위치 정보 가져오기
    const heroRect = hero.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();

    // hero가 화면 안에 있을 때 true
    const heroVisible =
      heroRect.top < window.innerHeight && heroRect.bottom > 0;

    // intro가 화면에 닿기 시작하면 true
    const introVisible = introRect.top <= window.innerHeight * 0.9;

    // 조건에 따라 표시 / 숨김
    if (heroVisible && !introVisible) {
      scrollIndicator.classList.remove("hide");
      arrows.classList.remove("hide");
    } else {
      scrollIndicator.classList.add("hide");
      arrows.classList.add("hide");
    }

    // 스크롤 시 헤더 로고 및 배경 변경
    if (window.scrollY > 150) {
      header.classList.add("scrolled");
      logoImg.src = "/img/etc/logo/logo2.png";
    } else {
      header.classList.remove("scrolled");
      logoImg.src = "/img/etc/logo/logo1.png";
    }
  });
})();
