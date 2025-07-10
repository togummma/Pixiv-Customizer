// ポップアップが読み込まれた時の処理
document.addEventListener('DOMContentLoaded', async () => {
  // 保存された設定を読み込み
  const settings = await chrome.storage.sync.get(['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6', 'feature7', 'feature8']);
  
  // デフォルト値を設定（初回起動時）
  const feature1 = settings.feature1 !== undefined ? settings.feature1 : true;
  const feature2 = settings.feature2 !== undefined ? settings.feature2 : true;
  const feature3 = settings.feature3 !== undefined ? settings.feature3 : true;
  const feature4 = settings.feature4 !== undefined ? settings.feature4 : true;
  const feature5 = settings.feature5 !== undefined ? settings.feature5 : true;
  const feature6 = settings.feature6 !== undefined ? settings.feature6 : true;
  const feature7 = settings.feature7 !== undefined ? settings.feature7 : true;
  const feature8 = settings.feature8 !== undefined ? settings.feature8 : true;
  
  // トグルスイッチの状態を設定
  updateToggleState('toggle1', feature1);
  updateToggleState('toggle2', feature2);
  updateToggleState('toggle3', feature3);
  updateToggleState('toggle4', feature4);
  updateToggleState('toggle5', feature5);
  updateToggleState('toggle6', feature6);
  updateToggleState('toggle7', feature7);
  updateToggleState('toggle8', feature8);
  
  // イベントリスナーを設定
  document.getElementById('toggle1').addEventListener('click', () => {
    toggleFeature('toggle1', 'feature1');
  });
  
  document.getElementById('toggle2').addEventListener('click', () => {
    toggleFeature('toggle2', 'feature2');
  });
  
  document.getElementById('toggle3').addEventListener('click', () => {
    toggleFeature('toggle3', 'feature3');
  });
  
  document.getElementById('toggle4').addEventListener('click', () => {
    toggleFeature('toggle4', 'feature4');
  });
  
  document.getElementById('toggle5').addEventListener('click', () => {
    toggleFeature('toggle5', 'feature5');
  });
  
  document.getElementById('toggle6').addEventListener('click', () => {
    toggleFeature('toggle6', 'feature6');
  });
  
  document.getElementById('toggle7').addEventListener('click', () => {
    toggleFeature('toggle7', 'feature7');
  });
  
  document.getElementById('toggle8').addEventListener('click', () => {
    toggleFeature('toggle8', 'feature8');
  });
});

// トグルスイッチの見た目を更新
function updateToggleState(toggleId, isActive) {
  const toggle = document.getElementById(toggleId);
  if (isActive) {
    toggle.classList.add('active');
  } else {
    toggle.classList.remove('active');
  }
}

// 機能のON/OFFを切り替え
async function toggleFeature(toggleId, featureKey) {
  const toggle = document.getElementById(toggleId);
  const isActive = !toggle.classList.contains('active');
  
  // 見た目を更新
  updateToggleState(toggleId, isActive);
  
  // 設定を保存
  await chrome.storage.sync.set({ [featureKey]: isActive });
  
  // コンテンツスクリプトに設定変更を通知
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('pixiv.net')) {
      // まず設定を更新
      await chrome.tabs.sendMessage(tab.id, {
        action: 'updateSettings',
        settings: {
          [featureKey]: isActive
        }
      });
      
      // 即座にUIを更新
      await chrome.tabs.sendMessage(tab.id, {
        action: 'applyChanges',
        feature: featureKey,
        enabled: isActive
      });
    }
  } catch (error) {
    console.log('タブにメッセージを送信できませんでした:', error);
    // エラーが発生した場合、コンテンツスクリプトを再注入してみる
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (scriptError) {
      console.log('スクリプトの再注入に失敗しました:', scriptError);
    }
  }
}
