//1
// =========================
// 設定管理
// =========================
let settings = {
  feature1: true,  // bg-surface1拡大 & bg-background2削除
  feature2: true,  // コメント領域を非表示
  feature3: true,  // 人気作品領域を非表示
  feature4: true,  // 「すべて見る」ボタンを削除
  feature5: true,  // サイドメニュー要素を非表示
  feature6: true   // "作品を見る"解除ボタン拡大
};

// 設定を読み込み
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6']);
    settings.feature1 = result.feature1 !== undefined ? result.feature1 : true;
    settings.feature2 = result.feature2 !== undefined ? result.feature2 : true;
    settings.feature3 = result.feature3 !== undefined ? result.feature3 : true;
    settings.feature4 = result.feature4 !== undefined ? result.feature4 : true;
    settings.feature5 = result.feature5 !== undefined ? result.feature5 : true;
    settings.feature6 = result.feature6 !== undefined ? result.feature6 : true;
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
// 「すべて見る」ボタンのイベントを無効化する処理
// =========================
function disableSeeAllButtons() {
  if (!settings.feature4) return;
  
  // より具体的なセレクターで「すべて見る」ボタンを検索
  document.querySelectorAll('button.charcoal-button[data-variant="Navigation"]').forEach((button) => {
    if (button.textContent.includes('すべて見る')) {
      // クリックイベントを無効化
      button.style.pointerEvents = 'none';
      button.style.opacity = '0.5';
      button.style.cursor = 'default';
      // data属性でマーク
      button.setAttribute('data-pixiv-customizer-disabled', 'true');
    }
  });
  
  // より広範囲で「すべて見る」ボタンを検索
  document.querySelectorAll('button').forEach((button) => {
    if (button.textContent.trim() === 'すべて見る' && !button.hasAttribute('data-pixiv-customizer-disabled')) {
      // クリックイベントを無効化
      button.style.pointerEvents = 'none';
      button.style.opacity = '0.5';
      button.style.cursor = 'default';
      // data属性でマーク
      button.setAttribute('data-pixiv-customizer-disabled', 'true');
    }
  });
}

// 「すべて見る」ボタンのイベントを再有効化する関数
function enableSeeAllButtons() {
  // 無効化されたボタンを検索して元に戻す
  document.querySelectorAll('button[data-pixiv-customizer-disabled="true"]').forEach((button) => {
    // スタイルを元に戻す
    button.style.pointerEvents = '';
    button.style.opacity = '';
    button.style.cursor = '';
    // マークを削除
    button.removeAttribute('data-pixiv-customizer-disabled');
  });
}

// =========================
// サイドメニュー要素を非表示にする処理
// =========================
function hideSideMenuElement() {
  if (!settings.feature5) return;
  
  const sideMenuElement = document.querySelector('#__next > div > div:nth-child(2) > div.sc-1e6e6d57-0.gQkIQm.__top_side_menu_body > div > div.bg-background1 > div:nth-child(5)');
  if (sideMenuElement) {
    sideMenuElement.style.display = 'none';
  }
}

// サイドメニュー要素の表示をリセットする関数
function showSideMenuElement() {
  const sideMenuElement = document.querySelector('#__next > div > div:nth-child(2) > div.sc-1e6e6d57-0.gQkIQm.__top_side_menu_body > div > div.bg-background1 > div:nth-child(5)');
  if (sideMenuElement) {
    sideMenuElement.style.display = '';
  }
}

// =========================
// "作品を見る"解除ボタンを拡大する処理
// =========================
function scaleCloseButton() {
  if (!settings.feature6) return;
  
  const closeButton = document.querySelector('body > div:nth-child(16) > div > div > div.sc-32b84af9-0.iLqGMR > div > div.sc-32b84af9-2.hhJLpt.gtm-manga-viewer-close-icon');
  if (closeButton) {
    closeButton.style.transform = 'scale(3)';
    closeButton.style.transformOrigin = 'center';
    closeButton.style.zIndex = '9999';
  }
}

// "作品を見る"解除ボタンのスケールをリセットする関数
function resetCloseButton() {
  const closeButton = document.querySelector('body > div:nth-child(16) > div > div > div.sc-32b84af9-0.iLqGMR > div > div.sc-32b84af9-2.hhJLpt.gtm-manga-viewer-close-icon');
  if (closeButton) {
    closeButton.style.transform = '';
    closeButton.style.transformOrigin = '';
    closeButton.style.zIndex = '';
  }
}

// =========================
// すべての機能を実行
// =========================
function applyAllFeatures() {
  scaleBgSurface1();
  removeBgBackground2InsideGrid();
  hideCommentSection();
  hidePopularWorksSection();
  disableSeeAllButtons();
  hideSideMenuElement();
  scaleCloseButton();
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
    
    if (message.feature === 'feature4') {
      if (message.enabled) {
        disableSeeAllButtons();
      } else {
        enableSeeAllButtons();
      }
    }
    
    if (message.feature === 'feature5') {
      if (message.enabled) {
        hideSideMenuElement();
      } else {
        showSideMenuElement();
      }
    }
    
    if (message.feature === 'feature6') {
      if (message.enabled) {
        scaleCloseButton();
      } else {
        resetCloseButton();
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