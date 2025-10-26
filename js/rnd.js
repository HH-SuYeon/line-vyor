console.log("11111111-rnd.js loaded!")
// console.log(document.body.innerHTML);
// 해시 변화(페이지 전환) 감지
window.addEventListener("hashchange", handleRndSection);
window.addEventListener("load", handleRndSection);

function handleRndSection() {
  const hash = window.location.hash;
console.log("현재 해시:", hash);

// rnd 확인
if(hash.includes("rnd")) {
console.log("R&D 섹션 진입 감지!");
  const overlay = document.querySelector(".overlay");
  if(overlay) {
console.log("overlay found!")
      overlay.classList.add("on");    
    }else {
      console.warn("⚠️ .overlay를 찾을 수 없습니다!");
    }
  }
}
