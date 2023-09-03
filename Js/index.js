$(document).ready(function () {
  
  $(".loading").fadeOut(1000)
  $("body").css("overflow","auto")

  
  
  let sideOpen=document.querySelector(".open")
  let sideClose=document.querySelector(".close")
  let sideBarWidth = $(".sideBarLeft").innerWidth()
    
    
    
    $(" .sideBar").css("left",-sideBarWidth)
    
    sideOpen.addEventListener("click",function(){
      sideOpen.classList.replace("d-block","d-none")
    sideClose.classList.replace("d-none","d-block")
    $(".sideBar ").animate({left:"0px"},500)
    for (let i = 0; i < 5; i++) {
      $(".text p").eq(i).animate({top: 0}, (i + 5) * 100)
  }
    
     
    
    })
    sideClose.addEventListener("click",function(){
      sideClose.classList.replace("d-block","d-none")
    sideOpen.classList.replace("d-none","d-block")
    $(".sideBar").animate({left:-sideBarWidth},500)
    $(".text p").animate({top: 300}, 500)

  })
  
  
  $(".open").click(function(){
      $(".open").css({"display":"none"},function(){
          $(".close").css({"display":"block"})
          for (let i = 0; i < 5; i++) {
            $(".text p").eq(i).animate({top: 0}, (i + 5) * 100)
        }
        })
      })
      




        //-------------------------------------
        document.querySelector(".category1").addEventListener("click", function() {
          $(".loading").fadeIn(300,function(){

            
          
            
            displayCategory();
            $("#input").css("display","none")
            
            $(".loading").fadeOut(300)
            sideClose.classList.replace("d-block","d-none")
            sideOpen.classList.replace("d-none","d-block")
            $(".sideBar").animate({left:-sideBarWidth},500)
        })
          
        });
  
        document.querySelector(".Area1").addEventListener("click", function() {
          $(".loading").fadeIn(200,function(){

            
            displayArea();
            $(".loading").fadeOut(300)
            $("#input").css("display","none")
            
            sideClose.classList.replace("d-block","d-none")
            sideOpen.classList.replace("d-none","d-block")
            $(".sideBar").animate({left:-sideBarWidth},500)
          })
          
       
        });

        document.querySelector(".Ingredient1").addEventListener("click", function() {
          $(".loading").fadeIn(100,function(){

            
            displayIngredient(Ing)
        $("#input").css("display","none")

          $(".loading").fadeOut(300)
          
          sideClose.classList.replace("d-block","d-none")
          sideOpen.classList.replace("d-none","d-block")
          $(".sideBar").animate({left:-sideBarWidth},500)
          
        })
       
        });
        document.querySelector(".search1").addEventListener("click", function() {
          displaySearchName();
          document.getElementById("input1").addEventListener("keyup", function(e) {
            getMeal(e.target.value);
          });

          
          document.getElementById("input2").addEventListener("keyup", function(e) {
            getSearchLetter(e.target.value);
          });
          sideClose.classList.replace("d-block","d-none")
          sideOpen.classList.replace("d-none","d-block")
          $(".sideBar").animate({left:-sideBarWidth},500)
        });
        //-------------------------------------
        
       
        
   

//============================= start Category=======================      
    
      let cat=[];
      let rowData=document.querySelector(".rowData")

      async  function getCategory(){
     

        let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let finalRlt = await apiResponse.json();
        cat=finalRlt.categories;
    

      }
      getCategory()
      
  

  function displayCategory( ){
    let rowData=document.querySelector(".rowData")

    let box="";
    for (let i = 0; i <cat.length; i++) {
   
      box+=`
      <div class="col-md-3 ">
        <div class="position-relative ms-5 innerCol  border bg-light  bg-opacity-50 border-white-50 rounded-4">
            <div class="  rounded-4">
                <img src="${cat[i].strCategoryThumb}"  class="w-100  rounded-4  " alt="">
                <div class="layer rounded-4 position-absolute ">
                     <h3 class=" ms-2  text-black text-center py-2 " category="${ cat[i].strCategory}">${ cat[i].strCategory}</h3>  
                     <p class="text-black text-center"category="${ cat[i].strCategory}">${cat[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                 </div>
             </div>
         </div>
      </div>
      ` 
    }
    rowData.innerHTML=box
  
    
    document.querySelectorAll(".layer").forEach(function(element) {
      element.addEventListener("click", function(e) {
        getCatDetails(e.target.getAttribute("category"));
      });
    });
   
  }
//============================= end Category=======================      

  //================= start CategoryDetails====================
  let m=[];

  async function getCatDetails(index) {

      let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${index}`);
      let finalRlt2=  await apiResponse2.json();
      m=finalRlt2.meals
      displayCategoryDetails(finalRlt2.meals)
  
  }
 


function displayCategoryDetails() {
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i < m.length; i++) {
    box += `
      <div class="col-md-3 rounded-4">
        <div class="position-relative ms-5 innerCol  rounded-4" >
          <div class="rounded-4">
            <img src="${m[i].strMealThumb}" class="w-100 rounded-4"  alt="">
          <div>
          <div class="layer rounded-4 position-absolute"mealId="${ m[i].idMeal}">
          <h3 class="ms-2 m text-black py-2" mealId="${ m[i].idMeal}">${m[i].strMeal}</h3>
          </div>
          </div>
          </div>
        </div>
      </div>
    `;
  }

  rowData.innerHTML = box;
  
  document.querySelectorAll(".layer").forEach(function(element) {
    element.addEventListener("click", function(e) {
      getDetails(e.target.getAttribute("mealId"));
    });
  });
  

}

  //=================  end CategoryDetails====================
  //================= start CategoryDetails====================
  async function getDetails(index) {
    let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
    let finalRlt2 = await apiResponse2.json();

    displayDetails(finalRlt2.meals)
  }
 


function displayDetails(mealDetails) {
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i < mealDetails.length; i++) {
     box = `
  <div class="col-md-4 ms-4">
  <img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
  <p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
  </div> 
  
  <div class="col-md-8 ms-4">
  <h2>Instructions</h2>
  <p >${mealDetails[i].strInstructions}</p>
      <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
      <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
      <p class=" fs-4 fw-bolder">Recipes :</p>
      <ul class="list-unstyled d-flex gap-2"> 
      <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient3}</li>
        <li class="alert alert-info p">${mealDetails[i].strIngredient4}</li>
        <li class="alert alert-info p">${mealDetails[i].strIngredient5}</li>
      </ul>
      <p >Tags: </p>
      <ul class="list-unstyled d-flex gap-5"> 
        <li class="alert alert-info p">${mealDetails[i].strTags}</li>

      </ul>
      
      <div class="d-flex gap-3">
      <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
      <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
      </div>
    </div> 
  `;
  }

  rowData.innerHTML = box;
}

  //=================  end CategoryDetails====================





//============================= start Home========================================
let meal = [];

async function getMeal(name='') {
  let rowData = document.querySelector(".rowData");

  let apiResponse1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  let finalRlt1 = await apiResponse1.json();
  meal = finalRlt1.meals;
  // displayMeal();
  if(meal!=null){
    displayMeal(meal)
  }
  else{
    rowData.innerHTML="Please enter a valid food name"; 
  }

}


getMeal();

function displayMeal() {
  let rowData = document.querySelector(".rowData");
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `
    <div class="col-md-3 ">
    <div class="position-relative innerCol ms-4">
    <div class="  rounded-4 ">
            <img src="${meal[i].strMealThumb}"  class="w-100  rounded-4" alt="">
            <div class="layer rounded-4 position-absolute">
              <h3 class="ms-2 m text-black py-2">${meal[i].strMeal}</h3>  
            </div>
          </div>
          </div>
          </div>
    `;
  }
  
  rowData.innerHTML = box;
  
  let mealDivs = document.querySelectorAll(".innerCol");
  mealDivs.forEach((div, index) => {
    div.addEventListener("click", () => {
      displayMealDetails(index);
    });
  });
}

async function displayMealDetails(index) {
  let mealId = meal[index].idMeal;
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  let finalRlt2 = await apiResponse2.json();
  let mealDetails = finalRlt2.meals[0];
  let rowData = document.querySelector(".rowData");
  
  let ingredients = '';

for (let i = 1; i <= 20; i++) {
    const ingredient = mealDetails[`strIngredient${i}`];
    const measure = mealDetails[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '' && ingredient !== null) {
        ingredients += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
    }
}

let tags = mealDetails.strTags && mealDetails.strTags.trim() !== '' ? `<li class="alert alert-info p">${mealDetails.strTags}</li>` : '';

const box = `
<div class="col-md-4 ms-4">
    <img src="${mealDetails.strMealThumb}" class="w-100 rounded-3" alt="">
    <p class="fs-3 fw-bolder">${mealDetails.strCategory}</p>
</div> 

<div class="col-md-8 ms-4">
    <h2>Instructions</h2>
    <p>${mealDetails.strInstructions}</p>
    <p class="fs-4 fw-bolder">Area: ${mealDetails.strArea}</p>
    <p class="fs-4 fw-bolder">Category: ${mealDetails.strCategory}</p>
    <p class="fs-4 fw-bolder">Recipes:</p>
    <ul class="list-unstyled d-flex gap-2 flex-wrap"> 
        ${ingredients}
    </ul>
    <p>Tags:</p>
    <ul class="list-unstyled d-flex gap-5"> 
        ${tags}
    </ul>
    <div class="d-flex gap-3">
        <a target="_blank" href="${mealDetails.strSource}" class="btn-danger btn">Source</a>
        <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-info">Youtube</a>
    </div>
</div> 
`;

rowData.innerHTML = box;
}


//============================= end Home========================================



//================================= start Area ========================================

let area=[];
async function getArea(){
  let apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
`)
let finalRlt=await apiResponse.json()
area=finalRlt.meals
  
}
getArea();

