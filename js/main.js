window.currentPage = "home"; // 기본 페이지 이름
$(document).ready(function () {
  // ========== [1] 기본 세팅 ===========
  const main = $("#content");
  const header = $("#header");
  const footer = $("#footer");

  // =========== 공통 헤더/푸터 로드 ============
  header.load("components/header.html", function () {
    $.getScript("js/header.js")
      .done(function () {
        console.log("header.js loaded!");
        if (typeof initHeader === "function") initHeader();
      })
      .fail(function (jqxhr, settings, exception) {
        console.error("header.js load failed", exception);
      });
    footer.load("components/footer.html", function () {
      console.log("푸터 로드 완료");
    });
  });

  // 페이지별 설정
  const pageSettings = {
    home: {
      css: "css/style.css",
      init: function () {
        console.log("home 초기화 완료");
      },
    },
    brand: {
      css: "css/brand.css",
      init: function () {
        console.log("brand 초기화 완료");
      },
    },
    brand_bi: {
      css: "css/brand.css",
      init: function () {
        console.log("brand 초기화 완료");
      },
    },
    product: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    product_body: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    product_body_lotion: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    product_hair: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    product_body_shampoo: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    product_facial: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct();
      },
    },
    rndTechnology: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        initRnd();
      },
    },
    rndResearch: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        initRnd();
      },
    },
    rndProduction: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        initRnd();
      },
    },
    press: {
      css: "css/press.css",
      init: function () {
        console.log("press 초기화 중...");
        initPress();
      },
    },
    press_news: {
      css: "css/press.css",
      init: function () {
        console.log("press 초기화 중...");
        initPress();
      },
    },
    contact: {
      css: "css/contact.css",
      init: function () {
        console.log("contact 초기화 중...");
        initContact();
      },
    },
    contact_address: {
      css: "css/contact.css",
      init: function () {
        console.log("contact 초기화 중...");
        initContact();
      },
    },
    sitemap: {
      css: "css/sitemap.css",
      init: function () {
        console.log("sitemap 초기화 중...");
        initSitemap();
      },
    },
  };

  // 공통 CSS 로드 함수
  function loadPageCSS(cssPath) {
    return new Promise((resolve) => {
      if (!cssPath) return resolve();
      const id = cssPath.replace(/[^\w]/g, "_"); // 파일명 기반 고유 ID
      if ($(`#${id}`).length === 0) {
        $("<link>", {
          rel: "stylesheet",
          href: cssPath,
          id: id,
        })
          .appendTo("head")
          .on("load", () => {
            console.log(cssPath + " 로드 완료");
            resolve();
          });
      } else {
        resolve(); // 이미 로드된 경우
      }
    });
  }

  // 페이지 로드 함수
  async function loadPage(pageName) {
    window.currentPage = pageName;
    const settings = pageSettings[pageName] || {};

    console.log(pageName);
    main.fadeOut(100, async function () {
      // 각페이지의 css 화일 로드
      await loadPageCSS(settings.css);
      main.load(`pages/${pageName}.html`, function () {
        // 페이지 이동 후 항상 top 0
        $(window).scrollTop(0);
        main.fadeIn(200, function () {
          $(document).trigger("loadPageComplete", [pageName]);
          updateHeader(pageName);
          // 페이지별 init 함수 실행
          if (settings.init) {
            setTimeout(() => settings.init(), 300);
          }
          // header 상태(색상) 업데이트
          updateHeader(pageName); //체크
        });
      });
    });
  }
  // 현재페이지 로드 (처음 접속시 home)
  loadPage(window.currentPage); // 체크

  // 페이지 이동 라우터
  function handleRoute() {
    const page = location.hash.replace("#", "") || "home";
    console.log("handleRoute 실행");
    loadPage(page);
  }

  $(window).on("hashchange", handleRoute); // 체크
  handleRoute(); // 체크

  // 페이지별 헤더 / 푸터 처리
  function updateHeader(pageName) {
    const navIcon = header.find(".nav_icon");
    const gnb = header.find(".gnb");
    console.log(pageName);
    if (pageName === "sitemap") {
      footer.hide();
      gnb.addClass("hide_inner").css({ opacity: 0, pointerEvent: "none" });
      header.addClass("hide_header");
      navIcon.addClass("on");
    } else {
      footer.show();
      gnb.removeClass("hide_inner").css({ opacity: "", pointerEvent: "" });
      header.removeClass("hide_header");
      navIcon.removeClass("on");
    }
  }

  // header.js에서 보낸 커스텀 이벤트 받기
  $(document).on("navigateTo", function (e, pageName) {
    location.hash = pageName;
    // loadPage(pageName);
  });

  // 뒤로가기 / 앞으로가기 처리
  window.onpopstate = function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  };

  // ======== Home 페이지 이벤트 통합 함수 ==========
  // $(document).on("loadPageComplete", function (e, pageName) {
  function initHomeEvents(pageName) {
    // footer 설정
    const footer = $("#footer");

    if (pageName === "sitemap") {
      // sitemap일 때 footer 숨기기
      footer.addClass("hide_footer");
    } else {
      // sitemap 외 페이지는 항상 보이게
      footer.removeClass("hide_footer");
    }

    if (pageName !== "home") return;

    const home_hero = document.getElementById("home_hero");
    const home_scrollIndicator = document.getElementById(
      "home_scrollIndicator"
    );
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
      { threshold: 0.2 }
    );
    setTimeout(() => {
      document
        .querySelectorAll(
          ".home_fade-item, .home_fade-text, .home_slide-item, #home_intro .home_intro-left, #home_intro .home_intro-right"
        )
        .forEach((el) => observer.observe(el));
    }, 500);

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

    // home 내부 링크 이동
    $(".home_view-more")
      .off("click")
      .on("click", "a[data-page]", function (e) {
        e.preventDefault();
        const targetPage = $(this).data("page");
        if (!targetPage) return;
        if (targetPage !== window.currentPage) location.hash = targetPage;
      });

    //  세 번째 섹션(Product Text) 등장 효과
    const homeProductText = document.querySelector(".home_product-text");
    const productImage = document.querySelector(".home_product-gallery");
    if (homeProductText) {
      console.log(" home_product-text 찾음:", homeProductText);
      const productObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log(" 감시 중:", entry.isIntersecting);
            if (entry.isIntersecting) {
              homeProductText.classList.add("home_active");
              productImage.classList.add("active");
              homeProductText
                .querySelectorAll(".home_slide-item")
                .forEach((el, i) => {
                  setTimeout(() => {
                    el.classList.add("home_active");
                  }, i * 200);
                });

              console.log(" home_active 클래스 추가됨!");
            }
          });
        },
        { threshold: 0.05 }
      );

      productObserver.observe(homeProductText);

      setTimeout(() => {
        const rect = homeProductText.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        console.log(" 초기 화면 체크:", inView);
        if (inView) {
          homeProductText.classList.add("home_active");
          console.log(" 초기 로드시 화면 안에 있어서 home_active 추가!");
        }
      }, 500);
    } else {
      console.warn("⚠️ home_product-text를 찾을 수 없음!");
    }

    // Product Gallery 자동 스크롤
    // const home_gallery = document.querySelector(".home_product-gallery");
    // let home_scrollInterval;
    // if (home_gallery) {
    //   home_gallery.addEventListener("mouseenter", () => {
    //     home_scrollInterval = setInterval(() => {
    //       home_gallery.scrollLeft += 1;
    //     }, 15);
    //   });
    //   home_gallery.addEventListener("mouseleave", () => {
    //     clearInterval(home_scrollInterval);
    //   });
    // }

    // Product Gallery 자동 슬라이드
    function initSlide() {
      let slide = document.querySelector(".home_product-gallery");
      let imgNum = document.querySelectorAll(".home_card").length;
      let index = 1;
      let step = 41.7;

      if (!slide) {
        console.log("slide xxxx");
        return; // 없을 때 에러 방지
      }
      if (imgNum === 0) {
        console.warn("⚠️ initSlide: .home_card가 없습니다. 이미지 수:", imgNum);
        return;
      }
      function showImage() {
        slide.style.transform = `translateX(${-step * index}%)`;
        console.log("slide 1");
      }
      function nextBtn() {
        if (index >= imgNum - 1) return;
        index++;
        console.log("slide 2");
        showImage();
      }
      function imgLoop() {
        if (index === imgNum - 2) {
          slide.style.transition = "none";
          index = 0;
          console.log("slide 3");
          showImage();
          void slide.offsetWidth;
          slide.style.transition = "1s";
        } else if (index === 0) {
          slide.style.transition = "none";
          index = imgNum - 2;
          showImage();
          void slide.offsetWidth;
          slide.style.transition = "1s";
        } else {
        }
      }
      slide.addEventListener("transitionend", imgLoop);

      // 기존에 글로벌 타이머가 있으면 지움 (중복 방지)
      if (window.homeSlideTimer) {
        clearInterval(window.homeSlideTimer);
        window.homeSlideTimer = null;
      }

      // 자동 슬라이드 재시작
      window.homeSlideTimer = setInterval(() => {
        // 만약 요소가 display:none 혹은 visibility:hidden이면 skip
        const style = window.getComputedStyle(slide);
        if (style.display === "none" || style.visibility === "hidden") {
          // console.log("slide paused (hidden)");
          return;
        }
        nextBtn();
      }, 6000);

      // 클릭 시 자동 스톱 (필요하면 제거)
      // 여기선 namespaced 리스너로 중복바인딩 방지
      window.removeEventListener(
        "click",
        window._homeSlideClickStop || (() => {})
      );
      window._homeSlideClickStop = function () {
        if (window.homeSlideTimer) {
          clearInterval(window.homeSlideTimer);
          window.homeSlideTimer = null;
          console.log("슬라이드 자동재생 정지 (클릭)");
        }
      };
      window.addEventListener("click", window._homeSlideClickStop);

      // 초기 렌더링 후 한 번 그려줌 (레이아웃 안정화 위해 약간 지연)
      setTimeout(() => {
        showImage();
      }, 50);

      // let slideInterval = setInterval(nextBtn,6000);
      // // 자동으로 nextBtn쪽으로 실행하도록 함수 실행을 변수에 저장하고
      // window.addEventListener("click", () => {
      //   clearInterval(slideInterval);
      //   // click 시에 멈춤. 현재는 화면 어디를 눌러도 멈춤
      // });
    }
    // DOM이 다 만들어진 뒤 실행
    // window.addEventListener('DOMContentLoaded', initSlide);

    //  Moving Text 섹션 - 자동 좌우 무빙 (수정된 위치)
    const movingText = document.querySelector(
      "#home_movingText .home_text-line"
    );
    if (movingText) {
      movingText.style.animationPlayState = "running";
    }
    //  R&D 섹션 텍스트 애니메이션
    const rndTexts = document.querySelectorAll(".home_slideUp-item");
    const imgSmall = document.querySelector(".home_rnd-left");
    if (rndTexts.length) {
      const rndObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("home_active");
            }
          });
        },
        { threshold: 0.2 }
      );
      rndTexts.forEach((el) => rndObserver.observe(el));
    }
    const rndVideo = document.querySelector("#home_rnd .home_rnd-left video");
    if (rndVideo) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              rndVideo.style.transform = "scale(1)";
            } else {
              rndVideo.style.transform = "scale(1.5)";
            }
          });
        },
        { threshold: 0.3 }
      );
      videoObserver.observe(rndVideo);
    }

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

    // scroll이벤트시 마지막 이미지
    $(window).on("scroll", function () {
      // 스크롤 위치 가져오기

      const scrollTop = $(window).scrollTop();
      const winHeight = $(window).height();
      const target = $(".home_contact-inner");

      if (target.length === 0) return;
      const targettop = target.offset().top;

      if (scrollTop > targettop - 700) {
        // if (scrollTop + winHeight > targettop) {
        target.addClass("on");
      } else {
        target.removeClass("on");
      }
    });
    initSlide(); // 체크
    // });
  }
  // ===== 팝업 닫기 시 이벤트 재실행 =====
  $(document).on("click", "#popupBtn", function () {
    $("#popupBox").fadeOut(300, function () {
      // 팝업 닫힌 후 home 이벤트 재실행
      initHomeEvents("home");
    });
  });
  // ==========================
  // loadPageComplete 시 실행
  // ==========================
  $(document).on("loadPageComplete", function (e, pageName) {
    if (pageName === "home") {
      initHomeEvents(pageName);
    }
  });

  // ======== sitemap 페이지 전용 =================
  function initSitemap() {
    const imgSide = $(".img_side");
    const menuLarge = $(".menuLarge");
    const menuSmall = $(".menuSmall");

    menuLarge.each(function (idx) {
      // 글자 애니메이션
      $(this)
        .css("transition-delay", idx * 0.2 + "s")
        .addClass("on");
    });
    // 이미지 보이기
    imgSide.addClass("on");

    menuLarge.on("click", function (e) {
      console.log(this);

      e.preventDefault();
      menuLarge.not(this).removeClass("active");
      $(this).toggleClass("active");
    });

    menuSmall.off("click").on("click", "a[data-page]", function (e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if (!targetPage) return;

      if (targetPage !== window.currentPage) {
        console.log("sitemap 내부이동" + targetPage);

        location.hash = targetPage;
      }
    });
  }

  // ======== rnd 페이지 부분 ======================
  function initRnd() {
    const overlay_rnd = document.querySelector(".videoWrap .overlay");
    const desc = $(".grid2 .text_desc, .grid6 .text_desc");

    if (overlay_rnd) {
      overlay_rnd.classList.add("on");
    } else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }
    if (desc.length > 0) {
      desc.on("click", function () {
        // 페이지에 존재할 때만 실행됨
        console.log("클릭:", $(this).text());
      });
    }
    if (desc.length > 0) {
      $(window).on("scroll", function () {
        // 스크롤 위치 가져오기
        const scrollTop = $(window).scrollTop();
        const winHeight = $(window).height();

        desc.each(function () {
          const top = $(this).offset().top;

          // 요소가 화면에 나타나면 실행
          if (scrollTop > top - 500) {
            // if (scrollTop + winHeight > top) {
            // $(this).css("transition-delay", idx * 0.2 + "s").addClass("on");
            $(this).addClass("on");
          } else {
            $(this).removeClass("on");
          }
        });
      });
    }

    function rollingImg() {
      let iconImgBox = document.querySelector(
        ".rnd_sec .devel_keyword .iconImgBox"
      );
      let rollingBox = document.querySelector(
        ".rnd_sec .devel_keyword .iconImgBox .rollingBox"
      );

      if (!iconImgBox || !rollingBox) {
        console.warn("rollingBox 또는 iconImgBox를 찾을 수 없습니다!");
        return; // 없으면 그냥 함수 종료
      }
      let cloneBack = rollingBox.cloneNode(true);
      iconImgBox.append(cloneBack);

      rollingBox.classList.add("roll_01");
      cloneBack.classList.add("roll_01");
    }
    rollingImg();

    // rnd 내부 링크 이동
    $(".mid_menu .sub_menu")
      .off("click")
      .on("click", "a[data-page]", function (e) {
        e.preventDefault();
        const targetPage = $(this).data("page");
        if (!targetPage) return;
        if (targetPage !== window.currentPage) {
          location.hash = targetPage;
        }
      });

    // 생산시설
    const $firstContent = $(".desc_text").first();
    $firstContent.addClass("open").css({
      maxHeight: $firstContent.prop("scrollHeight") + "px",
      opacity: 1,
    });
    $(".title_btn").on("click", function () {
      const $content = $(this).next(".desc_text");
      const isOpen = $content.hasClass("open");

      if (isOpen) return;
      // 모든 아코디언 닫기 (하나만 열리게)
      $(".desc_text").not($content).removeClass("open").css({
        maxHeight: 0,
        opacity: 0,
      });

      // 클릭한 아코디언 열기/닫기
      if (!isOpen) {
        $content.addClass("open").css({
          maxHeight: $content.prop("scrollHeight") + "px",
          opacity: 1,
        });
      } else {
      }
    });
  }

  // ========= 프로덕트 js ============================
  function initProduct() {
    const h1 = document.querySelector(".product_mainTxt h1");
    const p = document.querySelector(".product_mainTxt p");
    if (!h1 || !p) return;
    h1.style.transform = "translateY(0)";
    h1.style.opacity = "1";
    p.style.transform = "translateY(0)";
    p.style.opacity = "1";

    // product_menus 내부 링크 이동
    $(".product_menus, .product_page3_link")
      .off("click")
      .on("click", "a[data-page]", function (e) {
        e.preventDefault();
        const targetPage = $(this).data("page");
        if (!targetPage) return;
        if (targetPage !== window.currentPage) {
          location.hash = targetPage;
        }
      });
  }
  // =>프로덕트 js end

  // ========== press페이지 부분 =======================
  function initPress() {
    const overlay = document.querySelector(".videoWrap .overlay");
    const img_vyor = document.querySelector(".press_board .boardBox .imgBox");

    if (overlay) {
      overlay.classList.add("on");
    } else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }

    $(".press_board .boardBox .imgBox")
      .off("click")
      .on("click", "a[data-page]", function (e) {
        e.preventDefault();
        const targetPage = $(this).data("page");
        if (!targetPage) return;
        if (targetPage !== window.currentPage) {
          location.hash = targetPage;
        }
      });
    $(".listHam")
      .off("click")
      .on("click", "a[data-page]", function (e) {
        e.preventDefault();
        const targetPage = $(this).data("page");
        if (!targetPage) return;
        if (targetPage !== window.currentPage) {
          location.hash = targetPage;
        }
      });
  }

  // ========== contact 페이지 부분 ====================
  function initContact() {
    let APIKEY = "8f9769b44b504d8c07c091258a07fd4e";
    let timezone = document.getElementById("timezone");
    let icon = document.getElementById("icon");
    let temp = document.querySelector(".weather_temp");
    let lat = 37.500508;
    let lon = 127.032538;
    let contactUsScroll = document.getElementById("contactUs");

    function startScroll() {
      let sy = window.scrollY;
      let sec2P = contactUsScroll.offsetTop;
      if (sy >= sec2P - 500) {
        $(".contactUs_text").each(function (idx) {
          // 글자 애니메이션
          $(this)
            .css("transition-delay", idx * 0.5 + "s")
            .addClass("on");
        });
      }
    }
    startScroll();
    window.addEventListener("scroll", startScroll);

    // 지도 표시 *************
    kakao.maps.load(function () {
      let mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      // 컨트롤러 올리기
      let mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 생성하기
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lon),
      });
      let content = document.createElement("div");
      content.innerHTML = `
          <div class="wrap_map">
            <div class="info_map">
              <div class="company_map">
                <div class="img_map">
                  <img src="img/etc/logo/logo1.png" width="50" height="25" />
                </div>
                <div class="title_map">비오르</div>
                <div class="close_map" title="닫기">X</div>
              </div>
              <div class="body_map">
                <div class="desc_map">
                  <div class="ellipsis_map">(우) 06775</div>
                  <div class="jibun_map ellipsis_map">서울시 서초구 논현로 87</div>
                  <div class="home_map">
                    <a href="https://vyor.kr/" target="_blank" class="link">홈페이지 - vyor.kr</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      // 커스텀 오버레이 생성
      overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
        xAnchor: 0.5,
        yAnchor: 1.35,
      });
      // 닫기 버튼 (X)
      let closeBtn = content.querySelector(".close_map");
      closeBtn.addEventListener("click", () => {
        overlay.setMap(null);
      });
      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });
    });

    // 시간 표시 *************
    function updateTime() {
      let now = new Date();
      let dateS = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      let timeS = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      timezone.innerHTML = `${dateS}-${timeS}`;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // 날씨 표시 ***************
    let getWeather = async (lat, lon) => {
      try {
        let res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Ansan,kr&appid=${APIKEY}&units=metric&lang=kr`
        );
        let data = await res.json();
        temp.textContent = `${data.main.temp} ℃`;
        let iconNum = data.weather[0].icon;
        iconSrc = `http://openweathermap.org/img/wn/${iconNum}@2x.png`;
        icon.setAttribute("src", iconSrc);
        console.log("날씨 업데이트 완료");
      } catch (err) {
        temp.textContent = "날씨정보를 불러오지 못했습니다";
      }
    };
    getWeather(lat, lon);
  }
}); // contact_address.js end
