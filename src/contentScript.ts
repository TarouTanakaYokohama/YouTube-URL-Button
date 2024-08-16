function createURLButton(): HTMLElement {
    const urlButton = document.createElement('button');
    urlButton.className = 'url-button';
    urlButton.style.cssText = `
        font-size: 12px;
        color: #FFFFFF;
        background-color: #FF0000;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    urlButton.draggable = true;

    // URLボタンをクリックしたらそのURLに遷移
    urlButton.addEventListener('click', () => {
        window.location.href = window.location.href;
    });

    // ドラッグ開始時のイベント
    urlButton.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('text/plain', window.location.href);
    });

    // ボタンのテキストを固定で「URL」に設定
    urlButton.textContent = 'URL';

    return urlButton;
}

function updateURL() {
    const searchContainer = document.querySelector('#search-form');
    if (!searchContainer) return;

    let urlButton = document.querySelector('.url-button') as HTMLElement;
    if (!urlButton) {
        urlButton = createURLButton();
        searchContainer.parentElement?.insertBefore(urlButton, searchContainer);
    }
}

async function checkURLChange() {
    let lastURL = window.location.href;

    while (true) {
        const currentURL = window.location.href;
        if (lastURL !== currentURL) {
            lastURL = currentURL;
            updateURL();
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒ごとにチェック
    }
}

window.addEventListener('load', () => {
    updateURL();
    checkURLChange();
});