function displayArea(){
  let rowData = document.querySelector(".rowData");
  let box = "";
  
  for (let i = 0; i < area.length; i++) {
    box += `
    <div class="col-md-3 text-white text-center ms-4 ">
    
    <i class="fa-solid fa-house-laptop fa-4x" Area="${area[i].strArea} "></i>
    
    <h3  Area="${area[i].strArea} ">${area[i].strArea}</h3>
    
      </div>
    `;
    rowData.innerHTML=box;

}
document.querySelectorAll(".col-md-3").forEach(function(element) {
  element.addEventListener("click", function(e) {
    getAreaDetails(e.target.getAttribute("Area"));
  });
});
  

  
}


//================================= end Area ========================================

async function getAreaDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${index}
  `);
  let finalRlt2=  await apiResponse2.json();
  // m=finalRlt2.meals
  displayAreaDetails(finalRlt2.meals)
}



function displayAreaDetails(v) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < v.length; i++) {
  box += `
    <div class="col-md-3 rounded-4">
      <div class="position-relative innerCol rounded-4  ms-4"  >
        <div class="rounded-4">
          <img src="${v[i].strMealThumb}" class="w-100 rounded-4"  alt="">
          <div class="layer rounded-4 position-absolute"areaId="${v[i].idMeal}" >
            <h3 class="ms-2 m text-black py-2">${v[i].strMeal}</h3>
          </div>
        </div>
      </div>
    </div>
  `;
}


rowData.innerHTML = box;

document.querySelectorAll(".layer").forEach(function(element) {
  element.addEventListener("click", function(e) {
    areaDetails(e.target.getAttribute("areaId"));
    
  });
  });
    



}
async function areaDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
  let finalRlt2 = await apiResponse2.json();

  displayAD(finalRlt2.meals)
}



function displayAD(mealDetails) {
let rowData = document.querySelector(".rowData");
let box = "";
 
let ingredients = '';

for (let i = 1; i <= 20; i++) {
    const ingredient = mealDetails[`strIngredient${i}`];
    const measure = mealDetails[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '' && ingredient !== null) {
        ingredients += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
    }
}
let tags = mealDetails.strTags && mealDetails.strTags.trim() !== '' ? `<li class="alert alert-info p">${mealDetails.strTags}</li>` : '';

for (let i = 0; i < mealDetails.length; i++) {
   box = `
