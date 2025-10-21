document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".fade-item").forEach((el) => observer.observe(el));
});

// ================= Scroll Indicator + Arrows + Header Control =================
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const scrollIndicator = document.getElementById("scrollIndicator");
  const arrows = document.querySelector(".arrows");
  const hero = document.getElementById("hero");
  const intro = document.querySelector(".brand-intro");

  if (!hero || !intro || !scrollIndicator || !arrows) return;

  const heroRect = hero.getBoundingClientRect();
  const introRect = intro.getBoundingClientRect();

  const heroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
  const introVisible = introRect.top <= window.innerHeight * 0.9;

  if (heroVisible && !introVisible) {
    scrollIndicator.classList.remove("hide");
    arrows.classList.remove("hide");
  } else {
    scrollIndicator.classList.add("hide");
    arrows.classList.add("hide");
  }

  // ✅ 팀 헤더 기준으로 클래스명 변경 (.dark_header 사용)
  if (window.scrollY > 150) {
    header.classList.add("dark_header");
  } else {
    header.classList.remove("dark_header");
  }
});
