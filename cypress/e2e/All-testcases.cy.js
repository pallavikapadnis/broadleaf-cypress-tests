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
        // Visit the homepage and search for a product
        cy.visit('https://demo.broadleafcommerce.org/');
        cy.get('input[name="q"]').type('hot sauce{enter}');

        // Ensure there are product items and click the first product's link
        cy.get('.product-list-item').should('have.length.greaterThan', 0);
        cy.get('.product-list-item').first().find('a').first().click();

        // Optional: Verify the URL has changed to the product details page
        cy.url().should('include', '/hot-sauces/scotch_bonnet_hot_sauce'); // Adjust if necessary

        // Optional: Verify that the product details page has relevant content
        cy.contains('Add to Cart').should('be.visible');
        cy.contains('Description').should('be.visible');
    });
});

describe('Broadleaf Commerce Demo Add to Cart and View Cart', () => {
    it('should add the product to the cart and view the cart', () => {
        // Visit the homepage and search for a product
        cy.visit('https://demo.broadleafcommerce.org/');
        cy.get('input[name="q"]').type('hot sauce{enter}');

        // Click on the first product's link
        cy.get('.product-list-item').should('have.length.greaterThan', 0);
        cy.get('.product-list-item').first().find('a').first().click();

        // Click the 'Add to Cart' button
        cy.get('button.btn-primary.js-addToCart').first().click();

        // Verify that the product is added to the cart
        cy.get('.js-inCartLinkContainer').should('be.visible');
        cy.get('.js-inCartLinkContainer a').should('contain', 'View in Cart');

        // Click the 'View Your Cart' button
        cy.get('a.btn.btn-primary.goto-full-cart').click();

        // Verify that the cart page is loaded
        cy.url().should('include', '/cart');

        // Verify that the cart page contains the added product
        cy.contains('Summary').should('be.visible'); // Adjust if necessary
    });
});

describe('Broadleaf Commerce Demo User Registration', () => {
    it('should register a new user successfully', () => {
        // Visit the homepage
        cy.visit('https://demo.broadleafcommerce.org/');

        // Navigate to the registration page
        cy.get('a[href="/login"]').click(); // Adjust if this link navigates to the registration page or use the correct link

        // Fill in the registration form
        cy.get('input[name="customer.firstName"]').first().type('John');
        cy.get('input[name="customer.lastName"]').first().type('Doe');
        cy.get('input[name="customer.emailAddress"]').first().type('john.doe@example.com');
        cy.get('input[id="password"]').eq(1).type('Password123');
        cy.get('input[id="passwordConfirm"]').first().type('Password123'); // Using more specific selector

        // Submit the registration form
        cy.contains('button', 'Register').click();
    });
});

describe('Broadleaf Commerce Demo User Login', () => {
    it('should log in a user successfully', () => {
        // Visit the homepage
        cy.visit('https://demo.broadleafcommerce.org/');

        // Ensure the login form is visible (adjust the selector if necessary)
        cy.get('a[href="/login"]').click(); // Adjust if this link is for showing the login form

        // Fill in the login form
        cy.get('input[name="username"]').type('john.doe@example.com');
        cy.get('input[id="password"]').first().type('Password123');

        // Submit the login form
        cy.contains('button', 'Login').click(); // Use the text of the button to ensure the correct button is clicked

        // Verify successful login
        cy.url().should('not.include', '/login'); // Assuming successful login redirects to a page other than /login
    });
});

describe('Broadleaf Commerce Demo Add to Cart and Checkout', () => {
    it('should add the product to the cart and proceed to checkout', () => {
        // Visit the homepage and search for a product
        cy.visit('https://demo.broadleafcommerce.org/');
      
        cy.get('a[href="/login"]').click(); // Adjust if this link is for showing the login form

        // Fill in the login form
        cy.get('input[name="username"]').type('john.doe@example.com');
        cy.get('input[id="password"]').first().type('Password123');

        // Submit the login form
        cy.contains('button', 'Login').click(); // Use the text of the button to ensure the correct button is clicked

        // Verify successful login
        cy.url().should('not.include', '/login'); // Assuming successful login redirects to a page other than /login

        // Search for a product
        cy.get('input[name="q"]').type('hot sauce{enter}');

        // Click on the first product's link
        cy.get('.product-list-item').should('have.length.greaterThan', 0);
        cy.get('.product-list-item').first().find('a').first().click();

        // Click the 'Add to Cart' button
        cy.get('button.btn-primary.js-addToCart').first().click();

        // Verify that the product is added to the cart
        cy.get('.js-inCartLinkContainer').should('be.visible');
        cy.get('.js-inCartLinkContainer a').should('contain', 'View in Cart');

        // Click the 'View Your Cart' button
        cy.get('a.btn.btn-primary.goto-full-cart').click();

        // Verify that the cart page is loaded
        cy.url().should('include', '/cart');

        // Verify that the cart page contains the added product
        cy.contains('Summary').should('be.visible'); // Adjust if necessary

        // Click the 'Checkout' button (updated to use the <a> tag)
        cy.get('a[href="/checkout"]').click();

        // Fill in the shipping address with updated selectors
        cy.get('input[name="address.fullName"]').first().type('John Doe');
        cy.get('input[name="address.addressLine1"]').first().type('123 Main St');
        cy.get('input[name="address.city"]').first().type('New York');
        cy.get('select[name="address.stateProvinceRegion"]').first().select('AL');
        cy.get('input[name="address.postalCode"]').first().type('10001');
        cy.get('input[name="address.phonePrimary.phoneNumber"]').first().type('5551234567');

        // Submit the shipping form by clicking the "Continue" button (updated selector)
        cy.get('a.js-submitCheckoutStage').click();

        // Choose the shipping method,Select the "Priority (3 - 5 Days)" shipping option by its value or id
        cy.get('input#fulfillmentOptionId2').check({ force: true });

        // Submit the shipping method form
        cy.get('a.js-submitCheckoutStage').click();

        // Select the "Collect On Delivery" option by clicking the <a> tag
        cy.get('a[data-toggle="pill"][href="#COD"]').click();
        // Click the "Continue" button
        cy.get('a.js-submitPaymentCheckoutStage').click();

        // Click the "Place Your Order" button
        cy.get('a.js-performCheckout').first().click();

        // Verify the order confirmation
        cy.url().should('include', '/confirmation');
        cy.contains('Thank You!').should('be.visible');

    });
});