<div class="col-md-4 ms-4">
<img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
<p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
</div> 

<div class="col-md-8 ms-4">
<h2>Instructions</h2>
<p >${mealDetails[i].strInstructions}</p>
    <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
    <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
    <p class=" fs-4 fw-bolder">Recipes :</p>
    <ul class="list-unstyled d-flex gap-2"> 
    <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
    <li class="alert alert-info p">${mealDetails[i].strMeasure1}</li>
      <li class="alert alert-info p">${mealDetails[i].strMeasure2}</li>
      <li class="alert alert-info p">${mealDetails[i].strMeasure4}</li>
    </ul>
    <p >Tags: </p>
    <ul class="list-unstyled d-flex gap-5"> 
      <li class="alert alert-info p">${mealDetails[i].strTags}</li>

    </ul>
    
    <div class="d-flex gap-3">
    <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
    <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
    </div>
  </div> 
`;
}

rowData.innerHTML = box;
}




//X================================= start Ingredient ========================================

let  Ing=[];
async function getIngredient(){
  let apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list

`)
  let finalRlt=await apiResponse.json()
  Ing=finalRlt.meals

}
getIngredient();


function displayIngredient(){
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i <20; i++) {
    box += `
      <div class="col-md-3 text-white text-center  gy-1 gx-2 border border-secondary pt-3 ms-4">
      
            <i class="fa-solid fa-drumstick-bite fa-4x"IngD="${Ing[i].strIngredient}" ></i>

              <h3 class="  "IngD="${Ing[i].strIngredient}">${Ing[i].strIngredient }</h3>
              <p class="  " IngD="${Ing[i].strIngredient}">${Ing[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            
      </div>
    `;
    rowData.innerHTML=box;
}
document.querySelectorAll(".gy-1").forEach(function(element) {
  element.addEventListener("click", function(e) {
    getIngDetails(e.target.getAttribute("IngD"));
  });
});
}
//================================= end Ingredient ========================================
async function getIngDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}
  `);
  let finalRlt2=  await apiResponse2.json();
  displayIngDetails(finalRlt2.meals)
}



function displayIngDetails(v) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < v.length; i++) {
  box += `
    <div class="col-md-3 rounded-4">
      <div class="position-relative innerCol rounded-4 ms-4"  >
        <div class="rounded-4">
          <img src="${v[i].strMealThumb}" class="w-100 rounded-4"  alt="">
          <div class="layer rounded-4 position-absolute" >
            <h3 class="ms-2 m text-black py-2" ingDetails="${v[i].idMeal}">${v[i].strMeal}</h3>
          </div>
        </div>
      </div>
    </div>
  `;
}

rowData.innerHTML = box;
document.querySelectorAll(".layer").forEach(function(element) {
  element.addEventListener("click", function(e) {
    IngDetails(e.target.getAttribute("ingDetails"));
  });
});



}
async function IngDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
  let finalRlt2 = await apiResponse2.json();
(finalRlt2);
  displayIngD(finalRlt2.meals)
}



function displayIngD(mealDetails) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < mealDetails.length; i++) {
   box = `
