document.addEventListener("DOMContentLoaded", () => {
    const videos = {
        arm: [
            "https://www.youtube.com/embed/-bRTNeU67b8?si=0fotIlx1mDR4tfRM&start=129",
            "https://www.youtube.com/embed/CYKCw5Gb3bw?si=9-MVNChQAnTbkpr7&amp;start=141",
            "https://www.youtube.com/embed/06H1SGc1OUI?si=yJ8V176S9DhMfaCP&amp;start=385"
        ],
        chest: [
            "https://www.youtube.com/embed/ESgLFi8DwlQ?si=5Eeos6ZA0ckAkVF2&amp;start=132",
            "https://www.youtube.com/embed/O15zhdGYAjc?si=CzZSBn9P4HJON7tp&amp;start=195",
            "https://www.youtube.com/embed/nkXCouDfFdk?si=5uQsqdQRHKj_78aN&amp;start=200"
        ],
        leg: [
            "https://www.youtube.com/embed/m43qxfHaud8?si=xQzJ1H9pSgXvRwDx&amp;start=192",
            "https://www.youtube.com/embed/U9HvUqTDVXs?si=pKmiyVeZ0Knu6aAZ&amp;start=160",
            "https://www.youtube.com/embed/yCV47sTxRkY?si=7d-JXxUp3j-pr3EG&amp;start=180"
        ]
    };

    const pickRandomVideo = (category) => {
        const videoList = videos[category];
        const randomIndex = Math.floor(Math.random() * videoList.length);
        return videoList[randomIndex];
    };

    document.getElementById("arm-video").src = pickRandomVideo("arm");
    document.getElementById("chest-video").src = pickRandomVideo("chest");
    document.getElementById("leg-video").src = pickRandomVideo("leg");
});