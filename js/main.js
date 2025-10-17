$(document).ready(function () {
  // ========== [1] 기본 세팅 ==========
  const main = $("#content");
  const header = $("#header");
  const footer = $("#footer");
  let currentPage = "home"; // 기본 페이지 이름

  // 공통 헤더·푸터 로드
  // header.load("components/header.html");
  // footer.load("components/footer.html");

  // ========== [2] 페이지 로드 함수 ==========
  function loadPage(pageName) {

    const url = `pages/${pageName}.html`;
console.log(url)
    // 메인 페이드아웃 → 내용 교체 → 페이드인
    main.fadeOut(200, function () {
      main.load(url, function (response, status) {
console.log(status)
        if (status === "success") {
          currentPage = pageName;
          console.log(`✅ ${pageName}.html 로드 완료`);

          initPageFeatures(pageName); // 페이지별 기능 초기화
          main.fadeIn(300);
        } else {
          main.html("<p>⚠️ 페이지를 불러올 수 없습니다.</p>").fadeIn(300);
        }
      });
    });
  }

  // ========== [3] 내비게이션 클릭 처리 ==========
  $(document).on("click", "a[data-page]", function (e) {
    e.preventDefault();
    const page = $(this).data("page");
    if (page && page !== currentPage) {
      loadPage(page);
      history.pushState({ page }, "", `#${page}`); // SPA용 주소 표시
    }
  });

  // 뒤로가기 / 앞으로가기 처리
  window.onpopstate = function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  };

  // ========== [4] JSON 데이터 로드 예시 ==========
  function loadJsonData(jsonPath, containerSelector) {
    $.getJSON(jsonPath, function (data) {
      const container = $(containerSelector);
      container.empty();

      data.forEach(item => {
        const card = $(`
          <div class="card">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.explain}</p>
            <p>${item.describe1}</p>
          </div>
        `);
        container.append(card);
      });

      // 카드가 화면에 보일 때 애니메이션 (스크롤 감지와 연계)
      animateOnScroll(".card");
    });
  }

  // ========== [5] 스크롤 이벤트 (애니메이션 트리거) ==========
  function animateOnScroll(selector) {
    const elements = $(selector);
    $(window).on("scroll", function () {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      elements.each(function () {
        const offsetTop = $(this).offset().top;
        if (scrollTop + windowHeight - 100 > offsetTop) {
          $(this).addClass("visible"); // CSS로 애니메이션 처리
        }
      });
    }).trigger("scroll");
  }

  // ========== [6] 페이지별 기능 초기화 ==========
  function initPageFeatures(page) {
    if (page === "home") {
      loadJsonData("json/products.json", "#home-list");
    } 
    else if (page === "product") {
      loadJsonData("json/products.json", "#gallery");
    } 
    else if (page === "brand") {
      $(".fade-item").each(function (i) {
        $(this).delay(150 * i).fadeIn(300);
      });
    }
  }

  // ========== [7] 첫 페이지 로드 ==========
  const startPage = location.hash.replace("#", "") || "home";
console.log(startPage)
  loadPage(startPage);
});