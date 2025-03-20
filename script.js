
const indicator = document.querySelector('.indicator');
const items = document.querySelectorAll('.nav-item');

function updateIndicator(el) {
    const color = el.getAttribute('active-color');
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = color;
}

items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        items.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
        updateIndicator(item);
    });
    if (item.classList.contains('active')) {
        updateIndicator(item);
    }
});

// initial positioning
updateIndicator(document.querySelector('.nav-item.active'));

//!!!!!!!!!!!!!!!!!!!!!!slide show code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let slideIndex = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide-box');
const dots = document.querySelectorAll('.dot');

// התחל לגרור
slidesWrapper.addEventListener('mousedown', startDrag);
slidesWrapper.addEventListener('touchstart', startDrag);

// גרור את הקופסאות
slidesWrapper.addEventListener('mousemove', dragging);
slidesWrapper.addEventListener('touchmove', dragging);

// סיים לגרור
slidesWrapper.addEventListener('mouseup', endDrag);
slidesWrapper.addEventListener('touchend', endDrag);
slidesWrapper.addEventListener('mouseleave', endDrag);

// עדכון הנקודות
function updateDots() {
dots.forEach((dot, index) => {
if (index === slideIndex) {
    dot.classList.add('activee');
} else {
    dot.classList.remove('activee');
}
});
}

// התחלת הגרירה
function startDrag(event) {
isDragging = true;
startPos = getPositionX(event);
slidesWrapper.style.transition = 'none';
}

// גרירה בפועל
function dragging(event) {
if (!isDragging) return;
const currentPos = getPositionX(event);
currentTranslate = prevTranslate + currentPos - startPos;
slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

// סיום הגרירה ועדכון
function endDrag() {
isDragging = false;
const movedBy = currentTranslate - prevTranslate;

// עדכון האינדקס לפי הכיוון
if (movedBy < -100 && slideIndex < slides.length - 1) {
slideIndex++;
}
if (movedBy > 100 && slideIndex > 0) {
slideIndex--;
}

setPositionByIndex();
updateDots();
}

// קבלת מיקום X
function getPositionX(event) {
return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// מיקום לפי האינדקס
function setPositionByIndex() {
currentTranslate = -slideIndex * slides[0].clientWidth;
prevTranslate = currentTranslate;
slidesWrapper.style.transition = 'transform 0.3s ease-in-out';
slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

// מעבר לתמונה על ידי לחיצה על נקודה
function goToSlide(index) {
slideIndex = index;
setPositionByIndex();
updateDots();
}

// תזוזה לתמונה קודמת או הבאה
function moveSlide(direction) {
if (direction === 1 && slideIndex < slides.length - 1) {
slideIndex++;
} else if (direction === -1 && slideIndex > 0) {
slideIndex--;
}
setPositionByIndex();
updateDots();
}

// עדכון ראשוני של הנקודות
updateDots();

//!!!!!!!!!!!!!!!!!!!!!!slide show end code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!אנימציה של היצירת קשר מתחילה עכשיו!!!!!!!!!!!!

document.addEventListener("scroll", function() {
var line = document.querySelector(".contact-form p");
var rect = line.getBoundingClientRect();

// בודקים אם האלמנט נכנס לתחום הצפייה של המשתמש
if (rect.top < window.innerHeight && rect.bottom > 0) {
line.classList.add("active"); // מוסיפים את מחלקת ה-active כדי להתחיל את האנימציה
}
});

//יחודיות מוצר----------------------



//--------מובייל---------

function openNav() {
    document.getElementById("myNav").style.height = "102.9%"; // פותח את התפריט
}

function closeNav() {
    document.getElementById("myNav").style.height = "0"; // סוגר את התפריט
}

// תחילה, סוגר את התפריט
document.addEventListener("DOMContentLoaded", function() {
    closeNav(); // סוגר את התפריט כשעמוד נטען
});


//רענון הדף כאשר לוחצים על הלוגו

function refreshPage() {
    location.reload();
}

// הפעלת הסרטון בעת לחיצה על כפתור

function playVideo() {
    var videoContainer = document.getElementById("videoContainer");
    var video = document.getElementById("videoPlayer");

    videoContainer.style.display = "block"; // מציג את הווידאו כשהכפתור נלחץ

    // להפעיל את הסרטון במסך מלא
    if (video.requestFullscreen) {
        video.requestFullscreen(); // עבור רוב הדפדפנים
    } else if (video.mozRequestFullScreen) { // עבור Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // עבור Chrome ו-Safari
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // עבור Internet Explorer/Edge
        video.msRequestFullscreen();
    }

    // הפעלת הסרטון אוטומטית כשהוא נכנס למסך מלא
    video.play();
}

// מאזין לאירוע כשיוצאים ממסך מלא
document.addEventListener("fullscreenchange", function() {
    var videoContainer = document.getElementById("videoContainer");
    var video = document.getElementById("videoPlayer");

    if (!document.fullscreenElement) { // אם אין אלמנט במסך מלא
        video.pause(); // עוצר את הווידאו
        video.currentTime = 0; // מחזיר את הסרטון להתחלה
        videoContainer.style.display = "none"; // מסתיר את הווידאו
    }
});
