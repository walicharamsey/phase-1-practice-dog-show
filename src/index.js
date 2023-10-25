document.addEventListener('DOMContentLoaded', () => {

})
document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const dogTable = document.getElementById('dog-table');
  
    // Function to fetch and display dogs
    function fetchAndDisplayDogs() {
      fetch('http://localhost:3000/dogs')
        .then((response) => response.json())
        .then((dogs) => {
          dogTable.innerHTML = ''; // Clear the dog table
  
          dogs.forEach((dog) => {
            const dogRow = document.createElement('tr');
            dogRow.innerHTML = `
              <td>${dog.name}</td>
              <td>${dog.breed}</td>
              <td>${dog.sex}</td>
              <td><button data-id="${dog.id}">Edit</button></td>
            `;
            dogRow.querySelector('button').addEventListener('click', () => populateDogForm(dog));
            dogTable.appendChild(dogRow);
          });
        });
    }
  
    // Function to populate the form for editing a dog
    function populateDogForm(dog) {
      const nameInput = document.getElementById('name');
      const breedInput = document.getElementById('breed');
      const sexInput = document.getElementById('sex');
      const submitButton = document.querySelector('#dog-form button');
  
      nameInput.value = dog.name;
      breedInput.value = dog.breed;
      sexInput.value = dog.sex;
  
      submitButton.dataset.id = dog.id;
    }
  
    // Event listener for the dog form submission
    dogForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const breed = document.getElementById('breed').value;
      const sex = document.getElementById('sex').value;
      const dogId = event.target.querySelector('button').dataset.id;
  
      // Make a PATCH request to update the dog information
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, breed, sex }),
      })
        .then(() => fetchAndDisplayDogs()); // Re-fetch and re-render the dog table
    });
  
    // Initial fetch when the page loads
    fetchAndDisplayDogs();
  });
  