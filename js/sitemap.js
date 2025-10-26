function initSitemap() {
  const imgSide = $(".img_side");
  const menuLarge = $(".menuLarge");
  const menuSmall = $(".menuSmall");

  menuLarge.each( function (idx) {
    // 글자 애니메이션
    $(this).css("transition-delay", idx * 0.2 + "s").addClass("on");
  })
  // 이미지 로드
  imgSide.addClass("on");

  menuLarge.on("click", function(e) {
    e.preventDefault();
    menuLarge.not(this).removeClass("active");
    $(this).toggleClass("active");

    menuSmall.off("click").on("click", "a[data-page]", function(e) {
      e.preventDefault();
      const targetPage = $(this).data("page");
      
      if(!targetPage) return;

      if(targetPage !== window.currentPage) {
        location.hash = targetPage;

        setTimeout(() => {
          if (typeof loadPage === "function") loadPage(targetPage);
        }, 100);
      }
    });
  })
}