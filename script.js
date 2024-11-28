// Sample data for Big Cats, Dogs, and Big Fish
const bigCats = [
    { species: "Big Cats", name: "Tiger", size: "10 ft", location: "Asia", img: "https://via.placeholder.com/100" },
    { species: "Big Cats", name: "Lion", size: "8 ft", location: "Africa", img: "https://via.placeholder.com/100" },
    { species: "Big Cats", name: "Jaguar", size: "7 ft", location: "South America", img: "https://via.placeholder.com/100" },
  ];
  
  const dogs = [
    { species: "Dog", name: "Rottweiler", size: "2 ft", location: "Germany", img: "https://via.placeholder.com/100" },
    { species: "Dog", name: "Golden Retriever", size: "2.5 ft", location: "UK", img: "https://via.placeholder.com/100" },
    { species: "Dog", name: "German Shepherd", size: "3 ft", location: "Germany", img: "https://via.placeholder.com/100" },
  ];
  
  const bigFish = [
    { species: "Big Fish", name: "Humpback Whale", size: "15 ft", location: "Atlantic Ocean", img: "https://via.placeholder.com/100" },
    { species: "Big Fish", name: "Great White Shark", size: "20 ft", location: "Pacific Ocean", img: "https://via.placeholder.com/100" },
    { species: "Big Fish", name: "Blue Whale", size: "30 ft", location: "Indian Ocean", img: "https://via.placeholder.com/100" },
  ];
  
  // Function to render a table dynamically
  function renderTable(data, tableId, styles = {}) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ""; // Clear existing rows
    data.forEach((animal, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${animal.species}</td>
        <td class="${styles.nameClass || ''}">${animal.name}</td>
        <td>${animal.size}</td>
        <td>${animal.location}</td>
        <td>
          <img src="${animal.img}" alt="${animal.name}" />
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editAnimal(${index}, '${tableId}', '${data}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteAnimal(${index}, '${tableId}', '${data}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to sort data
  function sortTable(data, key, tableId) {
    data.sort((a, b) => a[key].localeCompare(b[key]));
    renderTable(data, tableId);
  }
  
  // Function to add a new animal
  function addAnimal(data, tableId) {
    const species = prompt("Enter species:");
    const name = prompt("Enter name:");
    const size = prompt("Enter size (e.g., '10 ft'):");
    const location = prompt("Enter location:");
    const img = prompt("Enter image URL:", "https://via.placeholder.com/100");
    if (species && name && size && location && img) {
      data.push({ species, name, size, location, img });
      renderTable(data, tableId);
    } else {
      alert("All fields are required.");
    }
  }
  
  // Function to edit an animal
  function editAnimal(index, tableId, data) {
    const animal = data[index];
    const newName = prompt("Edit name:", animal.name);
    const newSize = prompt("Edit size:", animal.size);
    const newLocation = prompt("Edit location:", animal.location);
    const newImg = prompt("Edit image URL:", animal.img);
    if (newName && newSize && newLocation && newImg) {
      data[index] = { ...animal, name: newName, size: newSize, location: newLocation, img: newImg };
      renderTable(data, tableId);
    } else {
      alert("All fields are required.");
    }
  }
  
  // Function to delete an animal
  function deleteAnimal(index, tableId, data) {
    if (confirm("Are you sure you want to delete this animal?")) {
      data.splice(index, 1);
      renderTable(data, tableId);
    }
  }
  
  // Initial rendering of tables
  renderTable(bigCats, "bigCatsTable");
  renderTable(dogs, "dogsTable", { nameClass: "bold" });
  renderTable(bigFish, "bigFishTable", { nameClass: "bold-italic-blue" });
  