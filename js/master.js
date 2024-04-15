// setting box
let settingBox = document.querySelector(".setting-box");
let settingBoxBtn = document.querySelector(".setting-box .fa-cog");
settingBoxBtn.addEventListener("click", function () {
  settingBox.classList.toggle("active");
});

let colors = document.querySelectorAll(".setting-box .color");
colors.forEach((e) => {
  e.addEventListener("click", function (e) {
    let colorData = e.target.getAttribute("color-data");
    document.documentElement.style.setProperty("--main-color", colorData);

    // store it in local storage
    localStorage.setItem("color", colorData);

    // add active class to color element
    colors.forEach((c) => {
      c.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

if (localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );

  // add active class to color element
  colors.forEach((c) => {
    if (c.getAttribute("color-data") === localStorage.getItem("color")) {
      c.classList.add("active");
    }
  });
}

// Reset Default Teal
let reset = document.querySelector(".reset");
reset.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});

// Animation Words
let words = ["Freelancer.", "Programmer.", "Designer."];
let animation = document.querySelector(".animation-words");
let time = 100;
let wordsLength = 0;

function sleep(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec);
  });
}

let WriteLoop = async () => {
  while (true) {
    if (wordsLength > words.length - 1) {
      wordsLength = 0;
    }

    let CurrentChar = words[wordsLength];
    for (let i = 0; i < CurrentChar.length; i++) {
      animation.innerText = CurrentChar.substring(0, i + 1);
      await sleep(time);
    }
    await sleep(time * 20);

    for (let i = CurrentChar.length; i > 0; i--) {
      animation.innerText = CurrentChar.substring(0, i - 1);
      await sleep(time);
    }

    await sleep(time * 5);
    wordsLength++;
  }
};
WriteLoop();

// toggle menu
let links = document.querySelector("header .links");
let toggleMenu = document.querySelector("header .toggle-menu");

toggleMenu.addEventListener("click", function () {
  links.classList.toggle("active");
  toggleMenu.classList.toggle("active");
});

// header scroll
let header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

// scroll to down
let scrollDown = document.querySelector(".landing .animated");
scrollDown.onclick = function () {
  setTimeout(
    () =>
      window.scrollBy({
        top: 1000,
        behavior: "smooth",
      }),
    300
  );
};

// increase numbers
let numbers = document.querySelectorAll(".numbers-info .card h4");
let numbersSection = document.querySelector(".numbers-info");

window.addEventListener("scroll", function () {
  if (window.scrollY > numbersSection.offsetTop - 300) {
    numbers.forEach((n) => {
      let end = n.getAttribute("data-number");
      let count = setInterval(() => {
        if (parseInt(n.innerText) == end) {
          clearInterval(count);
        } else {
          n.innerText = parseInt(n.innerText) + 1;
        }
      }, 20);
    });
  }
});

// header color change

let sections = document.querySelectorAll(".section");
let headerLinks = document.querySelectorAll("header .links a");

window.addEventListener("scroll", function () {
  sections.forEach((sec) => {
    let height = sec.offsetHeight;
    let position = sec.offsetTop;
    let currentScroll = window.scrollY;
    let id = sec.getAttribute("id");

    if (currentScroll >= position - 100 && currentScroll <= position + height) {
      headerLinks.forEach((a) => {
        a.classList.remove("active");
      });
      document
        .querySelector("header .links a[href*=" + id + "]")
        .classList.add("active");
    }
  });
});

// skills section
let skillsNumber = document.querySelectorAll(".skills-content .column .card p");
let skills = document.querySelectorAll(
  ".skills-content .column .card div span"
);
let skillSection = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  if (window.scrollY > skillSection.offsetTop - 300) {
    skills.forEach((s) => {
      s.style.width = s.getAttribute("data-width");
    });
  } else {
    skills.forEach((s) => {
      s.style.width = "0";
    });
  }
});

// gallery section
let gallerySections = document.querySelectorAll(".portfolio ul li");
let imgDiv = document.querySelectorAll(".portfolio-content .photo");

gallerySections.forEach((g) => {
  g.addEventListener("click", function () {
    imgDiv.forEach((i) => {
      let sectionsData = i.getAttribute("data-type").split(" ");
      let btnData = g.getAttribute("data-type");
      if (sectionsData.includes(btnData) || btnData === "all") {
        i.style.display = "block";

        // add class to btn
        gallerySections.forEach((e) => {
          e.classList.remove("active");
        });
        g.classList.add("active");
      } else {
        i.style.display = "none";
      }
    });
  });
});

// gallery card
let overlay = document.getElementById("overlay");
imgDiv.forEach((e) => {
  e.addEventListener("click", function () {
    overlay.classList.toggle("active");

    let parentDiv = document.createElement("div");
    parentDiv.className = "gallery-card";
    overlay.appendChild(parentDiv);

    let imgTitle = document.createElement("h3");
    let titleText = document.createTextNode(e.children[0].alt);
    imgTitle.appendChild(titleText);
    parentDiv.appendChild(imgTitle);

    let photo = document.createElement("div");
    photo.className = "photo";
    parentDiv.appendChild(photo);

    let img = document.createElement("img");
    img.src = e.children[0].src;
    photo.appendChild(img);

    let info = document.createElement("div");
    info.className = "info";
    parentDiv.appendChild(info);

    let infoTitle = document.createElement("h4");
    let infoTitleText = document.createTextNode("Project Info");
    infoTitle.appendChild(infoTitleText);
    info.appendChild(infoTitle);

    let infoParaghraph = document.createElement("p");
    let Paraghraph =
      "Quidam lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure. Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.";
    let infoParaghraphText = document.createTextNode(Paraghraph);
    infoParaghraph.appendChild(infoParaghraphText);
    info.appendChild(infoParaghraph);

    let xmark = document.createElement("div");
    let xmarkText = document.createTextNode("x");
    xmark.className = "xmark";
    xmark.appendChild(xmarkText);
    parentDiv.appendChild(xmark);

    xmark.addEventListener("click", function () {
      parentDiv.remove();
      overlay.classList.remove("active");
    });

    window.addEventListener("click", function (e) {
      if (e.target == overlay) {
        parentDiv.remove();
        overlay.classList.remove("active");
      }
    });
  });
});

// seitch card in testimonial
let firstBtn = document.querySelectorAll(".testi-btns span")[0];
let secondBtn = document.querySelectorAll(".testi-btns span")[1];
let FirstCard = document.querySelector(".testi-content .one");
firstBtn.addEventListener("click", function () {
  FirstCard.classList.remove("active");
  secondBtn.classList.remove("active");

  firstBtn.classList.add("active");
});
secondBtn.addEventListener("click", function () {
  FirstCard.classList.add("active");
  firstBtn.classList.remove("active");

  secondBtn.classList.add("active");
});

// toUp btn
let toUp = document.querySelector(".ToUp");
window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    toUp.classList.add("show");
  } else {
    toUp.classList.remove("show");
  }
});

toUp.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
