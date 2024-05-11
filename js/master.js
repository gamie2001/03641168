
let mainColols = localStorage.getItem("color_options");

if (mainColols != null) {
    // console.log("local storage is not empty");}

    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_options"));


    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");


        if (element.dataset.color === mainColols) {
            element.classList.add("active");
        }
    })
}

// // Random Background Option
let backgroundOption = true;

// variable to contorol the Background interval

let theInterval;

// check if there's local storage random background item 
let backgroundlocalItem = localStorage.getItem("background_option");

//  check if background local storage is not empty 
if (backgroundlocalItem !== null) {


    if (backgroundlocalItem === true) {

        backgroundOption = true;

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {
        backgroundOption = false;

        document.querySelector(".random-backgrounds .no").classList.add("active");


    }
    // remve active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });



}

// click on toggle settings gear
document.querySelector(".togle .fa-gear").onclick = function () {
    // يلف
    this.classList.toggle("fa-spin");

    // يفتح ويقفل
    document.querySelector(".settings-box").classList.toggle("open");
};


// switch colors 
const colorli = document.querySelectorAll(".colors-list li");

// loop on all list items
colorli.forEach(li => {

    // click on evry list items 
    li.addEventListener("click", (e) => {

        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});
// switch Random Background option 
const colorandomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
colorandomBackEl.forEach(span => {
    // click on evry list items 
    span.addEventListener("click", (e) => {


        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);


        } else {
            backgroundOption = false;

            clearInterval(theInterval);

            localStorage.setItem("background_option", false);

        }

    });


});






// select landing page
let landingPage = document.querySelector('.landing-page');

// get array of landing pages imgs 
let imgsArray = ["wallpaperflare.com_wallpaper (5).jpg",
    "wallpaperflare.com_wallpaper (6).jpg",
    "wallpaperflare.com_wallpaper (7).jpg",
    "wallpaperflare.com_wallpaper (8).jpg",
    "wallpaperflare.com_wallpaper (9).jpg",
    "wallpaperflare.com_wallpaper (10).jpg",
    "wallpaperflare.com_wallpaper (11).jpg",
    "wallpaperflare.com_wallpaper (12).jpg",
    "wallpaperflare.com_wallpaper (13).jpg",
    "wallpaperflare.com_wallpaper (14).jpg",];


// // Random to Randomize Images
function randomizeImgs() {

    if (backgroundOption === true) {

        theInterval = setInterval(() => {

            // get random number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Change background img url 
            landingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';
        }, 5000);

    }
}

randomizeImgs();

// // select Skills Selector 
// let ourSkills = document.querySelector(".skills");

// window.onscroll = function () {
//     // Skills offset Top 
//     let skillsOffsetTop =  ourSkills.offsetTop;

//     // outer height
//     let skillsOuterHeight = ourSkills.offsetHeight;

//     // window Height
//     let windowHeight = this.innerHeight;

//     // window ScrolTop
//     let windowScrolTop = this.pageYOffset;

//     if(windowScrolTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

//         let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

//         allSkills.forEach(skill => {

//             skill.style.width = skill.dataset.width;

//         });
//     }
// };

let div = document.querySelector('.skills');
let spans = document.querySelectorAll('.skill-progress span');
window.onscroll = function () {
    if (window.scrollY >= div.offsetTop - 200) {
        spans.forEach((item) => {
            item.style.width = item.dataset.width;
        });

    };
};

// create Popup with the image 
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // create Overlay elemnt 
        let overlay = document.createElement("div");

        // add clss to overlay
        overlay.className = 'popup-overlay';


        // append overlay to body
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement("div");

        // add clss to popup box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            // create heading 
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        // create the image 
        let popupImage = document.createElement("img");

        // set img src
        popupImage.src = img.src;

        // add img to popup box
        popupBox.appendChild(popupImage);

        // add the popup box to body
        document.body.appendChild(popupBox);

        // create close span 
        let closeButton = document.createElement("span");

        // create text for heading
        let closeButtonText = document.createTextNode("x");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to  close button

        closeButton.className = 'close-button';

        // append close Button to body
        popupBox.appendChild(closeButton);


    });
});

// close popup 
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {
        // remove the current popup 
        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector(".popup-overlay").remove();
    }
})


// select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");


// select all linls
const allLinks = document.querySelectorAll(".links a");




function scrollToSomewhere(element) {

    element.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });

        });



    });
}

scrollToSomewhere(allbullets);
scrollToSomewhere(allLinks);

// function handle Active state 

function handleActive(ev) {

    // remove  active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add active class on self
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletlocalItem = localStorage.getItem("bullets_option");

if (bulletlocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletlocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");


    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");



    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {


        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');


        }

        handleActive(e);

    });
});


// reset buton

document.querySelector(".reset-option").onclick = function () {

    localStorage.removeItem("bullets_option");
    localStorage.removeItem("colors-list");
    localStorage.removeItem("random-backgrounds");

    window.location.reload();

}


// toggle btn

let togllebtn = document.querySelector(".toggle-menu");
let ttlinks =  document.querySelector(".links");


togllebtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    ttlinks.classList.toggle("open");


}

// click anywhere outside menu and Toggle menu
document.addEventListener("click", (e) => {

    if (e.target !== togllebtn && e.target !== ttlinks) {

        // check if menu is open
        if (ttlinks.classList.contains("open")) {

            togllebtn.classList.toggle("menu-active");

            ttlinks.classList.toggle("open");

        }
    }
});

// stop propagation on menu
ttlinks.onclick = (e) => {
    e.stopPropagation();
}
