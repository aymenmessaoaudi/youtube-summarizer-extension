export function isDarkTheme() {
    const bg = getComputedStyle(document.documentElement)
        .getPropertyValue('--yt-spec-base-background')
        .trim();
    return bg === '#0f0f0f' || window.matchMedia('(prefers-color-scheme: dark)').matches;
}
export function getVideoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("v");
}
