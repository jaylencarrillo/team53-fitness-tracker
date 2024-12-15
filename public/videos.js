document.addEventListener("DOMContentLoaded", () => {
    const videos = {
        arm: [
            "https://www.youtube.com/embed/-bRTNeU67b8?si=0fotIlx1mDR4tfRM&start=129",
            "https://www.youtube.com/embed/CYKCw5Gb3bw?si=9-MVNChQAnTbkpr7&amp;start=141",
            "https://www.youtube.com/embed/j64BBgBGNIU?si=RnWy24oM-1FkOrUC&amp;start=133",
            "https://www.youtube.com/embed/puLJaNv9m18?si=q4bqzDHKmUi20yEu&amp;start=57"
        ],
        chest: [
            "https://www.youtube.com/embed/ESgLFi8DwlQ?si=5Eeos6ZA0ckAkVF2&amp;start=132",
            "https://www.youtube.com/embed/O15zhdGYAjc?si=CzZSBn9P4HJON7tp&amp;start=195",
            "https://www.youtube.com/embed/a9vL6BsgkPg?si=OTP1W6627QO-J9KY&amp;start=189",
            "https://www.youtube.com/embed/moo4_xVnzrI?si=QobO0Sl9YCFWdXIW&amp;start=536"
        ],
        leg: [
            "https://www.youtube.com/embed/m43qxfHaud8?si=xQzJ1H9pSgXvRwDx&amp;start=192",
            "https://www.youtube.com/embed/U9HvUqTDVXs?si=pKmiyVeZ0Knu6aAZ&amp;start=160",
            "https://www.youtube.com/embed/Byn9mPPZrtk?si=zDvRBGBWmBvNip-F&amp;start=276",
            "https://www.youtube.com/embed/hzuSvsu5hIU?si=E278uovHFXQcYjdi&amp;start=189"
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