<div class="col-md-4 ms-4">
<img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
<p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
</div> 

<div class="col-md-8 ms-4">
<h2>Instructions</h2>
<p >${mealDetails[i].strInstructions}</p>
    <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
    <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
    <p class=" fs-4 fw-bolder">Recipes :</p>
    <ul class="list-unstyled d-flex gap-2"> 
    <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
    <li class="alert alert-info p">${mealDetails[i].strMeasure1}</li>
      <li class="alert alert-info p">${mealDetails[i].strMeasure2}</li>
      <li class="alert alert-info p">${mealDetails[i].strMeasure4}</li>
    </ul>
    <p >Tags: </p>
    <ul class="list-unstyled d-flex gap-5"> 
      <li class="alert alert-info p">${mealDetails[i].strTags}</li>

    </ul>
    
    <div class="d-flex gap-3">
    <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
    <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
    </div>
  </div> 
`;
}

rowData.innerHTML = box;
}









//================================= start Contacts ======================================


  function displayContact1(){
    let rowData = document.querySelector(".rowData");
    box=`
   
    <div class="row   g-4  pt-4  mt-5 ms-3">
    <div class="col-md-6 ">

            <input type="text" name=""class="form-control" placeholder="Enter Your Name" id="Name">
            <p class="alert alertName  alert-danger w-100 d-none  mt-2">Special characters and numbers not allowed</p>
    </div>
    <div class="col-md-6  ">

            <input type="email" name=""class="form-control" placeholder="Enter Your Email" id="email">
            <p class="alert alertEmail  alert-danger w-100 d-none  mt-2">Email not valid *exemple@yyy.zzz </p>
    </div>
    <div class="col-md-6  ">

            <input type="tel" name=""class="form-control" placeholder="Enter Your Phone" id="phone" maxlength="11">
           <p class="alert alertPhone  alert-danger w-100 d-none mt-2">Enter valid Phone Number</p>

    </div>
    <div class="col-md-6  ">

            <input type="number" name=""class="form-control w-100" placeholder="Enter Your Age" id="Age">
      <p class="alert alertAge  alert-danger w-100 d-none mt-2">Enter valid age</p>
    </div>
    <div class="col-md-6  ">

            <input type="password" name=""class="form-control" placeholder="Enter Your Password" id="passWord">
            <p class="alert alertPass  alert-danger w-100 d-none  mt-2">Enter valid password *Minimum eight characters, at least one letter and one number:</p>
        </div>
    <div class="col-md-6  ">

            <input type="password" name=""class="form-control" placeholder="Repassword" id="Re-password">
            <p class="alert alertRePass  alert-danger d-none w-100  mt-2">Enter valid repassword</p>
    </div>
    <div class=" d-flex justify-content-center ">
        <button disabled class=" btn btn-danger mt-3" id="btn">Submit</button>
    </div>
    </div>
  
