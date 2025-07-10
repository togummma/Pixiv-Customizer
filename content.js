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
  feature6: true,  // "作品を見る"解除ボタンクリック連携
  feature7: true,  // サイドメニュー下部を非表示
  feature8: true   // おすすめユーザーを非表示
};

// 設定を読み込み
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6', 'feature7', 'feature8']);
    settings.feature1 = result.feature1 !== undefined ? result.feature1 : true;
    settings.feature2 = result.feature2 !== undefined ? result.feature2 : true;
    settings.feature3 = result.feature3 !== undefined ? result.feature3 : true;
    settings.feature4 = result.feature4 !== undefined ? result.feature4 : true;
    settings.feature5 = result.feature5 !== undefined ? result.feature5 : true;
    settings.feature6 = result.feature6 !== undefined ? result.feature6 : true;
    settings.feature7 = result.feature7 !== undefined ? result.feature7 : true;
    settings.feature8 = result.feature8 !== undefined ? result.feature8 : true;
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
// サイドメニュー下部を非表示にする処理
// =========================
function hideSideMenuBottom() {
  if (!settings.feature7) return;
  
  const sideMenuBottom = document.querySelector('#__next > div > div:nth-child(2) > div.sc-1e6e6d57-0.gQkIQm.__top_side_menu_body > div > div.bg-background1 > div.pt-24.pb-40');
  if (sideMenuBottom) {
    sideMenuBottom.style.display = 'none';
  }
}

// サイドメニュー下部の表示をリセットする関数
function showSideMenuBottom() {
  const sideMenuBottom = document.querySelector('#__next > div > div:nth-child(2) > div.sc-1e6e6d57-0.gQkIQm.__top_side_menu_body > div > div.bg-background1 > div.pt-24.pb-40');
  if (sideMenuBottom) {
    sideMenuBottom.style.display = '';
  }
}

// =========================
// "作品を見る"解除ボタンのクリックイベント連携
// =========================
let closeButtonClickHandler = null;

function scaleCloseButton() {
  if (!settings.feature6) return;
  
  // 元の解除ボタン
  const closeButton = document.querySelector('body > div:nth-child(16) > div > div > div.sc-32b84af9-0.iLqGMR > div > div.sc-32b84af9-2.hhJLpt.gtm-manga-viewer-close-icon');
  
  // 新しい解除ボタン（更新されたセレクター）
  const newCloseButton = document.querySelector('body > div:nth-child(18) > div > div > div.sc-e06c24aa-0.eRofsO > div.sc-e06c24aa-1.gcvEmo > div:nth-child(3)');
  if (newCloseButton && !newCloseButton.hasAttribute('data-pixiv-customizer-enhanced')) {
    newCloseButton.style.cursor = 'pointer';
    
    // クリックイベントハンドラーを作成
    closeButtonClickHandler = function() {
      if (closeButton) {
        closeButton.click();
      }
    };
    
    // クリックイベントを追加
    newCloseButton.addEventListener('click', closeButtonClickHandler);
    
    // マークを追加して重複を防ぐ
    newCloseButton.setAttribute('data-pixiv-customizer-enhanced', 'true');
  }
}

// "作品を見る"解除ボタンのクリックイベント連携をリセット
function resetCloseButton() {
  const newCloseButton = document.querySelector('body > div:nth-child(18) > div > div > div.sc-e06c24aa-0.eRofsO > div.sc-e06c24aa-1.gcvEmo > div:nth-child(3)');
  if (newCloseButton) {
    newCloseButton.style.cursor = '';
    
    // イベントリスナーを削除
    if (closeButtonClickHandler) {
      newCloseButton.removeEventListener('click', closeButtonClickHandler);
      closeButtonClickHandler = null;
    }
    
    // マークを削除
    newCloseButton.removeAttribute('data-pixiv-customizer-enhanced');
  }
}

