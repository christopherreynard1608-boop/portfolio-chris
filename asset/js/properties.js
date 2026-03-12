const galleryData = {
    'set1': ['asset/image/gaby_pic.jpeg', 'asset/image/toy_photo.jpeg', 'asset/image/sigma.jpeg'],
    'set2': ['asset/image/paklaring_censored.png'], 
    'set3': [
        'asset/image/figma_gjt.png', 
        'https://www.youtube.com/live/p8L395cZMi8?si=u3FW4zXAbTFnn7Qr',
        'asset/image/tekken_tourney.jpeg',
        'https://youtu.be/8vlo3XRfqlI' 
    ]
};

let slideIndex = 0;
let slideTimer;


function getYouTubeId(url) {
    const match = url.match(/(?:live\/|v=)([a-zA-Z0-9_-]{11})/);
    return (match && match[1]) ? match[1] : null;
}

function openGallery(setName) {
    const items = galleryData[setName];
    const slidesWrapper = document.getElementById('slides-wrapper');
    const dotWrapper = document.getElementById('dot-wrapper');

    if (!items || !slidesWrapper || !dotWrapper) return;

    slidesWrapper.innerHTML = '';
    dotWrapper.innerHTML = '';

    items.forEach((src, index) => {
        let content = '';
        
        if (src.toLowerCase().includes('yout')) {
            const videoId = getYouTubeId(src);
          
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            content = `
                <div class="slide fade">
                    <a href="${src}" target="_blank" class="video-link-container">
                        <img src="${thumbUrl}" alt="Watch on YouTube" style="width:100%;">
                        <div class="play-overlay">
                            <div class="play-button"></div>
                        </div>
                    </a>
                </div>`;
        } else {
            content = `<div class="slide fade"><img src="${src}" style="width:100%;"></div>`;
        }
        slidesWrapper.innerHTML += content;
        dotWrapper.innerHTML += `<span class="dot" onclick="currentSlide(${index})"></span>`;
    });

    slideIndex = 0;
    document.getElementById("galleryModal").style.display = "block";
    showSlides(slideIndex);
    resetTimer(); 
}

function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
    clearInterval(slideTimer); 
}

function changeSlide(n) {
    showSlides(slideIndex += n);
    resetTimer(); 
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer();
}

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function() {
        changeSlide(1);
    }, 10000); 
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;

    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex]) slides[slideIndex].style.display = "block";  
    if (dots[slideIndex]) dots[slideIndex].className += " active";
}


window.onclick = function(event) {
    let modal = document.getElementById("galleryModal");
    if (event.target == modal) {
        closeGallery();
    }
}

const hints = [
    "Tip: Integrating modern tech improves work methods.",
    "Tip: First-year UPH informatics students learn fast.",
    "Loading assets... Photography module active.",
    "Optimizing process efficiency...",
    "System Informatics: Modern problems require modern solutions."
];

function startLoading() {
    let width = 0;
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');
    const hintText = document.getElementById('loading-hint');

  
    const hintInterval = setInterval(() => {
        hintText.innerText = hints[Math.floor(Math.random() * hints.length)];
    }, 1500);

   
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            clearInterval(hintInterval);
            
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                }, 500);
            }, 500);
        } else {
            
            width += Math.floor(Math.random() * 5) + 1;
            if (width > 100) width = 100;
            bar.style.width = width + '%';
            percentText.innerText = width + '%';
        }
    }, 100);
}


window.onload = startLoading;