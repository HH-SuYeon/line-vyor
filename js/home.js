$(document).on("loadPageComplete", function (e, pageName) {
  if (pageName !== "home") return;

  const home_hero = document.getElementById("home_hero");
  const home_scrollIndicator = document.getElementById("home_scrollIndicator");
  const home_arrows = document.querySelector(".home_arrows");
  const home_intro = document.getElementById("home_intro");

  // IntersectionObserver (페이드인 효과)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("home_active");
        else entry.target.classList.remove("home_active");
      });
    },
    { threshold: 0.3 }
  );
  document
    .querySelectorAll(".home_fade-item")
    .forEach((el) => observer.observe(el));

  // 스크롤 인디케이터 + 화살표 제어
  window.addEventListener("scroll", () => {
    if (!home_hero || !home_intro || !home_scrollIndicator || !home_arrows)
      return;

    const heroRect = home_hero.getBoundingClientRect();
    const introRect = home_intro.getBoundingClientRect();
    const heroVisible =
      heroRect.top < window.innerHeight && heroRect.bottom > 0;
    const introVisible = introRect.top <= window.innerHeight * 0.9;

    if (heroVisible && !introVisible) {
      home_scrollIndicator.classList.remove("home_hide");
      home_arrows.classList.remove("home_hide");
    } else {
      home_scrollIndicator.classList.add("home_hide");
      home_arrows.classList.add("home_hide");
    }
  });

  // Product Gallery 자동 스크롤
  const home_gallery = document.querySelector(".home_product-gallery");
  let home_scrollInterval;
  if (home_gallery) {
    home_gallery.addEventListener("mouseenter", () => {
      home_scrollInterval = setInterval(() => {
        home_gallery.scrollLeft += 1;
      }, 15);
    });
    home_gallery.addEventListener("mouseleave", () => {
      clearInterval(home_scrollInterval);
    });
  }

  // ✅ Contact 텍스트 효과
  const fadeItems = document.querySelectorAll(".fade-item");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.3 }
  );
  fadeItems.forEach((item) => io.observe(item));
});
