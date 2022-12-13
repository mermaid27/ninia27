'use.strict'
let data = [
    { Id : 1, 
    imageUrl :('../https://images.ctfassets.net/kdawwlsweh27/73v8l2HnjGv3e5UmXFwUMc/39b2c778ed19774255d895ac4ee0ff9e/home-hero-banner-image.png'), 
    title : 'What is Desktop Publishing (DTP)?', }, 

    
    { Id : 2, 
    imageUrl : ('../https://farm4.staticflickr.com/3914/15118079089_489aa62638_b.jpg'),
    title : 'Why DTP is important in the sector of translation?', }, 

    { Id : 3, 
    imageUrl: ('../styles/images/techno-map.jpg'), 
    title : 'How to use DTP?', }

    
];

let arrowLeft = document.getElementById ('arrow-left');
let arrowRight = document.getElementById ('arrow-right');
let sliderContent = document.getElementById ('slider-content');
let sliderIndex = 0; 


function createDivTag() {
    const DivTag = document.createElement('div'); 
    DivTag.classList.add('slide'); 
    return DivTag;  
}

function createImageTag(item) {
    const tagImage = document.createElement('image'); 
    tagImage.setAttribute('src', item.imageUrl); 
    tagImage.setAttribute('alt', item.title); 
    
    return tagImage; 
}

function createTitleTag(item) {
    const tagTitle = document.createElement('h3'); 
    tagTitle.textContent = item.title ; 
    
    return tagTitle; 
}

function slide() {
    sliderContent.innerHTML = ""; 
    const slideItem = createDivTag(data[sliderIndex]);
    const ImgTag = createImageTag(data[sliderIndex]);
    const titleTag = createTitleTag(data[sliderIndex]);
    
    slideItem.appendChild(ImgTag); 
    slideItem.appendChild(titleTag); 
    sliderContent.appendChild(slideItem); 

}
arrowLeft.addEventListener('click', function() {
    sliderIndex--; 
    
    slide();
}) 
arrowRight.addEventListener('click', function() {
    sliderIndex++; 
    slide();
}) 




slide()




var splide = new Splide( '.splide' );
splide.mount();  


function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);



  let registrationForm = document.getElementById('registrationForm'); 
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    let errors = {};
    let usernameValue = document.getElementById('usernameField').value; 
    if (usernameValue == "" && usernameValue.length > 5 ) {
        errors.username = 'Username Field Cannot be empty and must be more than 5 characters'
    }
  })
  
  let passwordValue = document.getElementById ('passwordField'); 
  let passwordValue2 = document.getElementById ('passwordField');
  if (passwordValue != passwordValue2 ) {
    errors.passwordValue2 = 'Passwords do not match'
  } 

  let agreeField = document.getElementById('agreeTerms').cheked; 
  if (!agreeField) {
    errors.agree = ('You have to agree our Terms and Conditions')

    console.log (errors); 

   
    document.querySelectorAll('.error-text').forEach((item) => 
     item.innerText = " ", 
    )

    }

    for (let key in errors) {
        console.log(key); 
        let spanText = document.getElementById('error_ = key')

        if (spanText) {
            spanText.innerText = errors[key]; 
        }

        if (Object.key(errors).length == 0 ) {
            registrationForm.submit(); 
        }
    }






    let mainWrapper = document.getElementById("postWraper");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");

// ამ ფუქნციის საშუალებით ჩვენს ვაწყობთ მოთხოვნას
function ajax(url, callback) {
  let requist = new XMLHttpRequest();
  requist.open("GET", url);
  requist.addEventListener("load", function () {
    // let pasuxiTesti = requist.responseText;
    // let pasuxirogrocJs = JSON.parse(pasuxiTesti);
    let dataRogorcJs = JSON.parse(requist.responseText);
    callback(dataRogorcJs);
  });
  requist.send();
}
ajax("https://jsonplaceholder.typicode.com/posts", function (dataRogorcJs) {
  //item - aris satitaod titotoeuli obiekti
  dataRogorcJs.forEach((item) => {
    createPost(item);
  });
});

//ამ ფუნქციის საშუალებით ჩვენ ვქმნით სათაიტაოდ თითოეულს დივს თავისი კონტენტით
function createPost(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");
  divWrapper.setAttribute("data-id", item.id);

  let h4Tag = document.createElement("h4");
  h4Tag.innerText = item.id;

  let h2Tag = document.createElement("h2");
  h2Tag.innerText = item.title;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = " delete this Post";
  deleteButton.setAttribute("data-id", item.id);

  divWrapper.appendChild(h4Tag);
  divWrapper.appendChild(h2Tag);
  divWrapper.appendChild(deleteButton);

  //washlis gilaksi funqcionali
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    let axaliUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(axaliUrl, {
      method: "DELETE",
    }).then(() => divWrapper.remove());
  });

  divWrapper.addEventListener("click", function (event) {
    // console.log(event.target); - ეს არის ის დივი რომელზეც მოხდება ქლიქი
    //კონკრეტული დივის დაჭერის დრო ვიღებ დივის data-id -ის მნიშვნელობას
    // და ვინახავ id-ის ცვლადში
    let id = event.target.getAttribute("data-id");
    overlay.classList.add("active");
    let axaliUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(axaliUrl, function (dataRogorcJs) {
      overlayFunction(dataRogorcJs);
    });
  });

  mainWrapper.appendChild(divWrapper);
  console.log(divWrapper);
}

//ამ ფუნქციაში გვენქბეა გაწერილი ის ლოგიკა, რომლის შაშუალებით
// წამოვირებთ პოსტის დეტალურ ინფორმაციას
function overlayFunction(item) {
  let description = document.createElement("p");
  description.innerText = item.body;
  content.appendChild(description);
}

//popapis close icon-is logika
closeIcon.addEventListener("click", function () {
  overlay.classList.remove("active");
  content.innerHTML = " ";
});

//image example
let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (dabrunebuliTextdad) {
      if (dabrunebuliTextdad.status !== 200) {
        throw dabrunebuliTextdad.status;
      }
      return dabrunebuliTextdad.json();
    })
    .then(function (dabrunebulirogorcJs) {
      const fragment = new DocumentFragment();
      dabrunebulirogorcJs.data.forEach((item) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.classList.add("span-user");
        // li.innerText = item.first_name + item.last_name;
        span.innerText = `${item.first_name} ${item.last_name}`;

        let image = document.createElement("img");
        image.src = item.avatar;
        image.classList.add("image-user");
        image.setAttribute("alt", "user-image");

        li.appendChild(image);
        li.appendChild(span);
        fragment.appendChild(li);
      });

      document.getElementById("ul-users").innerHTML = " ";
      document.getElementById("ul-users").appendChild(fragment);

      totalPages = dabrunebulirogorcJs.total_pages;
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not FOund";
        document.getElementById("api-users").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";
        document.getElementById("api-users").appendChild(p);
      }
    });
}
document.getElementById("loadprevuser").addEventListener("click", function () {
  if (currentPage == 1) {
    return;
  }
  // currentPage = currentPage - 1;
  // currentPage -= 1;
  currentPage--;
  getUsers(currentPage);
});

document.getElementById("loadnextuser").addEventListener("click", function () {
  if (currentPage == totalPages) {
    return;
  }
  // currentPage = currentPage + 1;
  // currentPage += 1;
  currentPage++;
  getUsers(currentPage);
});

getUsers(currentPage);
  










