// Book data for the website
const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    price: 299,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-150784272343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Novel",
    price: 349,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Engineering Mathematics",
    author: "B.S. Grewal",
    category: "Engineering Textbooks",
    price: 450,
    condition: "Like New",
    rating: 4,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Physics for Engineers",
    author: "H.C. Verma",
    category: "Science Textbooks",
    price: 520,
    condition: "Good",
    rating: 4,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Principles of Accounting",
    author: "M.N. Arora",
    category: "Commerce Textbooks",
    price: 380,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    category: "Autobiography",
    price: 250,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop"
  },
  {
    id: 7,
    title: "The Secret",
    author: "Rhonda Byrne",
    category: "Non-fiction",
    price: 320,
    condition: "Like New",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fictional",
    price: 400,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop"
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fictional",
    price: 280,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 10,
    title: "Calculus and Analytical Geometry",
    author: "George B. Thomas",
    category: "Engineering Textbooks",
    price: 550,
    condition: "Good",
    rating: 4,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop"
  },
  {
    id: 11,
    title: "Organic Chemistry",
    author: "Morrison & Boyd",
    category: "Science Textbooks",
    price: 480,
    condition: "Like New",
    rating: 4,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop"
  },
  {
    id: 12,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Novel",
    price: 330,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 13,
    title: "Educated",
    author: "Tara Westover",
    category: "Autobiography",
    price: 420,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop"
  },
  {
    id: 14,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Story",
    price: 290,
    condition: "Good",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 15,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-fiction",
    price: 350,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 16,
    title: "Data Structures and Algorithms",
    author: "Mark Allen Weiss",
    category: "Engineering Textbooks",
    price: 520,
    condition: "Good",
    rating: 4,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop"
  },
  {
    id: 17,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-fiction",
    price: 300,
    condition: "Like New",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 18,
    title: "The Nightingale",
    author: "Kristin Hannah",
    category: "Novel",
    price: 360,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 19,
    title: "Business Studies",
    author: "Sandeep Garg",
    category: "Commerce Textbooks",
    price: 340,
    condition: "Like New",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=600&fit=crop"
  },
  {
    id: 20,
    title: "The Book Thief",
    author: "Markus Zusak",
    category: "Fictional",
    price: 310,
    condition: "Good",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop"
  }
];

// Initialize navbar interactivity
document.addEventListener('DOMContentLoaded', function() {
  initializeMobileMenu();
  initializeSearch();
  initializeFilters();
});

// Mobile menu toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Search functionality
function initializeSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  const booksGrid = document.getElementById('books-grid');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!booksGrid) return;

    if (query === '') {
      displayBooks(booksData);
      return;
    }

    const filtered = booksData.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    );

    displayBooks(filtered);
  }
}

// Filter functionality
function initializeFilters() {
  const categoryLinks = document.querySelectorAll('[data-category]');
  const priceRange = document.getElementById('price-range');
  const conditionSelect = document.getElementById('condition-filter');
  const branchSelect = document.getElementById('branch-filter');
  const semesterSelect = document.getElementById('semester-filter');
  const booksGrid = document.getElementById('books-grid');

  if (categoryLinks.length > 0) {
    categoryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        filterByCategory(category);
      });
    });
  }

  if (priceRange) {
    priceRange.addEventListener('input', applyFilters);
  }

  if (conditionSelect) {
    conditionSelect.addEventListener('change', applyFilters);
  }

  if (branchSelect) {
    branchSelect.addEventListener('change', applyFilters);
  }

  if (semesterSelect) {
    semesterSelect.addEventListener('change', applyFilters);
  }

  function filterByCategory(category) {
    if (category === 'all') {
      displayBooks(booksData);
    } else {
      const filtered = booksData.filter(book => book.category === category);
      displayBooks(filtered);
    }
  }

  function applyFilters() {
    let filtered = [...booksData];

    // Price filter
    if (priceRange) {
      const maxPrice = parseInt(priceRange.value);
      filtered = filtered.filter(book => book.price <= maxPrice);
    }

    // Condition filter
    if (conditionSelect && conditionSelect.value) {
      filtered = filtered.filter(book => book.condition === conditionSelect.value);
    }

    // Category filter (for textbooks page)
    const activeCategoryBtn = document.querySelector('[data-category].active');
    if (activeCategoryBtn && activeCategoryBtn.getAttribute('data-category') !== 'all') {
      const category = activeCategoryBtn.getAttribute('data-category');
      filtered = filtered.filter(book => book.category === category);
    }

    displayBooks(filtered);
  }
}

// Display books in grid
function displayBooks(books) {
  const booksGrid = document.getElementById('books-grid');
  if (!booksGrid) return;

  if (books.length === 0) {
    booksGrid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-500 text-lg">No books found</p></div>';
    return;
  }

  booksGrid.innerHTML = books.map(book => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div class="relative overflow-hidden bg-gray-200 h-64">
        <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
        <span class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">₹${book.price}</span>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-gray-800 truncate">${book.title}</h3>
        <p class="text-gray-600 text-sm mb-2">${book.author}</p>
        <div class="flex items-center justify-between mb-3">
          <span class="text-yellow-500">${'⭐'.repeat(book.rating)}</span>
          <span class="text-xs font-semibold px-2 py-1 rounded-full ${book.condition === 'Like New' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
            ${book.condition}
          </span>
        </div>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

// Form validation for sell book page
function validateSellForm() {
  const form = document.getElementById('sell-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('seller-name').value.trim();
    const bookTitle = document.getElementById('book-title').value.trim();
    const category = document.getElementById('book-category').value;
    const price = document.getElementById('book-price').value.trim();
    const condition = document.getElementById('book-condition').value;
    const image = document.getElementById('book-image').value;

    if (!name || !bookTitle || !category || !price || !condition || !image) {
      alert('Please fill all fields');
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    alert('Book submitted successfully! We will review it soon.');
    form.reset();
  });
}

// Initialize form validation when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', validateSellForm);
} else {
  validateSellForm();
}

// Login form validation
function validateLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    alert('Login successful!');
    // In a real app, you would send this to a server
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', validateLoginForm);
} else {
  validateLoginForm();
}

// Export for use in other pages
window.booksData = booksData;
window.displayBooks = displayBooks;
