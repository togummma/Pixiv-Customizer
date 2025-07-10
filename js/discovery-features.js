// =========================
// ディスカバリーページ関連機能
// =========================

// =========================
// Feature 10: ディスカバリーページの関連作品セクションを非表示にする
// =========================
function hideRelatedWorksSection() {
  if (!settings[FEATURES.DISCOVERY_FEATURE_10]) return;
  
  // <h3>関連作品</h3> 要素を検索
  const relatedWorksHeaders = document.querySelectorAll('h3');
  
  for (const header of relatedWorksHeaders) {
    if (header.textContent?.includes('関連作品')) {
      // h3要素から4つ上の親要素を取得
      let ancestor = header;
      for (let i = 0; i < 4; i++) {
        ancestor = ancestor.parentElement;
        if (!ancestor) {
          console.log('関連作品の4つ上の祖先要素が見つかりませんでした');
          return;
        }
      }
      
      // その要素が .gtm-illust-recommend-zone の直接の子要素かどうかチェック
      const recommendZone = ancestor.parentElement;
      if (recommendZone && recommendZone.classList.contains('gtm-illust-recommend-zone')) {
        // 既に非表示処理が適用されているかチェック
        if (!ancestor.hasAttribute('data-pixiv-customizer-hidden')) {
          ancestor.style.display = 'none';
          ancestor.setAttribute('data-pixiv-customizer-hidden', 'related-works');
          console.log('ディスカバリーページの関連作品セクションを非表示にしました');
        }
      }
    }
  }
}

// Feature 10のリセット関数
function showRelatedWorksSection() {
  const hiddenElements = document.querySelectorAll('[data-pixiv-customizer-hidden="related-works"]');
  
  hiddenElements.forEach(element => {
    element.style.display = '';
    element.removeAttribute('data-pixiv-customizer-hidden');
  });
  
  if (hiddenElements.length > 0) {
    console.log('ディスカバリーページの関連作品セクションを再表示しました');
  }
}

// =========================
// ディスカバリー関連機能の適用
// =========================
function applyDiscoveryFeatures() {
  if (isDiscoveryPage()) {
    hideRelatedWorksSection();  // feature10: 関連作品セクションを非表示
    // TODO: 他のディスカバリー機能もここに追加
  }
}
