document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initChart();
    // Initialize form dropdowns
    toggleCategories('digital');
});

// ===== Currency Switching =====
const balances = {
    USD: { main: '$12,450.00', book: '$3,200.00' },
    NGN: { main: '₦19,297,500.00', book: '₦4,960,000.00' }
};

function switchCurrency(currency) {
    const mainEl = document.getElementById('mainBalance');
    const bookEl = document.getElementById('bookBalance');
    mainEl.textContent = balances[currency].main;
    bookEl.textContent = balances[currency].book;
}

// ===== Custom Currency Dropdown =====
function toggleCurrencyDropdown() {
    const wrapper = document.querySelector('.currency-select-wrapper');
    wrapper.classList.toggle('open');
}

function selectCurrency(currency) {
    const selectedEl = document.getElementById('selectedCurrency');
    selectedEl.textContent = currency;
    const wrapper = document.querySelector('.currency-select-wrapper');
    wrapper.classList.remove('open');
    switchCurrency(currency);
}

// Close currency dropdown when clicking outside
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.currency-select-wrapper');
    if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
    }
});

// ===== Custom Dropdowns =====
function toggleCustomDropdown(id) {
    const wrapper = document.querySelector(`[data-id="${id}"]`);
    wrapper.classList.toggle('open');
}

function selectCustomOption(id, value, label) {
    const selectedEl = document.getElementById(`selected-${id}`);
    selectedEl.textContent = label;
    const wrapper = document.querySelector(`[data-id="${id}"]`);
    wrapper.classList.remove('open');
    if (id === 'deliveryType') {
        toggleCategories(value);
    }
}

// Close custom dropdowns when clicking outside
document.addEventListener('click', (e) => {
    const wrappers = document.querySelectorAll('.custom-select-wrapper');
    wrappers.forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});

// ===== Profile Dropup =====
function toggleProfileDropup() {
    const dropup = document.getElementById('profileDropup');
    const chevron = document.querySelector('.profile-chevron');
    dropup.classList.toggle('open');
    chevron.classList.toggle('open');
}

// Close dropup when clicking outside
document.addEventListener('click', (e) => {
    const dropup = document.getElementById('profileDropup');
    const trigger = document.querySelector('.profile-trigger');
    if (!trigger.contains(e.target) && !dropup.contains(e.target)) {
        dropup.classList.remove('open');
        document.querySelector('.profile-chevron')?.classList.remove('open');
    }
});

// ===== Notification Dropdown =====
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('open');
}

// Close notification dropdown when clicking outside
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.notification-wrapper');
    const dropdown = document.getElementById('notificationDropdown');
    if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// ===== Create Product Slide Panel =====
function openCreateProduct() {
    document.getElementById('slideOverlay').classList.add('open');
    document.getElementById('slidePanel').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCreateProduct() {
    document.getElementById('slideOverlay').classList.remove('open');
    document.getElementById('slidePanel').classList.remove('open');
    document.body.style.overflow = '';
}

// ===== Digital/Physical Category Toggle =====
function toggleCategories(deliveryType) {
    const digitalWrapper = document.querySelector('[data-id="digitalCategory"]');
    const physicalWrapper = document.querySelector('[data-id="physicalCategory"]');

    if (deliveryType === 'digital') {
        digitalWrapper.classList.remove('disabled');
        physicalWrapper.classList.add('disabled');
    } else {
        digitalWrapper.classList.add('disabled');
        physicalWrapper.classList.remove('disabled');
    }
}

// ===== Product Media Upload Preview =====
function handleMediaUpload(input) {
    const preview = document.getElementById('mediaPreview');
    preview.innerHTML = '';

    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// ===== Create Store Modal =====
let storeCount = 0;

function openCreateStoreModal(e) {
    if (e) e.preventDefault();
    // Close profile dropup
    document.getElementById('profileDropup').classList.remove('open');
    document.querySelector('.profile-chevron')?.classList.remove('open');

    if (storeCount >= 2) {
        document.getElementById('payStoreModal').classList.add('open');
    } else {
        document.getElementById('createStoreModal').classList.add('open');
    }
    document.body.style.overflow = 'hidden';
}

function closeCreateStoreModal() {
    document.getElementById('createStoreModal').classList.remove('open');
    document.body.style.overflow = '';
}

function submitCreateStore() {
    const name = document.getElementById('storeNameInput').value.trim();
    const url = document.getElementById('storeUrlInput').value.trim();

    if (!name || !url) return;

    storeCount++;
    closeCreateStoreModal();

    // Reset form
    document.getElementById('storeNameInput').value = '';
    document.getElementById('storeUrlInput').value = '';

    // Show success feedback
    showToast('Store created successfully!');
}

// ===== Pay Store Modal =====
function closePayStoreModal() {
    document.getElementById('payStoreModal').classList.remove('open');
    document.body.style.overflow = '';
}

function selectPayment(method) {
    closePayStoreModal();
    showToast(`Redirecting to ${method === 'flutterwave' ? 'Flutterwave' : 'Grey'}...`);
}

// Close modals on overlay click
document.getElementById('createStoreModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCreateStoreModal();
});

document.getElementById('payStoreModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePayStoreModal();
});

