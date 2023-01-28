window.addEventListener("load",initCopyLink);

function initCopyLink() {
    document.getElementById("copyLinkButton").addEventListener("click",copyToClipboard);
}

function copyToClipboard() {
    const link = document.getElementById("surveyLink").href;
    navigator.clipboard.writeText(link);
}