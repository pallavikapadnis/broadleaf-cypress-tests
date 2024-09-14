describe('Broad leaf Demo Homepage', () => {
    it('should load the homepage successfully', () => {
      cy.visit('https://demo.broadleafcommerce.org/');
      cy.contains('HOT SAUCE AFICIONADO?'); // Check for a specific element on the homepage
    });
  });

describe('Broadleaf Commerce Demo Product Search', () => {
    it('should search for "hot sauce" successfully', () => {
        // Visit the Broadleaf Commerce demo homepage
        cy.visit('https://demo.broadleafcommerce.org/');
        
        // Search for the product using the correct input field
        cy.get('input[name="q"]').type('hot sauce{enter}'); 
        
        // Verify that search results contain relevant products
        cy.contains('Search Results').should('exist');
    });
});

describe('Broadleaf Commerce Demo Product Details', () => {
    it('should navigate to the product details page', () => {
        cy.addToCart('hot sauce'); // Use custom command to add product to cart

        // Verify that the product details page loaded
        cy.url().should('include', '/hot-sauces/scotch_bonnet_hot_sauce');
        cy.contains('Add to Cart').should('be.visible');
        cy.contains('Description').should('be.visible');
    });
});

describe('Broadleaf Commerce Demo Add to Cart and View Cart', () => {
    it('should add the product to the cart and view the cart', () => {
        cy.addToCart('hot sauce'); // Use custom command to add product to cart

        cy.get('.js-inCartLinkContainer').should('be.visible');
        cy.get('.js-inCartLinkContainer a').should('contain', 'View in Cart');
        cy.get('a.btn.btn-primary.goto-full-cart').click();
        cy.url().should('include', '/cart');
        cy.contains('Summary').should('be.visible');
    });
});

describe('Broadleaf Commerce Demo User Registration', () => {
    it('should register a new user successfully', () => {
        cy.fixture('user-data.json').then((data) => {
            cy.visit('https://demo.broadleafcommerce.org/');
            
            // Navigate to the registration page
            cy.get('a[href="/login"]').click(); // Adjust this link if necessary

            // Wait for the registration form to load (if necessary)
            cy.wait(2000); // Adjust or remove if needed

            // Fill in the registration form
            cy.get('input[name="customer.firstName"]').first().type(data.validUser.firstName);
            cy.get('input[name="customer.lastName"]').first().type(data.validUser.lastName);
            cy.get('input[name="customer.emailAddress"]').first().type(data.validUser.email);
            cy.get('input[id="password"]').eq(1).type(data.validUser.password);
            cy.get('input[id="passwordConfirm"]').first().type(data.validUser.password); // Ensure passwords match

            // If there's a checkbox or similar for accepting terms
            // Uncomment and adjust the selector if necessary
            // cy.get('input[name="accept_terms_register"]').check(); 

            // Submit the registration form
            cy.contains('button', 'Register').click();
        });
    });
});

describe('Broadleaf Commerce Demo User Login', () => {
    it('should log in a user successfully', () => {
        cy.loginWithFixture(); // Use custom command to log in with fixture data
    });
});

describe('Broadleaf Commerce Demo Add to Cart and Checkout', () => {
    it('should add the product to the cart and proceed to checkout', () => {
        cy.loginWithFixture(); // Use custom command to log in with fixture data
        cy.addToCart('hot sauce'); // Use custom command to add product to cart

        cy.get('.js-inCartLinkContainer').should('be.visible');
        cy.get('.js-inCartLinkContainer a').should('contain', 'View in Cart');
        cy.get('a.btn.btn-primary.goto-full-cart').click();
        cy.url().should('include', '/cart');
        cy.contains('Summary').should('be.visible');

        // Shipping address
        cy.get('a[href="/checkout"]').click();
        cy.fillShippingAddressWithFixture(); // Use custom command to fill shipping address with fixture data
        cy.get('a.js-submitCheckoutStage').click();
        cy.get('input#fulfillmentOptionId2').check({ force: true });
        cy.get('a.js-submitCheckoutStage').click();
        cy.get('a[data-toggle="pill"][href="#COD"]').should('be.visible').click();
        cy.get('a.js-submitPaymentCheckoutStage').click();
        cy.get('a.js-performCheckout').first().click();
        cy.url().should('include', '/confirmation');
        cy.contains('Thank You!').should('be.visible');
    });
})

