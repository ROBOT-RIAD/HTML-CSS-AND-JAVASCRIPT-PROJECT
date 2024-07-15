

const Load_data =(goloval)=>{
    const search_text =document.getElementById("search-box").value;
    const s=search_text[0];
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search_text?s:goloval}`)
    .then((res)=>res.json())
    .then((data)=>display_data(data.meals));
};


const display_data=(data)=>{
   document.getElementById("total-meals").innerText=data.length;
   const mealesContainer =document.getElementById("Meals-container");
   data.forEach((meal)=>{
    console.log(meal);
    const card=document.createElement("div");
    card.classList.add("box");
    card.innerHTML=`
      <img class="box-img" src="${meal.strMealThumb}" alt="picture">
      <h2>${meal.strMeal}</h2>
      <p>${meal.strInstructions.slice(0,50)}</p>
      <button onclick="displayModal('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      `;
      mealesContainer.appendChild(card);
   });
};

const displayModal=async(id)=>{
   try{

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data =await response.json();
      console.log(data.meals[0]);
   }
   catch{
      err=>{
         console.log(err);
      }
   }  
}

Load_data("a");