// ===== Mobile Sidebar =====
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');

    let overlay = document.querySelector('.mobile-sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-sidebar-overlay';
        overlay.onclick = toggleMobileSidebar;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('show');
}

// ===== Toast Notification =====
function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 12px 20px;
        background: linear-gradient(to bottom right, #4361EE, #7C3AED);
        color: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(67,97,238,0.3);
        z-index: 9999;
        animation: toastIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animation
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes toastIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(toastStyle);

// ===== Chart.js Revenue Chart =====
function initChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(67, 97, 238, 0.15)');
    gradient.addColorStop(1, 'rgba(67, 97, 238, 0.01)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [1200, 1900, 1500, 2200, 2800, 2400, 3100, 2900, 3500, 3200, 3800, 4100],
                borderColor: '#4361EE',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#4361EE',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1E293B',
                    titleFont: { family: 'Inter', size: 11, weight: '500' },
                    bodyFont: { family: 'Inter', size: 12, weight: '600' },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: (ctx) => `$${ctx.parsed.y.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 10 },
                        color: '#94A3B8',
                    }
                },
                y: {
                    grid: { color: '#F1F5F9', drawBorder: false },
                    border: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 10 },
                        color: '#94A3B8',
                        callback: (v) => '$' + (v >= 1000 ? v / 1000 + 'k' : v)
                    }
                }
            }
        }
    });
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCreateProduct();
        closeCreateStoreModal();
        closePayStoreModal();
        document.getElementById('notificationDropdown')?.classList.remove('open');
        document.getElementById('profileDropup')?.classList.remove('open');
    }
});

function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'dashboard.html';
}

function updateActiveNav() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === currentPage);
    });
}

async function loadSpaPage(page) {
    if (!page) return;
    try {
        const res = await fetch(page, { cache: 'no-store' });
        if (!res.ok) throw new Error('Page load failed');
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const newContent = doc.querySelector('.content-area');
        if (!newContent) throw new Error('No content area');
        document.querySelector('.content-area').replaceWith(newContent);
        document.title = doc.title || document.title;
        lucide.createIcons();
        initChart();
        updateActiveNav();
        window.scrollTo(0, 0);
    } catch (error) {
        window.location.href = page;
    }
}

function initSpaNav() {
    document.querySelectorAll('.sidebar-nav .nav-item[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('href');
            if (page === getCurrentPage()) return;
            history.pushState({ page }, '', page);
            loadSpaPage(page);
        });
    });

    window.addEventListener('popstate', () => {
        const page = (history.state && history.state.page) || getCurrentPage();
        loadSpaPage(page);
    });
}

document.addEventListener('DOMContentLoaded', initSpaNav);