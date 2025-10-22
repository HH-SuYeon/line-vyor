// header.js ---
function initHeader() {
   const header = $("#header");
   const gnb = $("#gnb");
   const sub = $(".submenuBox");

   function showSub(pid, li) {
      if(currentPage === "sitemap") return;

      const panel = $("#" + pid);
      const navWrap = $("#navWrap");
      const navWrapLeft = navWrap.length ? navWrap.offset().left : 0;
      
      const liLeft = li.offset().left; // li 시작 좌표
      // const navWrapLeft = $("#navWrap").offset().left || 0; // header 패딩 포함 위치 조정
      const leftPos = liLeft - navWrapLeft; // navWrap 기준으로 보정

      sub.find(".panel").removeClass("active").hide();
      panel.css({
         left: leftPos + "px",
         transform : "none"
      }).show().addClass("active");

      let targetH = panel.outerHeight(true);
      sub.stop(true, true).animate({height: targetH}, 200);
   }
   // 서브메뉴 닫기
   function hideSub() {
      sub.stop(true, true).animate({height: 0}, 200, 
      function() {
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
   $(window).on("scroll", function() {updateHeaderState();});

   // gnb 마우스 호버
   gnb.on("mouseenter", "li", function() {
      if (currentPage === "sitemap") return; // sitemap에서는 작동 X

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
   header.on("mouseleave", function() {
      hideSub();
      resetHeaderChange()
   })

   // 서브메뉴에서 마우스 나가면 닫기
   sub.on("mouseleave", function() {
      hideSub();
      resetHeaderChange()
   });

    // 햄버거 메뉴 클릭 (사이트맵 열기/닫기)
   header.find(".nav_icon").off("click").on("click", function() {
      const isOpen = $(this).hasClass("on");

      if (!isOpen) {
      // sitemap 모드로 전환
      $(this).addClass("on");
      currentPage = "sitemap";

      // 헤더 스타일 업데이트
      header.addClass("dark_header");
      gnb.addClass("hide_inner").css({
        opacity: 0,
        pointerEvents: "none", // 완전 비활성화
        userSelect: "none"
      });
      sub.hide();

      // 실제 페이지 전환 (SPA or 일반 이동)
      if (window.isSPA) {
        $(document).trigger("navigateTo", ["sitemap"]);
      } else {
        window.location.href = "/pages/sitemap.html";
      }

    } else {
      // 홈 또는 이전 페이지로 복귀
      $(this).removeClass("on");
      currentPage = "home";

      gnb.removeClass("hide_inner").css({
        opacity: "",
        pointerEvents: "",
        userSelect: ""
      });
      updateHeaderState();

      // 페이지 복귀 (SPA or 일반)
      if (window.isSPA) {
        $(document).trigger("navigateTo", ["home"]);
      } else {
        // “이전 페이지”가 있으면 돌아가고, 없으면 home으로 이동
        if (document.referrer) {
          window.history.back();
        } else {
          window.location.href = "index.html";
        }
      }
    }
  });
}