`
rowData.innerHTML=box;


let Name =document.getElementById('Name')
let passWord =document.getElementById('passWord')
let phone =document.getElementById('phone')
let rePassword =document.getElementById('Re-password')
let email =document.getElementById('email')
let Age =document.getElementById('Age')
let btn =document.getElementById('btn')

let nameRegex = /^[a-zA-Z ]+$/;
let emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let AgeRegex= /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let rePasswordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
let phoneRegex =/^(002)?01[0125][0-9]{8}$/;
let passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;




function isNameValid(){
  if(nameRegex.test(Name.value)){
return true
}else{
    return false

  }

}


function isEmailValid(){
  if(emailRegex.test(email.value)){
return true
  }else{
    return false
    
  }
  
}
function isPassValid(){
  if(passwordRegex.test(passWord.value)){
return true
  }else{
    return false

  }

}
function isRePassValid(){
  if(rePasswordRegex.test(rePassword.value)){
return true
  }else{
    return false

  }

}
function isPhoneValid(){
  if(phoneRegex.test(phone.value)){
return true
  }else{
    return false

  }

}
function isAgeValid(){
  if(AgeRegex.test(Age.value)){
return true
  }else{
    return false

  }

}
Name.addEventListener('keyup',function(){
  if(isNameValid()) {
    document.querySelector(".alertName").classList.add("d-none")
}else{
  document.querySelector(".alertName").classList.replace("d-none","d-block")
}


});
email.addEventListener('keyup',function(){
  if(isEmailValid()) {
    document.querySelector(".alertEmail").classList.add("d-none")
}else{
  document.querySelector(".alertEmail").classList.replace("d-none","d-block")
}


});
phone.addEventListener('keyup',function(){
  if(isPhoneValid()) {
    document.querySelector(".alertPhone").classList.add("d-none")
}else{
  document.querySelector(".alertPhone").classList.replace("d-none","d-block")
}


});
passWord.addEventListener('keyup',function(){
  if(isPassValid()) {
    document.querySelector(".alertPass").classList.add("d-none")
}else{
  document.querySelector(".alertPass").classList.replace("d-none","d-block")
}


});
rePassword.addEventListener('keyup',function(){
  if(isRePassValid()) {
    if (rePassword.value === passWord.value){

      document.querySelector(".alertRePass").classList.add("d-none")
    }
}else{
  document.querySelector(".alertRePass").classList.replace("d-none","d-block")
}


});
Age.addEventListener('keyup',function(){
  if(isAgeValid()) {
    document.querySelector(".alertAge").classList.add("d-none")
}else{
  document.querySelector(".alertAge ").classList.replace("d-none","d-block")
}


});









  Name.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }
})
  email.addEventListener('keyup',function(){
    if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
      btn.removeAttribute("disabled")
    }else{
      btn.disabled="true"
    }})
  passWord.addEventListener('keyup',function(){
    if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
      btn.removeAttribute("disabled")
    }else{
      btn.disabled="true"
    }})
 rePassword.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    if (rePassword.value === passWord.value){
    btn.removeAttribute("disabled")
  }}else{
    btn.disabled="true"
  }})
 phone.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }})
Age.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }})
  }





document.getElementById("ContactUs").addEventListener("click", function() {
    displayContact1();
    $("#input").css("display","none")

        sideClose.classList.replace("d-block", "d-none");
        sideOpen.classList.replace("d-none", "d-block");
        $(".sideBar").animate({ left: -sideBarWidth }, 500);
     
});





});
//================================= end Contacts ========================================


  
  
  
  
  
  
  //================================= start search ========================================
  

async function getSearchLetter(index='' ){
let apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${index}`)
let finalRlt=await apiResponse.json()
meal=finalRlt.meals
let rowData = document.getElementById("Body");

  
  if(meal!=null){
    displaySearchLL(meal)
  }
  
}

