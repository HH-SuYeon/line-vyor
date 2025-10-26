window.currentPage = "home"; // 기본 페이지 이름
$(document).ready(function () {
  // 기본 세팅
  const main = $("#content");
  const header = $("#header");
  const footer = $("#footer");

  // 초기에는 main과 footer 숨기기
  // main.hide();
  // footer.hide();

  // 공통 헤더 로드
  header.load("./components/header.html", function() {
    $.getScript("/js/header.js")
      .done(function() {
console.log("header.js loaded!");
        if(typeof initHeader === "function") initHeader();
      });
    footer.load("./components/footer.html", function() {
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
    product_body_lotion: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
      },
    },
    product_body: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
      },
    },
    product_hair: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
      },
    },
    product_facial: {
      css: "css/product.css",
      init: function () {
        console.log("product 초기화 중...");
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
        if(pageName === "home") {
          $getScript("/js/home.js").done(() => console.log("home.js loaded!"))
        }
        // 페이지 이동 후 항상 top 0
        $(window).scrollTop(0);
        main.fadeIn(200);
        // 페이지별 init 함수 실행
        if (settings.init) settings.init()
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

    if (pageName === "sitemap") {
      footer.hide();
      gnb.addClass("hide_inner").css({opacity:0, pointerEvent: "none"});
      header.addClass("hide_header");
      navIcon.addClass("on");
    } else {
      footer.show();
      gnb.removeClass("hide_inner").css({opacity:"", pointerEvent:""});
      header.removeClass("hide_header");
      navIcon.removeClass("on");
    }
  }

  // header.js에서 보낸 커스텀 이벤트 받기
  $(document).on("navigateTo", function (e, pageName) {
    location.hash = pageName;
  });

  // 뒤로가기 / 앞으로 가기 처리
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
