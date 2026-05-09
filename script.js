// ===== Initialize Lucide Icons =====
lucide.createIcons();

// ===== State =====
let currentCurrency = 'USD';
let storeCount = 0;
const RATE = 1500; // 1 USD = 1500 NGN
const balanceUSD = 12450.00;
const bookBalanceUSD = 2340.00;

// ===== SPA Navigation =====
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');
const viewAllLinks = document.querySelectorAll('.view-all-link[data-page]');

function navigateTo(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
    }

    const navTarget = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (navTarget) {
        navTarget.classList.add('active');
    }

    // Reinitialize any page-specific content
    if (pageId === 'products') {
        initProductPageDropdowns();
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        if (page) navigateTo(page);
    });
});

viewAllLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) navigateTo(page);
    });
});

// ===== Currency Switching =====
const currencyBtns = document.querySelectorAll('.currency-btn');
const balanceAmount = document.getElementById('balanceAmount');
const bookBalance = document.getElementById('bookBalance');

function updateBalance() {
    if (currentCurrency === 'USD') {
        balanceAmount.textContent = '$' + balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        bookBalance.textContent = '$' + bookBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        const balNGN = balanceUSD * RATE;
        const bookNGN = bookBalanceUSD * RATE;
        balanceAmount.textContent = '₦' + balNGN.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        bookBalance.textContent = '₦' + bookNGN.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currencyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCurrency = btn.getAttribute('data-currency');
        updateBalance();
    });
});

// ===== Custom Dropdowns =====
function initDropdowns(container = document) {
    const dropdowns = container.querySelectorAll('.custom-dropdown');

    dropdowns.forEach(dd => {
        const trigger = dd.querySelector('.dropdown-trigger');
        const menu = dd.querySelector('.dropdown-menu');
        const items = dd.querySelectorAll('.dropdown-item');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            document.querySelectorAll('.custom-dropdown.open').forEach(openDD => {
                if (openDD !== dd) openDD.classList.remove('open');
            });
            dd.classList.toggle('open');
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                // Update selected state
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update trigger text
                const triggerSpan = trigger.querySelector('span');
                if (triggerSpan) {
                    triggerSpan.textContent = item.textContent;
                }

                dd.classList.remove('open');

                // Handle product format toggle
                const ddName = dd.getAttribute('data-dropdown');
                if (ddName === 'productFormat') {
                    handleFormatChange(item.getAttribute('data-value'));
                }
            });
        });
    });
}

// Close dropdowns on outside click
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
        dd.classList.remove('open');
    });
});

initDropdowns();

// ===== Product Format Toggle =====
function handleFormatChange(val) {
    const digitalGroup = document.getElementById('digitalCatGroup');
    const physicalGroup = document.getElementById('physicalCatGroup');
    const digitalDD = digitalGroup.querySelector('.custom-dropdown');
    const physicalDD = physicalGroup.querySelector('.custom-dropdown');

    if (val === 'digital') {
        digitalGroup.classList.remove('disabled-group');
        digitalDD.classList.remove('disabled-dropdown');
        physicalGroup.classList.add('disabled-group');
        physicalDD.classList.add('disabled-dropdown');
    } else {
        digitalGroup.classList.add('disabled-group');
        digitalDD.classList.add('disabled-dropdown');
        physicalGroup.classList.remove('disabled-group');
        physicalDD.classList.remove('disabled-dropdown');
    }
}

// ===== Init product page dropdowns =====
function initProductPageDropdowns() {
    // Re-called when navigating to products page
    lucide.createIcons();
}

// ===== Create Product Side Panel =====
const createProductBtn = document.getElementById('createProductBtn');
const createProductBtn2 = document.getElementById('createProductBtn2');
const sidePanel = document.getElementById('sidePanel');
const sidePanelOverlay = document.getElementById('sidePanelOverlay');
const closeSidePanel = document.getElementById('closeSidePanel');

function openSidePanel() {
    sidePanel.classList.add('open');
    sidePanelOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeSidePanelFn() {
    sidePanel.classList.remove('open');
    sidePanelOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

createProductBtn.addEventListener('click', openSidePanel);
createProductBtn2.addEventListener('click', openSidePanel);
closeSidePanel.addEventListener('click', closeSidePanelFn);
sidePanelOverlay.addEventListener('click', closeSidePanelFn);

// ===== Product Media Upload =====
const productMediaUpload = document.getElementById('productMediaUpload');
const productMediaInput = document.getElementById('productMediaInput');
const mediaPreview = document.getElementById('mediaPreview');

productMediaUpload.addEventListener('click', () => {
    productMediaInput.click();
});

productMediaInput.addEventListener('change', (e) => {
    const files = e.target.files;
    mediaPreview.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const thumb = document.createElement('div');
            thumb.className = 'media-thumb';
            thumb.innerHTML = `
                <img src="${ev.target.result}" alt="">
                <div class="remove-media">&times;</div>
            `;
            thumb.querySelector('.remove-media').addEventListener('click', (ev2) => {
                ev2.stopPropagation();
                thumb.remove();
            });
            mediaPreview.appendChild(thumb);
        };
        reader.readAsDataURL(file);
    });
});

