/* app.js */
const API_BASE_URL = "http://localhost:8080/inventory";

const inventoryTable = document.getElementById("inventoryTable");
const addItemForm = document.getElementById("addItemForm");

// Fetch inventory items
async function fetchInventory() {
    const response = await fetch(API_BASE_URL);
    const items = await response.json();
    inventoryTable.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td><button onclick="deleteItem('${item.id}')">Delete</button></td>
        `;
        inventoryTable.appendChild(row);
    });
}

// Add a new inventory item
addItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newItem = {
        id: Date.now().toString(),
        name: document.getElementById("itemName").value,
        quantity: document.getElementById("itemQuantity").value,
        price: document.getElementById("itemPrice").value
    };
    await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    });
    addItemForm.reset();
    fetchInventory();
});

// Delete an inventory item
async function deleteItem(id) {
    await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE"
    });
    fetchInventory();
}

// Initial fetch
fetchInventory();