const loadFood = () => {
    const input = document.getElementById("food-input")
    const inputValue = input.value
    input.value = ""
    if (inputValue.length == 0) {
        alert("Please Give input")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
    }
    document.getElementById("show-food").innerHTML = ""
    document.getElementById("food-info").innerHTML = ""

}
document.getElementById("search-btn").addEventListener("click", loadFood)
document.getElementById("food-input").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("search-btn").click()
    }
})

const displayFood = (items) => {
    const foodContainer = document.getElementById("show-food")
    for (const item of items) {
        const div = document.createElement("div")
        div.classList.add("col-6", "col-md-4", "col-lg-3")
        div.innerHTML = `
    <div class="card h-100 p-2 border">
        <img src=${item.strMealThumb} class="img-fluid rounded">
        <div class="card-body">
            <h5 class="my-2 text-dark fw-bold">${item.strMeal}</h5>
            <h5>Category: <span class="fw-light">${item.strCategory}</span></h5>
            <h5>Area: <span class="fw-light">${item.strArea}</span></h5>
        </div>
        <a onclick="foodDetails('${item.idMeal}')" href="#" class="btn btn-success mt-3">Show Recipe</a>
    </div>`
        foodContainer.appendChild(div)
    }
}
const foodDetails = (item) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
        .then(res => res.json())
        .then(data => showFoodDetails(data.meals[0]))
    document.getElementById("food-info").innerHTML = ""
}
const showFoodDetails = (item) => {
    const foodInfoShow = document.getElementById("food-info")
    const div = document.createElement("div")
    div.classList.add("mb-3")
    div.innerHTML = `
    <div class="card h-100 p-2 border">
        <div class="card-header border">
            <h2> ${item.strMeal}</h2>
        </div>
        <div class="card-body align-items-center">
            <div>
                <h5>Category: <span class="fw-light">${item.strCategory}</span></h5>
                <h5>Area: <span class="fw-light">${item.strArea}</span></h5>
                <div class="d-md-flex justify-content-between mt-5 px-5">
                    <img class="me-5" src=${item.strMealThumb} style="height:250px">
                    <div class="">
                        <h4 class="text-start">INGREDIENTS</h4>
                        <h5 class="text-start fw-light">${item.strMeasure1} ${item.strIngredient1}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure2} ${item.strIngredient2}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure3} ${item.strIngredient3}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure4} ${item.strIngredient4}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure5} ${item.strIngredient5}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure6} ${item.strIngredient6}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure7} ${item.strIngredient7}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure8} ${item.strIngredient8}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure9} ${item.strIngredient9}</h5>
                        <h5 class="text-start fw-light">${item.strMeasure10} ${item.strIngredient10}</h5>
                    </div>
                </div>
                <hr>
                <p class="card-text text-start">${item.strInstructions}</p>
            </div>
        </div>
    </div>
    `
    foodInfoShow.appendChild(div)
}