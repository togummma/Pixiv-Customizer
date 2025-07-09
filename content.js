
//1
// =========================
// 設定管理
// =========================
let settings = {
  feature1: true,  // bg-surface1拡大 & bg-background2削除
  feature2: true,  // コメント領域を非表示
  feature3: true   // 人気作品領域を非表示
};

// 設定を読み込み
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['feature1', 'feature2', 'feature3']);
    settings.feature1 = result.feature1 !== undefined ? result.feature1 : true;
    settings.feature2 = result.feature2 !== undefined ? result.feature2 : true;
    settings.feature3 = result.feature3 !== undefined ? result.feature3 : true;
  } catch (error) {
    console.log('設定の読み込みに失敗しました:', error);
  }
}

// =========================
// bg-surface1 を拡大する処理
// =========================
function scaleBgSurface1() {
  if (!settings.feature1) return;
  
  document.querySelectorAll(".bg-surface1").forEach((element) => {
    element.style.transform = "scale(1.1)";
    element.style.transformOrigin = "top left";
  });
}

// スケールをリセットする関数
function resetScaleBgSurface1() {
  document.querySelectorAll(".bg-surface1").forEach((element) => {
    element.style.transform = "";
    element.style.transformOrigin = "";
  });
}

// =========================
// .grid の直下にある bg-background2 を削除する処理
// =========================
function removeBgBackground2InsideGrid() {
  if (!settings.feature1) return;
  
  document.querySelectorAll("div.grid").forEach((grid) => {
    Array.from(grid.children).forEach((child) => {
      if (child.classList.contains("bg-background2")) {
        child.remove(); // 子要素もろとも削除
      }
    });
  });
}
//1

// =========================
// コメント領域を非表示にする処理
// =========================
function hideCommentSection() {
  if (!settings.feature2) return;
  
  document.querySelectorAll(
    "div.w-full.flex.flex-col.pt-16.pb-24"
  ).forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      //2
      if (
        child.classList.contains("bg-surface3") &&
        child.getAttribute("data-ga4-label") === "comment"
      ) {
        child.style.display = "none";
      }
      //2
    });
  });
}

// コメント領域の表示をリセットする関数
function showCommentSection() {
  document.querySelectorAll(
    "div.w-full.flex.flex-col.pt-16.pb-24"
  ).forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      if (
        child.classList.contains("bg-surface3") &&
        child.getAttribute("data-ga4-label") === "comment"
      ) {
        child.style.display = "";
      }
    });
  });
}

// =========================
// 人気作品領域を非表示にする処理
// =========================
function hidePopularWorksSection() {
  if (!settings.feature3) return;
  
  document.querySelectorAll(
    "div.w-full.flex.flex-col.pt-16.pb-24"
  ).forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      //3 user_popular_works要素を非表示にする
      if (
        child.classList.contains("rounded-8") &&
        child.getAttribute("data-ga4-label") === "user_popular_works"
      ) {
        child.style.display = "none";
      }
      //3
    });
  });
}

// 人気作品領域の表示をリセットする関数
function showPopularWorksSection() {
  document.querySelectorAll(
    "div.w-full.flex.flex-col.pt-16.pb-24"
  ).forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      if (
        child.classList.contains("rounded-8") &&
        child.getAttribute("data-ga4-label") === "user_popular_works"
      ) {
        child.style.display = "";
      }
    });
  });
}

// =========================
// すべての機能を実行
// =========================
function applyAllFeatures() {
  scaleBgSurface1();
  removeBgBackground2InsideGrid();
  hideCommentSection();
  hidePopularWorksSection();
}

// =========================
// ポップアップからのメッセージを受信
// =========================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSettings') {
    // 設定を更新
    Object.assign(settings, message.settings);
    sendResponse({ success: true });
  }
  
  if (message.action === 'applyChanges') {
    // 設定を更新
    settings[message.feature] = message.enabled;
    
    // 変更された機能に応じて即座に処理を実行
    if (message.feature === 'feature1') {
      if (message.enabled) {
        scaleBgSurface1();
        removeBgBackground2InsideGrid();
      } else {
        resetScaleBgSurface1();
        // bg-background2の削除は元に戻せないため、ページリロードが推奨
        console.log('サイドバー削除機能をOFFにしました。bg-background2の復元にはページをリロードしてください。');
      }
    }
    
    if (message.feature === 'feature2') {
      if (message.enabled) {
        hideCommentSection();
      } else {
        showCommentSection();
      }
    }
    
    if (message.feature === 'feature3') {
      if (message.enabled) {
        hidePopularWorksSection();
      } else {
        showPopularWorksSection();
      }
    }
    
    sendResponse({ success: true });
  }
});

// =========================
// DOM初期ロード時に1回実行
// =========================
window.addEventListener("load", async () => {
  await loadSettings();
  applyAllFeatures();
});

// DOMContentLoadedでも実行（より早いタイミング）
document.addEventListener("DOMContentLoaded", async () => {
  await loadSettings();
  applyAllFeatures();
});

// =========================
// SPA対策：DOMの変化を監視して再実行
// =========================
const observer = new MutationObserver(() => {
  applyAllFeatures();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});