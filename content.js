// =========================
// Pixiv Customizer - メインファイル
// =========================

// =========================
// すべての機能を実行
// =========================
function applyAllFeatures() {
  applyHomeFeatures();         // ホームレイアウト関連機能
  applyArtworkFeatures();      // アートワーク関連機能
  applyDiscoveryFeatures();    // ディスカバリー関連機能
}

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
const observer = new MutationObserver((mutations) => {
  // 基本機能を再適用
  applyAllFeatures();
  
  // feature6が有効な場合、新しく追加される.charcoal-token > div要素にもイベントを追加
  if (settings.feature6 && isArtworkPage()) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 新しく追加された.charcoal-token > div要素を検索
          const charcoalTokenDivs = node.querySelectorAll ? node.querySelectorAll('.charcoal-token > div') : [];
          charcoalTokenDivs.forEach(div => {
            if (!div.hasAttribute('data-pixiv-customizer-enhanced')) {
              scaleCloseButton();
            }
          });
          
          // 追加されたノード自体が.charcoal-token > divの場合
          if (node.matches && node.matches('.charcoal-token > div') && !node.hasAttribute('data-pixiv-customizer-enhanced')) {
            scaleCloseButton();
          }
        }
      });
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});