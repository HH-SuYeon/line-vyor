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
        animateProductText();
      },
    },
    product_body: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        animateProductText()
      },
    },
    product_body_lotion: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        animateProductText()
      },
    },
    product_hair: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        animateProductText()
      },
    },
    product_facial: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
        animateProductText()
      },
    },
    rndTechnology: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        rndTechnology();
      },
    },
    rndResearch: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        rndTechnology();
      },
    },
    rndProduction: {
      css: "css/rnd.css",
      init: function () {
        console.log("rnd 초기화 중...");
        rndTechnology();
      },
    },
    press: {
      css: "css/press.css",
      init: function () {
        console.log("press 초기화 중...");
      },
    },
    press_news: {
      css: "css/press.css",
      init: function () {
        console.log("press 초기화 중...");
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
        contactUs();
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
  // handleRoute();


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

  // sitemap 페이지 전용 ---------
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

  // rnd 페이지 부분 -----------
  function rndTechnology() {
console.log("rndTechnology")
  
    const overlay = document.querySelector(".overlay");

    if(overlay) {
console.log("overlay 찾음")
      overlay.classList.add("on");    
    }else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }
  }
});

  // home.js 통합 (loadPageComplete 이벤트 아래)
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
});

//프로덕트 js
function animateProductText() {
  const h1 = document.querySelector(".product_mainTxt h1");
  const p = document.querySelector(".product_mainTxt p");
  if (!h1 || !p) return;
  h1.style.transform = "translateY(0)";
  h1.style.opacity = "1";
  p.style.transform = "translateY(0)";
  p.style.opacity = "1";
}
//프로덕트 js
  // contact_address.js start
  function contactUs() {
    let APIKEY = "8f9769b44b504d8c07c091258a07fd4e";
    let timezone = document.getElementById("timezone");
    let icon = document.getElementById("icon");
    let temp = document.querySelector(".weather_temp");
    let lat = 37.500508;
    let lon = 127.032538;

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
// // contact_address.js end
