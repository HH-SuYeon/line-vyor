document.addEventListener("DOMContentLoaded", () => {
  const home_observer = new IntersectionObserver( //스크롤하면서 특정 요소가 화면(Viewport)에 들어오거나 나갈 때를 감지
    (home_entries) => {
      home_entries.forEach((home_entry) => {
        if (home_entry.isIntersecting) {
          //감시 중인 요소가 보이면 → "active" 클래스 추가
          home_entry.target.classList.add("active"); //home.css의 .fade-item.active실행
        } else {
          home_entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  document
    .querySelectorAll(".fade-item") //.fade-item 클래스를 가진 모든 요소를 찾고,
    //각각을 home_observer가 감시하도록 등록
    .forEach((home_el) => home_observer.observe(home_el));
});
//위 코드는 IntersectionObserver를 이용해 스크롤 시 화면에 나타나는 요소들을 자동으로 감지.
//각 요소가 화면의 30% 이상 보이면 .active 클래스를 붙여서 페이드 인 애니메이션이 실행되고,
//화면에서 사라지면 다시 .active를 제거해서 재등장할 때도 부드럽게 나타나게 하여 스크롤을
//  감지하지 않고도 자연스럽게 등장 애니메이션을 구현

// ================= Scroll Indicator + Arrows + Header Control =================
window.addEventListener("scroll", () => {
  // const home_header = document.getElementById("header");
  const home_scrollIndicator = document.getElementById("scrollIndicator"); //오른쪽 scroll표시부분
  const home_arrows = document.querySelector(".arrows");
  const home_hero = document.getElementById("hero"); //메인영상구간
  const home_intro = document.getElementById("intro"); //두번째 섹션영역

  if (!home_hero || !home_intro || !home_scrollIndicator || !home_arrows)
    return; //방어코드(오류방지용)

  const home_heroRect = home_hero.getBoundingClientRect(); //현재화면 내위치와 크기정보를 가져오는 함수
  const home_introRect = home_intro.getBoundingClientRect();

  const home_heroVisible = //hero(메인 영상)가 화면 안에 있고,
    //다음 섹션(intro)이 아직 올라오기 전이면 ‘첫 화면 구간’으로 판단
    home_heroRect.top < window.innerHeight && home_heroRect.bottom > 0;
  const home_introVisible = home_introRect.top <= window.innerHeight * 0.9;

  //메인 비디오가 보일 때(heroVisible = true)만 SCROLL 표시와 화살표를 보여줌
  if (home_heroVisible && !home_introVisible) {
    home_scrollIndicator.classList.remove("hide");
    home_arrows.classList.remove("hide");
  } else {
    home_scrollIndicator.classList.add("hide");
    home_arrows.classList.add("hide");
  }

  // 스크롤 시 .dark_header 클래스 적용
//   if (window.scrollY > 150) {
//     home_header.classList.add("dark_header");
//   } else {
//     home_header.classList.remove("dark_header");
//   }
});
//getBoundingClientRect()로 각 섹션의 위치를 계산한 뒤,
//hero의 top/bottom 값으로 “화면 안에 있는지”를 확인하고,
//intro의 top 값으로 “다음 섹션이 곧 나타날지”를 감지.
//hero가 보이고 intro가 아직 안 올라왔을 때는
//메인 영상 영역으로 판단해서 SCROLL 표시와 화살표를 보여주고,
//그 이후엔 숨기기.
