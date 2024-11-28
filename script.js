
const bigCats = [
    { species: "Big Cats", name: "Tiger", size: "10 ft", location: "Asia", img: "./image/tiger1.png" },
    { species: "Big Cats", name: "Lion", size: "8 ft", location: "Africa", img: "./image/lion.png" },
    { species: "Big Cats", name: "Leopard", size: "5 ft", location: "Africa and Asia", img: "./image/leopard.png" },
    { species: "Big Cats", name: "Cheetah", size: "5 ft", location: "Africa", img: "./image/cheetah.png" },
    { species: "Big Cats", name: "Caracal", size: "3 ft", location: "Africa", img: "./image/caracal.png" },
    { species: "Big Cats", name: "Jaguar", size: "7 ft", location: "South America", img: "./image/jagaur.png" },
  ];
  
  const dogs = [
    { species: "Dog", name: "Rottweiler", size: "2 ft", location: "Germany", img: "./image/rotwailer.png" },
    { species: "Dog", name: "Labrodar", size: "2 ft", location: "UK", img: "./image/labradar.png" },
    { species: "Dog", name: "German Shepherd", size: "2 ft", location: "Germany", img: "./image/german.png" },
    { species: "Dog", name: "Alabai", size: "4 ft", location: "Turkey", img: "./image/alabai.png" },
  ];
  
  const bigFish = [
    { species: "Big Fish", name: "Humpback Whale", size: "15 ft", location: "Atlantic Ocean", img: "./image/humpback.png" },
    { species: "Big Fish", name: "Killer Whale", size: "12 ft", location: "Atlantic Ocean", img: "./image/killer.png" },
    { species: "Big Fish", name: "Tiger Shark", size: "8 ft", location: "Ocean", img: "./image/tiger_shark.png" },
    { species: "Big Fish", name: "Hammerhead Shark", size: "8 ft", location: "Ocean", img: "./image/hammerhead.png" },
  ];

function renderTable(data, tableId, styles = {}) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = "";
  
    data.forEach((animal, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${animal.species}</td>
        <td contenteditable="true" class="${styles.nameClass || ''}" data-field="name">${animal.name}</td>
        <td contenteditable="true" data-field="size">${animal.size}</td>
        <td contenteditable="true" data-field="location">${animal.location}</td>
        <td>
          <img src="${animal.img}" alt="${animal.name}" class="editable-image" data-field="img" />
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="saveChanges(${index}, '${tableId}')">Save</button>
          <button class="btn btn-danger btn-sm" onclick="deleteAnimal(${index}, '${tableId}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    const addRow = document.createElement("tr");
    addRow.innerHTML = `
      <td>New</td>
      <td contenteditable="true" data-field="name" placeholder="Enter name"></td>
      <td contenteditable="true" data-field="size" placeholder="Enter size"></td>
      <td contenteditable="true" data-field="location" placeholder="Enter location"></td>
      <td><input type="file" onchange="previewImage(event, '${tableId}')" /></td>
      <td>
        <button class="btn btn-success btn-sm" onclick="saveNewAnimal('${tableId}')">Add</button>
      </td>
    `;
    tableBody.appendChild(addRow);
  }
  
  function previewImage(event, tableId) {
    const input = event.target;
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgPreview = input.closest("tr").querySelector("img");
        if (!imgPreview) {
          const imgElement = document.createElement("img");
          imgElement.src = e.target.result;
          imgElement.alt = "Preview";
          imgElement.classList.add("editable-image");
          input.closest("td").appendChild(imgElement);
        } else {
          imgPreview.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  function saveNewAnimal(tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const lastRow = tableBody.querySelector("tr:last-child");
  
    const fields = lastRow.querySelectorAll('[contenteditable="true"]');
    const imgField = lastRow.querySelector("img");
  
    const species = "Unknown";  
    const name = fields[0].innerText.trim();
    const size = fields[1].innerText.trim();
    const location = fields[2].innerText.trim();
    const img = imgField ? imgField.src : "./image/placeholder.png";
  
    if (name && size && location) {
      const newAnimal = { species, name, size, location, img };
      const data = getDataByTableId(tableId);
      data.push(newAnimal);
  
      renderTable(data, tableId, getStylesByTableId(tableId));
    } else {
      alert("Please fill in all fields.");
    }
  }

  function deleteAnimal(index, tableId) {
    const data = getDataByTableId(tableId); 
    if (confirm("Are you sure you want to delete this animal?")) {
      data.splice(index, 1); 
      renderTable(data, tableId, getStylesByTableId(tableId));
    }
  }
  
  function getDataByTableId(tableId) {
    if (tableId === "bigCatsTable") return bigCats;
    if (tableId === "dogsTable") return dogs;
    if (tableId === "bigFishTable") return bigFish;
    return [];
  }
  
  function getStylesByTableId(tableId) {
    if (tableId === "dogsTable") return { nameClass: "bold" };
    if (tableId === "bigFishTable") return { nameClass: "bold-italic-blue" };
    return {}; 
  }
  
  renderTable(bigCats, "bigCatsTable");
  renderTable(dogs, "dogsTable", getStylesByTableId("dogsTable"));
  renderTable(bigFish, "bigFishTable", getStylesByTableId("bigFishTable"));
  