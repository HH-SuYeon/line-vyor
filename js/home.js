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

  // Product Gallery  스크롤
  document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".home_product-gallery");
    const cards = document.querySelectorAll(".home_product-gallery .home_card");
    let index = 0;
    let interval;

    // 한 번에 하나만 보이게 (CSS 영향 받는 구조 대응)
    cards.forEach((card, i) => {
      card.style.display = i === 0 ? "block" : "none";
    });

    // 다음 카드로 이동
    const showNextCard = () => {
      cards[index].style.display = "none";
      index = (index + 1) % cards.length;
      cards[index].style.display = "block";
    };

    // 자동 재생 시작
    const startSlide = () => {
      interval = setInterval(showNextCard, 6000); // 4초마다 전환
    };

    // 정지
    const stopSlide = () => clearInterval(interval);

    // hover 시 멈춤
    gallery.addEventListener("mouseenter", stopSlide);
    gallery.addEventListener("mouseleave", startSlide);

    // 클릭 시 링크 이동
    cards.forEach((card) => {
      const linkTag = card.querySelector("a");
      if (linkTag) {
        card.addEventListener("click", () => {
          const href = linkTag.getAttribute("href");
          if (href) window.location.href = href;
        });
      }
    });

    startSlide(); // 실행
  });


  //  Contact 텍스트 효과
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

