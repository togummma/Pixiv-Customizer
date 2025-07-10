// =========================
// ホームページ関連機能
// =========================

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

// =========================
// コメント領域を非表示にする処理
// =========================
function hideCommentSection() {
  if (!settings.feature2) return;
  
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
      if (
        child.classList.contains("rounded-8") &&
        child.getAttribute("data-ga4-label") === "user_popular_works"
      ) {
        child.style.display = "none";
      }
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
// ホームレイアウト関連機能の適用
// =========================
function applyHomeFeatures() {
  if (isHomePage()) {
    hideSideMenuBottom();        // feature7: おすすめタグを非表示
    hideSideMenuElement();       // feature5: おすすめ作品を非表示
    scaleBgSurface1();           // feature1: タイムラインのサイドバー削除
    removeBgBackground2InsideGrid();
    hideCommentSection();        // feature2: コメントを非表示
    hidePopularWorksSection();   // feature3: 他の作品を非表示
    disableSeeAllButtons();      // feature4: 「すべて見る」ボタンを無効
  }
}
