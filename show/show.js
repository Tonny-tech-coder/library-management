// ============================================
// DOM ELEMENTS
// ============================================

// Navigation container where links will be inserted
const navContainer = document.getElementById('nav-container');

// ============================================
// NAVIGATION LINKS DATA
// ============================================

// Array of navigation links to display
const navLinks = [
    {
        label: 'Dashboard',
        active: true,
        link: '/dashboard'
    },
    {
        label: 'Books',
        active: false,
        link: '/books'
    }
]

// ============================================
// DISPLAY NAVIGATION LINKS
// ============================================

// Create and insert navigation links into the DOM
export const displayNavLinks = () => {
    navLinks.map((nav, i) => {
        // Create list elements
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        const a = document.createElement('a')

        // Set link text and href
        a.textContent = `${nav.label}` 
        a.href = `${nav.link}`
        
        // Build link structure
        navContainer.appendChild(ul)
        ul.appendChild(li);
        li.appendChild(a);
    })
    
    console.log(navLinks);
}

// ============================================
// INITIALIZATION
// ============================================

// Display navigation links when script loads
displayNavLinks()

