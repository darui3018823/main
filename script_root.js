(() => {
    const brands = navigator.userAgentData?.brands?.map(({ brand }) => brand) || [];
    const ua = navigator.userAgent;
    const isChromium = brands.includes('Chromium') ||
        (/\b(Chrome|Chromium|Edg|OPR|SamsungBrowser)\//.test(ua) && !/\b(CriOS|FxiOS|Version\/.*Safari)\b/.test(ua));

    if (isChromium) {
        document.documentElement.classList.add('is-chromium');
    }
})();