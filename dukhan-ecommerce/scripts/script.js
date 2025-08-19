// Sample initial products
let products = [
    {
        id: 1,
        name: "Organic Apples",
        price: 4.99,
        category: "fruits",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Fresh organic apples from local farms. Sweet and crispy."
    },
    {
        id: 2,
        name: "Fresh Carrots",
        price: 2.49,
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1566842600175-97dca3c5ad8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Sweet and crunchy carrots, perfect for salads and cooking."
    },
    {
        id: 3,
        name: "Organic Milk",
        price: 5.99,
        category: "dairy",
        image: "https://images.unsplash.com/photo-1566772940193-9c3ae2938d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Fresh organic milk from grass-fed cows. Rich and creamy."
    },
    {
        id: 4,
        name: "Whole Grain Bread",
        price: 3.49,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1558961360-771cf6bc5f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Freshly baked whole grain bread with no preservatives."
    },
    {
        id: 5,
        name: "Orange Juice",
        price: 3.99,
        category: "beverages",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "100% pure orange juice with no added sugars."
    },
    {
        id: 6,
        name: "Bananas",
        price: 1.99,
        category: "fruits",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Fresh yellow bananas, perfect for smoothies or snacks."
    }
];

// Toggle between Customer and Admin views
function showCustomerView() {
    document.querySelector('.customer-view').style.display = 'block';
    document.querySelector('.dashboard').style.display = 'none';
    renderProducts();
}

function showAdminView() {
    document.querySelector('.customer-view').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'block';
    renderAdminProducts();
}

// Render products in customer view
function renderProducts(filter = 'all') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[onclick="filterProducts('${filter}')"]`).classList.add('active');
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-desc">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Render products in admin view
function renderAdminProducts() {
    const adminProductsContainer = document.getElementById('admin-products-container');
    adminProductsContainer.innerHTML = '';
    
    if (products.length === 0) {
        adminProductsContainer.innerHTML = '<p class="no-products">No products added yet.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-desc">${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <button class="add-to-cart" onclick="deleteProduct(${product.id})">Delete Product</button>
            </div>
        `;
        adminProductsContainer.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    renderProducts(category);
}

// Add new product
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;
    
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        category,
        image,
        description
    };
    
    products.push(newProduct);
    renderAdminProducts();
    
    // Reset form
    this.reset();
    
    alert('Product added successfully!');
});

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== id);
        renderAdminProducts();
    }
}

// Add to cart functionality
function addToCart(productId) {
    const count = document.querySelector('.cart-count');
    count.textContent = parseInt(count.textContent) + 1;
    
    // Find the button that was clicked
    const buttons = document.querySelectorAll('.add-to-cart');
    const button = Array.from(buttons).find(btn => btn.onclick && btn.onclick.toString().includes(productId));
    
    if (button) {
        // Animation
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
        }, 1500);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Default to customer view
    showCustomerView();
});