// =========================
// Feature8: おすすめユーザーを非表示
// =========================
function applyFeature8() {
  if (!settings.feature8) return;
  
  // おすすめユーザーのコンテンツを含むdivを検索し、その親を非表示にする
  const recommendedUserElements = document.querySelectorAll('div');
  
  recommendedUserElements.forEach(div => {
    // テキストコンテンツでおすすめユーザーセクションを特定（完全一致）
    const textContent = div.textContent ? div.textContent.trim() : '';
    const hasRecommendedUserContent = textContent === 'おすすめユーザー';
    
    if (hasRecommendedUserContent && !div.hasAttribute('data-pixiv-customizer-hidden')) {
      // 親要素を非表示にする
      const parentElement = div.parentElement;
      if (parentElement) {
        parentElement.style.display = 'none';
        parentElement.setAttribute('data-pixiv-customizer-hidden', 'true');
      }
    }
  });
  
  // フォールバック: 従来のセレクタも維持
  const artworkElement = document.querySelector('body > div:nth-child(11) > div');
  if (artworkElement && !artworkElement.hasAttribute('data-pixiv-customizer-hidden')) {
    artworkElement.style.display = 'none';
    artworkElement.setAttribute('data-pixiv-customizer-hidden', 'true');
  }
}

// Feature8リセット関数
function resetFeature8() {
  // カスタム属性でマークされた要素を復元
  const hiddenElements = document.querySelectorAll('[data-pixiv-customizer-hidden="true"]');
  hiddenElements.forEach(element => {
    element.style.display = '';
    element.removeAttribute('data-pixiv-customizer-hidden');
  });
}

// =========================
// ホームレイアウト関連機能（https://www.pixiv.net でのみ動作）
// =========================
function applyHomeFeatures() {
  const currentUrl = window.location.href;
  // ホームページまたは特定のホーム関連ページでのみ実行
  if (currentUrl === 'https://www.pixiv.net/' || 
      (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
    hideSideMenuBottom();        // toggle7: おすすめタグを非表示
    hideSideMenuElement();       // toggle5: おすすめ作品を非表示
    scaleBgSurface1();           // toggle1: タイムラインのサイドバー削除
    removeBgBackground2InsideGrid();
    disableSeeAllButtons();      // toggle4: 「すべて見る」ボタンを無効
    applyFeature8();             // toggle8: おすすめユーザーを非表示
  }
}

// =========================
// アートワーク関連機能（https://www.pixiv.net/artworks/ でのみ動作）
// =========================
function applyArtworkFeatures() {
  const currentUrl = window.location.href;
  // アートワークページでのみ実行（/artworks/で始まり、その後のパスは無視）
  if (currentUrl.includes('/artworks/')) {
    hideCommentSection();        // toggle2: コメントを非表示
    hidePopularWorksSection();   // toggle3: 他の作品を非表示
    scaleCloseButton();          // toggle6: ｢作品を見る｣を閉じやすくする
  }
}

// =========================
// すべての機能を実行
// =========================
function applyAllFeatures() {
  applyHomeFeatures();         // ホームレイアウト関連機能
  applyArtworkFeatures();      // アートワーク関連機能
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
    if (message.feature === 'feature7') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pixiv.net/' || 
            (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
          hideSideMenuBottom();
        }
      } else {
        showSideMenuBottom();
      }
    }
    
    if (message.feature === 'feature5') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pixiv.net/' || 
            (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
          hideSideMenuElement();
        }
      } else {
        showSideMenuElement();
      }
    }
    
    if (message.feature === 'feature1') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pixiv.net/' || 
            (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
          scaleBgSurface1();
          removeBgBackground2InsideGrid();
        }
      } else {
        resetScaleBgSurface1();
        // bg-background2の削除は元に戻せないため、ページリロードが推奨
        console.log('サイドバー削除機能をOFFにしました。bg-background2の復元にはページをリロードしてください。');
      }
    }
    
    if (message.feature === 'feature2') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl.includes('/artworks/')) {
          hideCommentSection();
        }
      } else {
        showCommentSection();
      }
    }
    
    if (message.feature === 'feature3') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl.includes('/artworks/')) {
          hidePopularWorksSection();
        }
      } else {
        showPopularWorksSection();
      }
    }
    
    if (message.feature === 'feature4') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pixiv.net/' || 
            (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
          disableSeeAllButtons();
        }
      } else {
        enableSeeAllButtons();
      }
    }
    
    if (message.feature === 'feature6') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl.includes('/artworks/')) {
          scaleCloseButton();
        }
      } else {
        resetCloseButton();
      }
    }
    
    if (message.feature === 'feature8') {
      if (message.enabled) {
        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pixiv.net/' || 
            (currentUrl.startsWith('https://www.pixiv.net') && !currentUrl.includes('/artworks/'))) {
          applyFeature8();
        }
      } else {
        resetFeature8();
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