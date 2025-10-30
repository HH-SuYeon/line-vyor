window.currentPage = "home"; // 기본 페이지 이름
$(document).ready(function () {
  // ========== [1] 기본 세팅 ==========
  const main = $("#content");
  const header = $("#header");
  const footer = $("#footer");

  // 초기에는 main과 footer 숨기기
  // main.hide();
  // footer.hide();

  // 공통 헤더 로드
  header.load("components/header.html", function() {
    $.getScript("js/header.js")
      .done(function() {
  console.log("header.js loaded!");
        if(typeof initHeader === "function") initHeader();
      })
      .fail(function (jqxhr, settings, exception) {
        console.error("header.js load failed", exception);
      });
    footer.load("components/footer.html", function() {
      console.log("푸터 로드 완료");
    });
  });

  // 팝업창
    window.addEventListener('load', () => {
        const popup = document.querySelector('.popupBox');
        const closeBtn = document.querySelector('.popup_tBox button');

        // localStorage에서 'popupClosed' 값 확인
        const isClosed = localStorage.getItem('popupClosed');

        if (!isClosed) {
        // 닫은 적 없으면 팝업 보임
        popup.style.display = 'block';
        }

        closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        // 닫기 저장
        localStorage.setItem('popupClosed', 'true');
        });
    });
  // 팝업창 종료

  // 페이지별 설정 
  const pageSettings = {
    home: {
      css: "css/home.css",
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
        initProduct()
      },
    },
    product_body_lotion: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct()
      },
    },
    product_hair: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct()
      },
    },
    product_facial: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        initProduct()
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

  console.log(pageName)
    main.fadeOut(100, async function() {
      // 각페이지의 css 화일 로드
      await loadPageCSS(settings.css)
      main.load(`pages/${pageName}.html`, function() {
        // 페이지 이동 후 항상 top 0
        $(window).scrollTop(0);
        main.fadeIn(200);
        // 페이지별 init 함수 실행
        if (settings.init) {
          setTimeout(() => settings.init(), 300)
        }
        // 페이지 로드 완료 이벤트 (home.js용) **
        $(document).trigger("loadPageComplete", [pageName]);

        // header 상태(색상) 업데이트
        updateHeader(pageName);
      });
    });
  }
  // 현재페이지 로드 (처음 접속시 home)
  loadPage(window.currentPage);

  // 페이지 이동 라우터
  function handleRoute() {
    const page = location.hash.replace("#", "") || "home";
  console.log("handleRoute 실행")
    loadPage(page);
  }

  $(window).on("hashchange", handleRoute);
  handleRoute();

  // 페이지별 헤더 / 푸터 처리
  function updateHeader(pageName) {
    const navIcon = header.find(".nav_icon");
    const gnb = header.find(".gnb");
  console.log(pageName)
    if (pageName === "sitemap") {
      footer.hide();
      // gnb.addClass("hide_inner");
      gnb.addClass("hide_inner").css({opacity:0, pointerEvent: "none"});
      header.addClass("hide_header");
      navIcon.addClass("on");
    } else {
      footer.show();  
      // gnb.removeClass("hide_inner");
      gnb.removeClass("hide_inner").css({opacity:"", pointerEvent:""});
      header.removeClass("hide_header");
      navIcon.removeClass("on");
    }
  }

  // header.js에서 보낸 커스텀 이벤트 받기
  $(document).on("navigateTo", function(e, pageName) {
    location.hash = pageName;
    // loadPage(pageName);
  })

  // 뒤로가기 / 앞으로가기 처리
  window.onpopstate = function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  };

  // ======== home.js 통합 (loadPageComplete 이벤트 아래) ==================
  $(document).on("loadPageComplete", function (e, pageName) {
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
    const home_scrollIndicator = document.getElementById("home_scrollIndicator");
    const home_arrows = document.querySelector(".home_arrows");
    const home_intro = document.getElementById("home_intro");

    // home 내부 링크 이동
    $(".home_view-more").off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;
      if(targetPage !== window.currentPage) {
        location.hash = targetPage;
      }
    });

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
   setTimeout(() => {
  document
    .querySelectorAll(".home_fade-item, #home_intro .home_intro-left, #home_intro .home_intro-right")
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

<<<<<<< Updated upstream
    // ✅ Contact 텍스트 효과
=======
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
    }const rndVideo = document.querySelector("#home_rnd .home_rnd-left video");
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
>>>>>>> Stashed changes
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
  });

  // ======== sitemap 페이지 전용 =================
  function initSitemap() {

    const imgSide = $(".img_side");
    const menuLarge = $(".menuLarge");
    const menuSmall = $(".menuSmall");

    menuLarge.each( function (idx) {
      // 글자 애니메이션
      $(this).css("transition-delay", idx * 0.2 + "s").addClass("on");
    });
    // 이미지 보이기
    imgSide.addClass("on");

    menuLarge.on("click", function(e) {
  console.log(this)

      e.preventDefault();
      menuLarge.not(this).removeClass("active");
      $(this).toggleClass("active");
    });

    menuSmall.off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;

      if(targetPage !== window.currentPage) {
  console.log("sitemap 내부이동" + targetPage);

        location.hash = targetPage;
      }
    });
  }

  // ======== rnd 페이지 부분 ======================
  function initRnd() {
    const overlay = document.querySelector(".videoWrap .overlay");
    const title = $(".text_rnd");
    const desc = $(".grid2 .text_desc, .grid6 .text_desc");

    if(overlay) {
      overlay.classList.add("on");    
    }else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }
    if (desc.length > 0) {
      desc.on("click", function() {
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
          if (scrollTop  > top - 500) {
          // if (scrollTop + winHeight > top) {
            // $(this).css("transition-delay", idx * 0.2 + "s").addClass("on");
            $(this).addClass("on");
          } else {
            $(this).removeClass("on");
          }
        });
      });
    
      function rollingImg() {
        let iconImgBox = document.querySelector(".rnd_sec .devel_keyword .iconImgBox");
        let rollingBox = document.querySelector(".rollingBox");
        // let cloneFront = rollingBox.cloneNode(true);
        let cloneBack = rollingBox.cloneNode(true);

        iconImgBox.append(cloneBack);
        // rollingBox.insertBefore(cloneFront, rollingBox.firstChild);

        rollingBox.classList.add("roll_01");
        // cloneFront.classList.add("roll_02");
        cloneBack.classList.add("roll_01");
      }
      rollingImg()
    }
     // rnd 내부 링크 이동
    $(".mid_menu .sub_menu").off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;
      if(targetPage !== window.currentPage) {
        location.hash = targetPage;
      }
    });

    title.on("click", function(e) {
        e.preventDefault();
        title.not(this).removeClass("active");
        $(this).toggleClass("active");
    })
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
    $(".product_menus, product_page3_link").off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;
      if(targetPage !== window.currentPage) {
        location.hash = targetPage;
      }
    });
  }
  // =>프로덕트 js end

  // ========== press페이지 부분 =======================
  function initPress() {
    const overlay = document.querySelector(".videoWrap .overlay");
    const img_vyor = document.querySelector(".press_board .boardBox .imgBox");

    if(overlay) {
      overlay.classList.add("on");    
    }else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }

    $(".press_board .boardBox .imgBox").off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;
      if(targetPage !== window.currentPage) {
        location.hash = targetPage;
      }
    })
    $(".listHam").off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      if(!targetPage) return;
      if(targetPage !== window.currentPage) {
        location.hash = targetPage;
      }
    })

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
      if(sy >= sec2P - 500 ) {
        $(".contactUs_text").each( function (idx) {
          // 글자 애니메이션
          $(this).css("transition-delay", idx * 0.5 + "s").addClass("on");
        });
      }
    }
    startScroll()
    window.addEventListener("scroll", startScroll);

    // 지도 표시 *************
    kakao.maps.load(function() {
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };

      let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커 생성하기
      let markerPosition  = new kakao.maps.LatLng(lat, lon);
      let marker = new kakao.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);

      // 컨트롤러 올리기
      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    })

    // 시간 표시 ************* 
    function updateTime() {
        let now = new Date();
        let dateS = now.toLocaleDateString("ko-KR", {year:"numeric", month:"long", day:"numeric", weekday:"long"});
        let timeS = now.toLocaleTimeString("ko-KR", {hour: "2-digit", minute: "2-digit", second: "2-digit"});

        timezone.innerHTML = `${dateS}-${timeS}`
    }
    updateTime();
    setInterval(updateTime, 1000);

    // 날씨 표시 ***************
    let getWeather = async(lat, lon) => {
        try {
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ansan,kr&appid=${APIKEY}&units=metric&lang=kr`)
            let data = await res.json();
            temp.textContent = `${data.main.temp} ℃`;
            let iconNum = data.weather[0].icon;
            iconSrc = `http://openweathermap.org/img/wn/${iconNum}@2x.png`;
            icon.setAttribute("src", iconSrc);
  console.log("날씨 업데이트 완료")
        }
        catch(err) {
            temp.textContent = "날씨정보를 불러오지 못했습니다"
        }
    }
    getWeather(lat, lon);
  }
});
// // contact_address.js end