// ===== Cover Image Upload =====
const coverImageUpload = document.getElementById('coverImageUpload');
const coverImageInput = document.getElementById('coverImageInput');

coverImageUpload.addEventListener('click', () => {
    coverImageInput.click();
});

coverImageInput.addEventListener('change', () => {
    if (coverImageInput.files.length) {
        coverImageUpload.innerHTML = `<span style="color:#22C55E;font-size:13px">✓ Cover image selected</span>`;
    }
});

// ===== Digital File Upload =====
const digitalFileUpload = document.getElementById('digitalFileUpload');
const digitalFileInput = document.getElementById('digitalFileInput');

digitalFileUpload.addEventListener('click', () => {
    digitalFileInput.click();
});

digitalFileInput.addEventListener('change', () => {
    if (digitalFileInput.files.length) {
        const fileName = digitalFileInput.files[0].name;
        digitalFileUpload.innerHTML = `<i data-lucide="check-circle" style="width:16px;height:16px;color:#22C55E"></i><span style="color:#22C55E;font-size:13px">${fileName}</span>`;
        lucide.createIcons();
    }
});

// ===== Submit Product =====
const submitProduct = document.getElementById('submitProduct');
submitProduct.addEventListener('click', () => {
    closeSidePanelFn();
    showToast('Product created successfully!');
});

// ===== Create Store Modal =====
const createStoreBtn = document.getElementById('createStoreBtn');
const createStoreModal = document.getElementById('createStoreModal');
const storeModalClose = document.getElementById('closeStoreModal');
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const submitStore = document.getElementById('submitStore');
const storeNameInput = document.getElementById('storeNameInput');
const storeUrlInput = document.getElementById('storeUrlInput');

createStoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('profileDropup').classList.remove('show');
    createStoreModal.classList.add('show');
    lucide.createIcons();
});

storeModalClose.addEventListener('click', () => {
    createStoreModal.classList.remove('show');
});

createStoreModal.addEventListener('click', (e) => {
    if (e.target === createStoreModal) {
        createStoreModal.classList.remove('show');
    }
});

submitStore.addEventListener('click', () => {
    if (!storeNameInput.value.trim() || !storeUrlInput.value.trim()) {
        showToast('Please fill in all fields');
        return;
    }

    storeCount++;

    if (storeCount >= 2) {
        // Show payment modal
        createStoreModal.classList.remove('show');
        paymentModal.classList.add('show');
        lucide.createIcons();
    } else {
        createStoreModal.classList.remove('show');
        showToast('Store created successfully!');
    }
});

closePaymentModal.addEventListener('click', () => {
    paymentModal.classList.remove('show');
});

paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.remove('show');
    }
});

// ===== Profile Dropup =====
const profileBtn = document.getElementById('profileBtn');
const profileDropup = document.getElementById('profileDropup');
const profileChevron = profileBtn.querySelector('.profile-chevron');

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropup.classList.toggle('show');
    profileChevron.classList.toggle('up');
});

document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target)) {
        profileDropup.classList.remove('show');
        profileChevron.classList.remove('up');
    }
});

// ===== Notification Panel =====
const notifBtn = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');
const notifMarkRead = notifPanel.querySelector('.notif-mark-read');

notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
        notifPanel.classList.remove('show');
    }
});

notifMarkRead.addEventListener('click', () => {
    document.querySelectorAll('.notif-item.unread').forEach(item => {
        item.classList.remove('unread');
        const dot = item.querySelector('.notif-dot');
        if (dot) dot.classList.add('hidden');
    });
    document.querySelector('.notif-badge').style.display = 'none';
});

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    if (sidebar.classList.contains('mobile-open')) {
        sidebarOverlay.style.display = 'block';
    } else {
        sidebarOverlay.style.display = 'none';
    }
});

sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.style.display = 'none';
});

// ===== Toast =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Revenue Chart =====
const ctx = document.getElementById('revenueChart').getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 250);
gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
gradient.addColorStop(1, 'rgba(79, 70, 229, 0.01)');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue',
            data: [1200, 1900, 1500, 2800, 2200, 3100, 2900, 3500, 3200, 4100, 3900, 4600],
            borderColor: '#4F46E5',
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4F46E5',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1E293B',
                titleFont: { family: 'Inter', size: 12 },
                bodyFont: { family: 'Inter', size: 13 },
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return '$' + context.parsed.y.toLocaleString();
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { family: 'Inter', size: 11 },
                    color: '#94A3B8'
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: '#F1F5F9',
                    drawBorder: false,
                },
                ticks: {
                    font: { family: 'Inter', size: 11 },
                    color: '#94A3B8',
                    callback: function(value) {
                        return '$' + (value / 1000).toFixed(1) + 'k';
                    }
                },
                border: {
                    display: false
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        }
    }
});

// ===== Chart Period Pills =====
document.querySelectorAll('.period-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.period-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
    });
});

// ===== Initial Balance =====
updateBalance();

// ===== Prevent default on anchor links =====
document.querySelectorAll('.nav-item:not([data-page]), .dropup-item:not(#createStoreBtn)').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Coming soon!');
    });
});