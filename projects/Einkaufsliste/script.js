document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');
    const quantityInput = document.getElementById('quantity-input');
    const unitInput = document.getElementById('unit-input');
    const priceInput = document.getElementById('price-input');
    const categoryInput = document.getElementById('category-input');
    const shoppingList = document.getElementById('shopping-list');
    const totalElement = document.getElementById('total');
    const budgetInput = document.getElementById('budget-input');
    const budgetRemaining = document.getElementById('budget-remaining');
    const saveTemplateBtn = document.getElementById('save-template');
    const loadTemplateBtn = document.getElementById('load-template');
    const exportListBtn = document.getElementById('export-list');
    const importListInput = document.getElementById('import-list');

    let items = [];
    let total = 0;
    let budget = 0;

    // Laden der gespeicherten Elemente beim Start
    loadItems();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(itemInput.value, quantityInput.value, unitInput.value, priceInput.value, categoryInput.value);
        form.reset();
        quantityInput.value = '1';
    });

    function addItem(name, quantity, unit, price, category) {
        const item = { name, quantity, unit, price, category };
        items.push(item);
        renderItem(item);
        saveItems();
        updateTotal();
    }

    function renderItem(item) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.quantity} ${item.unit} ${item.name} - ${item.price}€ pro ${item.unit} (${item.category})</span>
            <span class="item-total">${(item.quantity * item.price).toFixed(2)}€</span>
            <div>
                <button class="edit-btn">Bearbeiten</button>
                <button class="delete-btn">Löschen</button>
            </div>
        `;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            items = items.filter(i => i !== item);
            saveItems();
            updateTotal();
            li.remove();
        });

        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newQuantity = prompt('Neue Menge eingeben:', item.quantity);
            const newPrice = prompt('Neuen Preis eingeben:', item.price);
            if (newQuantity !== null && newPrice !== null) {
                item.quantity = newQuantity;
                item.price = newPrice;
                saveItems();
                renderItem(item);
                updateTotal();
                li.remove();
            }
        });

        shoppingList.appendChild(li);
    }

    function saveItems() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    function loadItems() {
        const savedItems = localStorage.getItem('shoppingList');
        if (savedItems) {
            items = JSON.parse(savedItems);
            items.forEach(item => renderItem(item));
            updateTotal();
        }
    }
    function updateTotal() {
        total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        totalElement.textContent = `Gesamtsumme: ${total.toFixed(2)} €`;
        updateBudget();
    }

    budgetInput.addEventListener('change', () => {
        budget = parseFloat(budgetInput.value);
        updateBudget();
    });

    function updateBudget() {
        if (budget > 0) {
            const remaining = budget - total;
            budgetRemaining.textContent = `Verbleibend: ${remaining.toFixed(2)} €`;
            budgetRemaining.style.color = remaining >= 0 ? 'green' : 'red';
        } else {
            budgetRemaining.textContent = '';
        }
    }

    // Sortierung
    document.getElementById('sort-name').addEventListener('click', () => sortItems('name'));
    document.getElementById('sort-price').addEventListener('click', () => sortItems('price'));
    document.getElementById('sort-category').addEventListener('click', () => sortItems('category'));

    function sortItems(criterion) {
        items.sort((a, b) => a[criterion].localeCompare(b[criterion]));
        refreshList();
    }

    function refreshList() {
        shoppingList.innerHTML = '';
        items.forEach(item => renderItem(item));
    }

    // Vorlagen
    saveTemplateBtn.addEventListener('click', () => {
        const templateName = prompt('Namen für die Vorlage eingeben:');
        if (templateName) {
            localStorage.setItem(`template_${templateName}`, JSON.stringify(items));
        }
    });

    loadTemplateBtn.addEventListener('click', () => {
        const templateName = prompt('Namen der zu ladenden Vorlage eingeben:');
        if (templateName) {
            const savedTemplate = localStorage.getItem(`template_${templateName}`);
            if (savedTemplate) {
                items = JSON.parse(savedTemplate);
                refreshList();
                updateTotal();
            } else {
                alert('Vorlage nicht gefunden.');
            }
        }
    });

    // Export/Import
    exportListBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "shopping_list.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    importListInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    items = JSON.parse(e.target.result);
                    refreshList();
                    updateTotal();
                    saveItems();
                } catch (error) {
                    alert('Fehler beim Importieren der Datei.');
                }
            };
            reader.readAsText(file);
        }
    });
});


