//

document.getElementById('error').style.display ='none'
const searchFood = () =>{
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value ='';

    document.getElementById('error').style.display ='none'
  
    if(searchText == ''){
        document.getElementById('error').style.display ='block'
    }
    else{
        
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(resp => resp.json())
    .then(data =>displaySearchResult(data.meals))

    }



    // Input field থেকে কোন কিছু নিতে চাইলে (.value) ব্যবহার করা হয়. আর  html tag থেকে কোন কিছু নিতে চাইলে (.innerText) ব্যবহার করা হয়.
    //console.log(searchText);

}


document.getElementById('error-2').style.display ='none'

const displaySearchResult =(meals)=>{

    if(meals == null){
        document.getElementById('error-2').style.display ='block'
    }
    //console.log(meals);
    const searchResult= document.getElementById('search-result');
    searchResult.innerHTML='';
    //searchResult.textContent='';(system-2)

    meals.forEach(meal => {
        // console.log(meal);
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
          <img src="${meal?.strMealThumb}" class="card-img-top w" alt="...">

          <div class="card-body">

             <h5 class="card-title">${meal?.strMeal
             }</h5>
 
             <p class="card-text">${meal?.strInstructions.slice(0,100)}</p>
 
             <a class="btn btn-primary" target="_blank" href="${meal?.strYoutube
             }">Meal Videos </a>
 
             

          </div>
        </div>
        `
        searchResult.appendChild(div)
    })
}


const loadMealDetail=(mealId)=>{
    // console.log(mealId);

    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(resp => resp.json())
    .then(data =>displayMealDetails(data.meals[0]))
}

const displayMealDetails =(meal)=>{
    
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML=`
    <img src="${meal?.strMealThumb}" class="card-img-top w" alt="...">

          <div class="card-body">

             <h5 class="card-title">${meal?.strMeal
             }</h5>
             <h5 class="card-title">${meal?.idMeal
             }</h5>
 
             <p class="card-text">${meal?.strCategory
             }</p>

             <p class="card-text">${meal?.strTags}
             </p>

             <p class="card-text">${meal?.strInstructions.slice(0,150)}</p>
 
          </div>
    `
    mealDetails.appendChild(div)

}