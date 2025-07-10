// =========================
// 設定管理
// =========================
const FEATURES = {
  TIMELINE_SIDEBAR_REMOVAL: 'feature1',    // bg-surface1拡大 & bg-background2削除
  HIDE_COMMENTS: 'feature2',               // コメント領域を非表示
  HIDE_POPULAR_WORKS: 'feature3',          // 人気作品領域を非表示
  DISABLE_SEE_ALL_BUTTONS: 'feature4',     // 「すべて見る」ボタンを削除
  HIDE_SIDE_MENU_ELEMENT: 'feature5',      // サイドメニュー要素を非表示
  CLOSE_BUTTON_ENHANCEMENT: 'feature6',    // "作品を見る"解除ボタンクリック連携
  HIDE_SIDE_MENU_BOTTOM: 'feature7',       // サイドメニュー下部を非表示
  HIDE_RECOMMENDED_USERS: 'feature8',      // おすすめユーザーを非表示
  HIDE_ARTWORK_RECOMMENDATIONS: 'feature9', // アートワークページのおすすめ作品を非表示
  DISCOVERY_FEATURE_10: 'feature10'        // ディスカバリーページ機能1（今後拡張用）
};

let settings = {
  [FEATURES.TIMELINE_SIDEBAR_REMOVAL]: true,
  [FEATURES.HIDE_COMMENTS]: true,
  [FEATURES.HIDE_POPULAR_WORKS]: true,
  [FEATURES.DISABLE_SEE_ALL_BUTTONS]: true,
  [FEATURES.HIDE_SIDE_MENU_ELEMENT]: true,
  [FEATURES.CLOSE_BUTTON_ENHANCEMENT]: true,
  [FEATURES.HIDE_SIDE_MENU_BOTTOM]: true,
  [FEATURES.HIDE_RECOMMENDED_USERS]: true,
  [FEATURES.HIDE_ARTWORK_RECOMMENDATIONS]: true,
  [FEATURES.DISCOVERY_FEATURE_10]: true
};

// 設定を読み込み
async function loadSettings() {
  try {
    const featureKeys = Object.values(FEATURES);
    const result = await chrome.storage.sync.get(featureKeys);
    
    // 各機能の設定を読み込み（デフォルト値はtrue）
    for (const feature of featureKeys) {
      settings[feature] = result[feature] !== undefined ? result[feature] : true;
    }
  } catch (error) {
    console.log('設定の読み込みに失敗しました:', error);
  }
}

// =========================
// URL判定ユーティリティ
// =========================
const PIXIV_URLS = {
  HOME: 'https://www.pixiv.net/',
  HOME_ALT: 'https://www.pixiv.net',
  ARTWORKS_PATH: '/artworks/',
  DISCOVERY: 'https://www.pixiv.net/discovery'
};

function isHomePage() {
  const currentUrl = window.location.href;
  return currentUrl === PIXIV_URLS.HOME || currentUrl === PIXIV_URLS.HOME_ALT;
}

function isArtworkPage() {
  const currentUrl = window.location.href;
  return currentUrl.includes(PIXIV_URLS.ARTWORKS_PATH);
}

function isDiscoveryPage() {
  const currentUrl = window.location.href;
  return currentUrl.startsWith(PIXIV_URLS.DISCOVERY);
}
