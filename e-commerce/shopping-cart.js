const products = [
    {
        imgSrc: "pic/i7.png",
        imgAlt: "Intel I7 Processor",
        title: "Intel Core I7-12700K",
        price: 349.99,
        description: "12th Gen Intel Core i7 Processor, 12 Cores (8P+4E), up to 5.0 GHz",
        processor: "I7",
        availability: "stock-in"
    },
    {
        imgSrc: "pic/1TB_SSD.jpeg",
        imgAlt: "Samsung 1TB SSD",
        title: "Samsung 980 1TB SSD",
        price: 199.99,
        description: "PCIe 4.0 NVMe SSD, Read: 7000MB/s, Write: 5000MB/s",
        processor: null,
        availability: "stock-in",
        ram: null,
        ssd: "ssd-1TB"
    },
    {
        imgSrc: "pic/Ryzen 5.jpg",
        imgAlt: "AMD Ryzen 5 Processor",
        title: "AMD Ryzen 5 5600X",
        price: 299.00,
        description: "8-Core AMD Ryzen 7 Desktop Processor, 16 Threads",
        processor: "I5",
        availability: "pre-order"
    },
    {
        imgSrc: "pic/32GB_Ram.jpg",
        imgAlt: "Corsair 32GB Ram",
        title: "Corsair 32GB DDR4 Ram",
        price: 39.00,
        description: "RGB DDR4 16GB 3200MHz, CL-16, 2x16GB Gaming Kit",
        processor: null,
        availability: "stock-in",
        ram: "ram-32GB"
    },
    {
        imgSrc: "pic/asus-nvidia-geforce-rtx-3060-v2-oc-edition-12gb-11642318330.png",
        imgAlt: "Asus RTX 3060",
        title: "NVIDIA RTX 3060 Ti",
        price: 399.99,
        description: "8GB GDDR6, 4864 CUDA Cores, Boost Clock 1665 MHz",
        availability: "stock-out"
    },
    {
        imgSrc: "pic/i7.png",
        imgAlt: "Intel I7 Processor",
        title: "Intel Core I7-12700K",
        price: 349.99,
        description: "12th Gen Intel Core i7 Processor, 12 Cores (8P+4E), up to 5.0 GHz",
        processor: "I7",
        availability: "stock-out"
    },
    {
        imgSrc: "pic/1TB_SSD.jpeg",
        imgAlt: "Samsung 1TB SSD",
        title: "Samsung 980 1TB SSD",
        price: 199.99,
        description: "PCIe 4.0 NVMe SSD, Read: 7000MB/s, Write: 5000MB/s",
        processor: null,
        availability: "stock-in",
        ram: null,
        ssd: "ssd-1TB"
    },
    {
        imgSrc: "pic/Ryzen 5.jpg",
        imgAlt: "AMD Ryzen 5 Processor",
        title: "AMD Ryzen 5 5600X",
        price: 299.00,
        description: "8-Core AMD Ryzen 7 Desktop Processor, 16 Threads",
        processor: "I5",
        availability: "stock-in"
    },
    {
        imgSrc: "pic/32GB_Ram.jpg",
        imgAlt: "Corsair 32GB Ram",
        title: "Corsair 32GB DDR4 Ram",
        price: 39.00,
        description: "RGB DDR4 16GB 3200MHz, CL-16, 2x16GB Gaming Kit",
        processor: null,
        availability: "stock-in",
        ram: "ram-32GB"
    },
    {
        imgSrc: "pic/asus-nvidia-geforce-rtx-3060-v2-oc-edition-12gb-11642318330.png",
        imgAlt: "Asus RTX 3060",
        title: "NVIDIA RTX 3060 Ti",
        price: 399.99,
        description: "8GB GDDR6, 4864 CUDA Cores, Boost Clock 1665 MHz",
        processor: null,
        availability: "stock-out",
        ram: null,
        ssd: null
    }
];

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imgSrc}" alt="${product.imgAlt}" />
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" data-title="${product.title}">Add to Cart</button>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('drop-down');
    const addCart = document.getElementById('add-cart');
    const cart = document.getElementById('cart');
    const close = document.getElementById('close');
    const container = document.getElementById('product-container');


    const originalProducts = [...products];
    const cartItems = new Map(); // Map to store product title and quantity

    function renderProducts(productsToRender) {
        container.innerHTML = '';
        productsToRender.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }
    //practice this line
    function renderCart() {
        const cartList = cart.querySelector('.cart-list') || document.createElement('div');
        cartList.className = 'cart-list';
        cartList.innerHTML = '';
        cartItems.forEach((quantity, title) => {
            cartList.innerHTML += `
                <div class="list">
                    <p>${title}<span class="space-01"> X </span><span class="space-02">${quantity}</span></p>
                </div>
            `;
        });
        if (!cart.contains(cartList)) {
            const sum = cart.querySelector('.sum');
            cart.insertBefore(cartList, sum);
        }
    }

    renderProducts(products);

    dropdown.addEventListener('change', function() {
        let sortedProducts = [...products];
        switch (this.value) {
            case 'high-to-low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'low-to-high':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'discount':
                sortedProducts = sortedProducts.filter(p => p.price < 200).sort((a, b) => a.price - b.price);
                break;
            case 'customize':
            default:
                sortedProducts = [...originalProducts];
                break;
        }
        renderProducts(sortedProducts);
    });

    const checkboxes = document.querySelectorAll('.tag input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        const selectedAvailability = Array.from(document.querySelectorAll('#availability input:checked'))
            .map(checkbox => checkbox.value);
        const selectedProcessors = Array.from(document.querySelectorAll('#processor input:checked'))
            .map(checkbox => checkbox.value);
        const selectedRamSizes = Array.from(document.querySelectorAll('#ram input:checked'))
            .map(checkbox => checkbox.value);
        const selectedSsdSizes = Array.from(document.querySelectorAll('#ssd input:checked'))
            .map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product => {
            const matchesAvailability = !selectedAvailability.length || 
                (product.availability && selectedAvailability.includes(product.availability));
            const matchesProcessor = !selectedProcessors.length || 
                (product.processor && selectedProcessors.includes(product.processor));
            const matchesRam = !selectedRamSizes.length || 
                (product.ram && selectedRamSizes.includes(product.ram));
            const matchesSsd = !selectedSsdSizes.length || 
                (product.ssd && selectedSsdSizes.includes(product.ssd));

            return matchesAvailability && matchesProcessor && matchesRam && matchesSsd;
        });

        renderProducts(filteredProducts);
    }

    const openCart = () => {
        cart.style.display = 'block';
        setTimeout(() => {
            cart.classList.add('open');
            document.body.classList.add('cart-open');
        }, 0);
    };

    const closeCart = () => {
        cart.classList.remove('open');
        document.body.classList.remove('cart-open');
        setTimeout(() => {
            cart.style.display = 'none';
        }, 300);
    };

    addCart.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const title = e.target.dataset.title;
            cartItems.set(title, (cartItems.get(title) || 0) + 1);
            renderCart();
            openCart();
        }
    });
});
