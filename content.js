// Pixivの「おすすめユーザー」「コンテスト」などを含む右サイドバーを非表示にする

function findSidebarElement() {
  // サイドバーの候補をすべて取得
  const candidates = document.querySelectorAll("div.sticky.box-border");

  for (const el of candidates) {
    const classList = el.classList;

    // 幅を指定するクラスが 'w-' で始まっており、overflow-y-auto を含むか確認
    if (
      Array.from(classList).some(cls => cls.startsWith("w-")) &&
      classList.contains("overflow-y-auto")
    ) {
      return el;
    }
  }

  return null;
}

// DOMが構築されたあとに繰り返し確認
function waitForSidebar(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    const maxTries = timeout / interval;
    let tries = 0;

    const check = () => {
      const el = findSidebarElement();
      if (el) {
        resolve(el);
        return;
      }
      tries++;
      if (tries > maxTries) {
        reject("右サイドバーが見つかりませんでした");
        return;
      }
      setTimeout(check, interval);
    };

    check();
  });
}

waitForSidebar()
  .then((sidebar) => {
    sidebar.style.display = "none";
  })
  .catch((err) => {
    console.warn("Pixiv Customizer: ", err);
  });
