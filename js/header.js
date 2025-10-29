// header.js ---
function initHeader() {
   const header = $("#header");
   const gnb = $("#gnb");
   const sub = $(".submenuBox");
   const navIcon = $(".nav_icon");

   // currentPage는 전역으로 관리 (app.js에서 설정)
   window.currentPage = window.currentPage || "home";

   // 서브메뉴 나타내기
   function showSub(pid, li) {
      if(window.currentPage === "sitemap") return;

      const panel = $("#" + pid);
      const navWrap = $("#navWrap");
      const navWrapLeft = navWrap.length ? navWrap.offset().left : 0;
      
      const liLeft = li.offset().left; // li 시작 좌표
      // const navWrapLeft = $("#navWrap").offset().left || 0; // header 패딩 포함 위치 조정
      const leftPos = liLeft - navWrapLeft; // navWrap 기준으로 보정

      sub.find(".panel").removeClass("active").hide();
      panel.css({left: leftPos + "px", transform : "none"}).show().addClass("active");
      sub.stop(true, true).animate({height: panel.outerHeight(true)}, 200);
   }
   // 서브메뉴 닫기
   function hideSub() {
      sub.stop(true, true).animate({height: 0}, 200, function() {
      sub.find(".panel").removeClass("active").hide();
   });
   }
   // 헤더 색상 업데이트
   function updateHeaderState() {
      const scrollTop = $(window).scrollTop();

      if (scrollTop > 10) { // 스크롤 10px 넘으면
         header.addClass("dark_header");
         gnb.addClass("dark_inner");
      } else {
         header.removeClass("dark_header");
         gnb.removeClass("dark_inner");
      }
   }
   // 초기상태
   updateHeaderState();

   // 스크롤 시 색상 변경
   $(window).off("scroll.header").on("scroll", function() {updateHeaderState();});

   // gnb 마우스 호버
   gnb.off("mouseenter").on("mouseenter", "li", function() {
      if (window.currentPage === "sitemap") return; // sitemap에서는 작동 X

      header.addClass("dark_header");
      gnb.addClass("dark_inner");

      let pid = $(this).data("panel");
      showSub(pid, $(this));
   });

   // 중복 코드 함수화하기 (헤더 스크롤시 색상 변화)
   function resetHeaderChange() {
      // 스크롤 위치 확인 후, 0~9px이면 원래 상태로 복귀
      if($(window).scrollTop() < 10) {
         header.removeClass("dark_header");
         gnb.removeClass("dark_inner");
      }
   }
   // gnb 마우스 leave
   header.off("mouseleave").on("mouseleave", function() {
      hideSub();
      resetHeaderChange()
   })

   // 서브메뉴에서 마우스 나가면 닫기
   sub.off("mouseleave").on("mouseleave", function() {
      hideSub();
      resetHeaderChange()
   });

  // 햄버거 버튼은 app.router에서 페이지 전환을 담당하므로 여기선 시각적 state만 처리
  navIcon.off("click.header").on("click.header", function () {
    $(this).toggleClass("on");
    const isActive = $(this).hasClass("on");
    if (isActive) {
      // sitemap 열기 (SPA라면 해시 변경을 트리거)
      location.hash = "sitemap";
    } else {
      // 닫기 → home으로
      location.hash = "home";
    }
  });
}