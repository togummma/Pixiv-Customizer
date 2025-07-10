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
  feature8: true,  // おすすめユーザーを非表示
  feature9: true   // アートワークページのおすすめ作品を非表示
};

// 設定を読み込み
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6', 'feature7', 'feature8', 'feature9']);
    settings.feature1 = result.feature1 !== undefined ? result.feature1 : true;
    settings.feature2 = result.feature2 !== undefined ? result.feature2 : true;
    settings.feature3 = result.feature3 !== undefined ? result.feature3 : true;
    settings.feature4 = result.feature4 !== undefined ? result.feature4 : true;
    settings.feature5 = result.feature5 !== undefined ? result.feature5 : true;
    settings.feature6 = result.feature6 !== undefined ? result.feature6 : true;
    settings.feature7 = result.feature7 !== undefined ? result.feature7 : true;
    settings.feature8 = result.feature8 !== undefined ? result.feature8 : true;
    settings.feature9 = result.feature9 !== undefined ? result.feature9 : true;
  } catch (error) {
    console.log('設定の読み込みに失敗しました:', error);
  }
}

// =========================
// URL判定ユーティリティ
// =========================
function isHomePage() {
  const currentUrl = window.location.href;
  return currentUrl === 'https://www.pixiv.net/' || currentUrl === 'https://www.pixiv.net';
}

function isArtworkPage() {
  const currentUrl = window.location.href;
  return currentUrl.includes('/artworks/');
}
