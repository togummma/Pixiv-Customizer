// =========================
// bg-surface1 を拡大する処理
// =========================
function scaleBgSurface1() {
  document.querySelectorAll(".bg-surface1").forEach((element) => {
    element.style.transform = "scale(1.1)";
    element.style.transformOrigin = "top left";
  });
}

// =========================
// .grid の直下にある bg-background2 を削除する処理
// =========================
function removeBgBackground2InsideGrid() {
  document.querySelectorAll("div.grid").forEach((grid) => {
    Array.from(grid.children).forEach((child) => {
      if (child.classList.contains("bg-background2")) {
        child.remove(); // 子要素もろとも削除
      }
    });
  });
}

// =========================
// コメントのフレックスボックスを非表示にする処理
// =========================
function hideCommentFlexBox() {
  document.querySelectorAll(
    "div.w-full.flex.flex-col.pt-16.pb-24"
  ).forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      if (
        child.classList.contains("bg-surface3") &&
        child.getAttribute("data-ga4-label") === "comment"
      ) {
        child.style.display = "none";
      }
    });
  });
}

// =========================
// DOM初期ロード時に1回実行
// =========================
window.addEventListener("load", () => {
  scaleBgSurface1();
  removeBgBackground2InsideGrid();
  hideCommentFlexBox(); // ← 追加
});

// =========================
// SPA対策：DOMの変化を監視して再実行
// =========================
const observer = new MutationObserver(() => {
  scaleBgSurface1();
  removeBgBackground2InsideGrid();
  hideCommentFlexBox(); // ← 追加
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