function displaySearchName(){
  let Body = document.getElementById("Body");
  let box = "";
  
    box = `

    <div class="container  p-5">
        <div class="row g-4  pt-2 mt-2 searchInput ms-3" id="input">
          <div class="col-md-6 d-flex gap-2">
         
              <input type="text" id="input1" class="form-control  text-white bg-black" placeholder="Search by name">
              </div>
                <div class="col-md-6 " >
              <input type="text" id="input2" class="form-control  text-white bg-black" maxlength="1" placeholder="Search by Letter">
          </div>
        </div>
        <div class="row g-4  pt-2 rowData ms-3 mt-2">
             
        </div>

    </div> 
    
    `;
    Body.innerHTML=box;

    
    
    }
    function displaySearchLL(meal) {
      let rowData = document.querySelector(".rowData");
      let box = "";
      for (let i = 0; i < meal.length; i++) {
        box += `
        <div class="col-md-3 ">
        <div class="position-relative innerCol">
        <div class="  rounded-4 ">
                <img src="${meal[i].strMealThumb}"  class="w-100  rounded-4" alt="">
                <div class="layer rounded-4 position-absolute">
                  <h3 class="ms-2 m text-black py-2">${meal[i].strMeal}</h3>  
                </div>
              </div>
              </div>
              </div>
        `;
      }
      
      rowData.innerHTML = box;
      
      let lk = document.querySelectorAll(".innerCol");
      lk.forEach((div,index) => {

        div.addEventListener("click", () => {
      
          displaySearchMeal(meal[index].idMeal);
          async function displaySearchMeal(id){
            let mealId = id;
            let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            let finalRlt2 = await apiResponse2.json();
            let mealDetails = finalRlt2.meals[0];
            let rowData = document.querySelector(".rowData");
            
            let ingredients = '';
          
          for (let i = 1; i <= 20; i++) {
              const ingredient = mealDetails[`strIngredient${i}`];
              const measure = mealDetails[`strMeasure${i}`];
          
              if (ingredient && ingredient.trim() !== '' && ingredient !== null) {
                  ingredients += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
              }
          }
          
          let tags = mealDetails.strTags && mealDetails.strTags.trim() !== '' ? `<li class="alert alert-info p">${mealDetails.strTags}</li>` : '';
          
          const box = `
          <div class="col-md-4">
              <img src="${mealDetails.strMealThumb}" class="w-100 rounded-3" alt="">
              <p class="fs-3 fw-bolder">${mealDetails.strCategory}</p>
          </div> 
          
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${mealDetails.strInstructions}</p>
              <p class="fs-4 fw-bolder">Area: ${mealDetails.strArea}</p>
              <p class="fs-4 fw-bolder">Category: ${mealDetails.strCategory}</p>
              <p class="fs-4 fw-bolder">Recipes:</p>
              <ul class="list-unstyled d-flex gap-2 flex-wrap"> 
                  ${ingredients}
              </ul>
              <p>Tags:</p>
              <ul class="list-unstyled d-flex gap-5"> 
                  ${tags}
              </ul>
              <div class="d-flex gap-3">
                  <a target="_blank" href="${mealDetails.strSource}" class="btn-danger btn">Source</a>
                  <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-info">Youtube</a>
              </div>
          </div> 
          `;
          
          rowData.innerHTML = box;
    
          }

        });
      });
      
    }
