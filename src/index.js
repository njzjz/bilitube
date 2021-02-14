(() => {
    /** When youtube is unavaiable, fallback to bilibili */
    const $$ = (className) => document.querySelectorAll(className);
    const load_video = (element, vsrc) => {
        const frame = `<iframe src="${vsrc}" frameborder="0" loading="lazy" allowfullscreen></iframe>`;
        element.innerHTML = frame;
    };
    function use_youtube() {
        // https://www.youtube.com/embed/diWEMGDKx9g
        $$(".bilitube").forEach(element => {
            load_video(element, `https://www.youtube.com/embed/${element.dataset.youtube}`);
        });
    }
    function use_bilibili() {
        // https://player.bilibili.com/player.html?bvid=BV1454y1X7et
        $$(".bilitube").forEach(element => {
            load_video(element, `https://player.bilibili.com/player.html?bvid=${element.dataset.bvid}`);
        });
    }
    function check_youtube() {
        const runcheck = (domain) => {
            /** https://github.com/SukkaW/DisqusJS/blob/master/src/disqus.js */
            return new Promise((resolve, reject) => {
                const img = new Image;
                // handle timeout
                const timeout = setTimeout(() => {
                    img.onerror = img.onload = null;
                    reject();
                }, 3000);

                img.onerror = () => {
                    clearTimeout(timeout);
                    reject();
                }

                img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                }

                img.src = `https://${domain}/favicon.ico?${+(new Date)}=${+(new Date)}`;
            })
        }

        return Promise.all([
            runcheck('www.youtube.com'),
        ]).then(use_youtube, use_bilibili);
    }
    check_youtube();
})();