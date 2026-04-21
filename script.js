// Zayeliac Finds - Product Directory

let products = [];
let currentCategory = 'all';
let searchQuery = '';
let nicheOnly = false;

// Load products
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        renderProducts();
        updateLastUpdated();
    } catch (error) {
        console.error('Failed to load products:', error);
        // Fallback: try to use inline data if fetch fails (for local file:// testing)
        document.getElementById('products-grid').innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                <p>Unable to load products. Please serve this page from a web server.</p>
            </div>
        `;
    }
}

// Render products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    // Filter products
    let filtered = products.filter(product => {
        // Category filter
        if (currentCategory === 'niche') {
            if (!product.niche) return false;
        } else if (currentCategory !== 'all') {
            if (product.category !== currentCategory) return false;
        }
        
        // Niche only checkbox
        if (nicheOnly && !product.niche) return false;
        
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchable = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
            if (!searchable.includes(query)) return false;
        }
        
        return true;
    });
    
    // Update count
    resultsCount.textContent = filtered.length;
    
    // Show/hide no results
    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    // Sort: niche items first, then alphabetically
    filtered.sort((a, b) => {
        if (a.niche && !b.niche) return -1;
        if (!a.niche && b.niche) return 1;
        return a.name.localeCompare(b.name);
    });
    
    // Render cards
    grid.innerHTML = filtered.map(product => `
        <article class="product-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div class="relative">
                <img 
                    src="${product.image}" 
                    alt="${product.name} by ${product.brand}"
                    class="w-full h-40 object-cover"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&h=200&fit=crop'"
                >
                ${product.niche ? `
                    <span class="niche-badge absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded-full">
                        ✨ Niche Find
                    </span>
                ` : ''}
            </div>
            <div class="p-4">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <h3 class="font-semibold text-gray-800">${product.name}</h3>
                    <span class="text-xs px-2 py-1 bg-wheat-100 text-wheat-700 rounded-full whitespace-nowrap">${product.category}</span>
                </div>
                <p class="text-sm text-sage-600 font-medium mb-2">${product.brand}</p>
                <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                <div class="flex flex-wrap gap-1 mb-3">
                    ${product.stockists.map(s => `
                        <span class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">${s}</span>
                    `).join('')}
                </div>
                <a 
                    href="${product.url}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800 font-medium"
                >
                    Visit brand
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            </div>
        </article>
    `).join('');
}

// Update last updated date
function updateLastUpdated() {
    const date = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('last-updated').textContent = date;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Search
    const searchInput = document.getElementById('search');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value.trim();
            renderProducts();
        }, 200);
    });
    
    // Category filters
    document.getElementById('filters').addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.dataset.category;
        renderProducts();
    });
    
    // Niche only toggle
    document.getElementById('niche-only').addEventListener('change', (e) => {
        nicheOnly = e.target.checked;
        renderProducts();
    });
});
