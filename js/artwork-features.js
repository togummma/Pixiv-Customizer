// =========================
// アートワークページ関連機能
// =========================

// =========================
// "作品を見る"解除ボタンのクリックイベント連携
// =========================
let closeButtonClickHandler = null;

function scaleCloseButton() {
  if (!settings.feature6) return;
  
  // class="charcoal-token"の子のdivにイベントを追加
  const charcoalTokenDiv = document.querySelector('.charcoal-token > div');
  if (charcoalTokenDiv && !charcoalTokenDiv.hasAttribute('data-pixiv-customizer-enhanced')) {
    charcoalTokenDiv.style.cursor = 'pointer';
    
    // クリックイベントハンドラーを作成（動的に解除ボタンを検索）
    closeButtonClickHandler = function() {
      // 複数のセレクターで解除ボタンを検索
      const selectors = [
        'body > div:nth-child(16) > div > div > div.sc-32b84af9-0.iLqGMR > div > div.sc-32b84af9-2.hhJLpt.gtm-manga-viewer-close-icon',
        '[data-gtm-value="manga-viewer-close-icon"]',
        '.gtm-manga-viewer-close-icon',
        'div[role="dialog"] button[aria-label*="閉じる"]',
        'div[role="dialog"] button[aria-label*="close"]'
      ];
      
      let closeButton = null;
      for (const selector of selectors) {
        closeButton = document.querySelector(selector);
        if (closeButton) break;
      }
      
      if (closeButton) {
        closeButton.click();
      }
    };
    
    // クリックイベントを追加
    charcoalTokenDiv.addEventListener('click', closeButtonClickHandler);
    
    // マークを追加して重複を防ぐ
    charcoalTokenDiv.setAttribute('data-pixiv-customizer-enhanced', 'true');
  }
}

// "作品を見る"解除ボタンのクリックイベント連携をリセット
function resetCloseButton() {
  const charcoalTokenDiv = document.querySelector('.charcoal-token > div');
  if (charcoalTokenDiv) {
    charcoalTokenDiv.style.cursor = '';
    
    // イベントリスナーを削除
    if (closeButtonClickHandler) {
      charcoalTokenDiv.removeEventListener('click', closeButtonClickHandler);
      closeButtonClickHandler = null;
    }
    
    // マークを削除
    charcoalTokenDiv.removeAttribute('data-pixiv-customizer-enhanced');
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
// Feature9: アートワークページのおすすめ作品を非表示
// =========================
function hideArtworkRecommendations() {
  if (!settings.feature9) return;
  
  // h2要素でテキストが"おすすめ作品"のものを検索
  const h2Elements = document.querySelectorAll('h2');
  
  h2Elements.forEach(h2 => {
    const textContent = h2.textContent ? h2.textContent.trim() : '';
    
    if (textContent === 'おすすめ作品' && !h2.hasAttribute('data-pixiv-customizer-artwork-hidden')) {
      // h2の親の親要素を非表示にする
      const grandParent = h2.parentElement?.parentElement;
      if (grandParent) {
        grandParent.style.display = 'none';
        grandParent.setAttribute('data-pixiv-customizer-artwork-hidden', 'true');
      }
    }
  });
}

// Feature9リセット関数
function showArtworkRecommendations() {
  // カスタム属性でマークされた要素を復元
  const hiddenElements = document.querySelectorAll('[data-pixiv-customizer-artwork-hidden="true"]');
  hiddenElements.forEach(element => {
    element.style.display = '';
    element.removeAttribute('data-pixiv-customizer-artwork-hidden');
  });
}

// =========================
// アートワーク関連機能の適用
// =========================
function applyArtworkFeatures() {
  if (isArtworkPage()) {
    scaleCloseButton();          // feature6: ｢作品を見る｣を閉じやすくする
    hideArtworkRecommendations(); // feature9: アートワークページのおすすめ作品を非表示
    applyFeature8();             // feature8: おすすめユーザーを非表示
  }
}
