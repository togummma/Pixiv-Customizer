// =========================
// ポップアップからのメッセージ処理
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
    handleFeatureChange(message.feature, message.enabled);
    
    sendResponse({ success: true });
  }
});

// =========================
// 機能変更時の処理
// =========================
function handleFeatureChange(feature, enabled) {
  switch(feature) {
    case 'feature7':
      if (enabled && isHomePage()) {
        hideSideMenuBottom();
      } else {
        showSideMenuBottom();
      }
      break;
      
    case 'feature5':
      if (enabled && isHomePage()) {
        hideSideMenuElement();
      } else {
        showSideMenuElement();
      }
      break;
      
    case 'feature1':
      if (enabled && isHomePage()) {
        scaleBgSurface1();
        removeBgBackground2InsideGrid();
      } else {
        resetScaleBgSurface1();
        console.log('サイドバー削除機能をOFFにしました。bg-background2の復元にはページをリロードしてください。');
      }
      break;
      
    case 'feature2':
      if (enabled && isHomePage()) {
        hideCommentSection();
      } else {
        showCommentSection();
      }
      break;
      
    case 'feature3':
      if (enabled && isHomePage()) {
        hidePopularWorksSection();
      } else {
        showPopularWorksSection();
      }
      break;
      
    case 'feature4':
      if (enabled && isHomePage()) {
        disableSeeAllButtons();
      } else {
        enableSeeAllButtons();
      }
      break;
      
    case 'feature6':
      if (enabled && isArtworkPage()) {
        scaleCloseButton();
      } else {
        resetCloseButton();
      }
      break;
      
    case 'feature8':
      if (enabled && isArtworkPage()) {
        applyFeature8();
      } else {
        resetFeature8();
      }
      break;
      
    case 'feature9':
      if (enabled && isArtworkPage()) {
        hideArtworkRecommendations();
      } else {
        showArtworkRecommendations();
      }
      break;
      
    case 'feature10':
      if (enabled && isDiscoveryPage()) {
        hideRelatedWorksSection();
      } else {
        showRelatedWorksSection();
      }
      break;
  }
}
