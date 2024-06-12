document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#recipes-table tbody');
    const form = document.querySelector('#new-recipe-form');
    let max_id = 0;

    function fetchRecipes() {
        fetch('/api/recipes')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(recipe => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${recipe.id}</td>
                        <td>${recipe.title}</td>
                        <td>${recipe.ingredients.join(', ')}</td>
                        <td>${recipe.instructions}</td>
                        <td class="cooking-time-cell">${recipe.cookingTime}</td>
                        <td>
                            <button onclick="editRecipe('${recipe._id}')">Update</button>
                            <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                    max_id = Math.max(max_id, parseInt(recipe.id)); 
                    console.log(max_id)
                });
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const newRecipe = {
            id: max_id + 1,
            title: document.querySelector('#new-title').value,
            ingredients: document.querySelector('#new-ingredients').value.split(','),
            instructions: document.querySelector('#new-instructions').value,
            cookingTime: parseInt(document.querySelector('#new-cookingTime').value),
        };

        fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        })
        .then(response => response.json())
        .then(data => {
            fetchRecipes(); 
            form.reset(); 
        })
        .catch(error => console.error('Error adding recipe:', error));
    });

    window.editRecipe = function(id) {
        const recipeRow = document.querySelector(`button[onclick="editRecipe('${id}')"]`).parentNode.parentNode;
        const title = prompt('Enter new title:', recipeRow.children[1].innerText);
        const ingredients = prompt('Enter new ingredients:', recipeRow.children[2].innerText);
        const instructions = prompt('Enter new instructions:', recipeRow.children[3].innerText);
        const cookingTime = prompt('Enter new cooking time:', recipeRow.children[4].innerText);

        const updatedRecipe = {
            title,
            ingredients: ingredients.split(','),
            instructions,
            cookingTime: parseInt(cookingTime),
        };

        fetch(`/api/recipes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRecipe),
        })
        .then(response => response.json())
        .then(data => {
            fetchRecipes();
        })
        .catch(error => console.error('Error updating recipe:', error));
    };

    window.deleteRecipe = function(id) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            fetch(`/api/recipes/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                fetchRecipes(); 
            })
            .catch(error => console.error('Error deleting recipe:', error));
        }
    };

    fetchRecipes();
});
