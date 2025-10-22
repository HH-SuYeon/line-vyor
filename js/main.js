window.currentPage = "home"; // 기본 페이지 이름
$(document).ready(function () {
  // 기본 세팅 
  const content = $("#content");
  const header = $("#header");
  const footer = $("#footer");

  // 페이지 로드 함수
  function loadPage(pageName) {
    window.currentPage = pageName;
    setTimeout(() => {
      content.load(`/pages/${pageName}.html`, function() {
        updateHeader(pageName);
      });
    }, 300);
  }

  // 첫 페이지 로드
  loadPage(window.currentPage);

  // 페이지별 헤더 / 푸터 처리
  function updateHeader(pageName) {
    const navIcon = header.find(".nav_icon");
    const gnb = header.find(".gnb");

    if (pageName === "sitemap") {
      footer.hide();
      gnb.addClass("hide_inner");
      header.addClass("hide_header");
      navIcon.addClass("on");
    } else {
      footer.show();
      gnb.removeClass("hide_inner");
      header.removeClass("hide_header");
      navIcon.removeClass("on");
    }
  }

  // 내비게이션 클릭 처리 
  $(document).on("click", "a[data-page]", function (e) {
    e.preventDefault();
    const page = $(this).data("page");
    if (page && page !== window.currentPage) {
      loadPage(page);
      history.pushState({ page }, "", `#${page}`); // SPA용 주소 표시
    }
  });

  // header.js에서 보낸 커스텀 이벤트 받기
  $(document).on("navigateTo", function(e, pageName) {
    loadPage(pageName);
  })

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

      data.forEach((item) => {
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
    $(window)
      .on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        elements.each(function () {
          const offsetTop = $(this).offset().top;
          if (scrollTop + windowHeight - 100 > offsetTop) {
            $(this).addClass("visible"); // CSS로 애니메이션 처리
          }
        });
      })
      .trigger("scroll");
  }

  // ========== [6] 페이지별 기능 초기화 ==========
  function initPageFeatures(page) {
    if (page === "home") {
      loadJsonData("json/products.json", "#home-list");
    }else if (page === "product") {
      loadJsonData("json/products.json", "#gallery");
    }else if (page === "brand") {
      $(".fade-item").each(function (i) {
        $(this)
          .delay(150 * i)
          .fadeIn(300);
      });
    }
  }
});
