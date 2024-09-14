// Custom command for logging in a user using fixture data
Cypress.Commands.add('loginWithFixture', () => {
    cy.fixture('user-data.json').then((data) => {
        cy.visit('https://demo.broadleafcommerce.org/');
        cy.get('a[href="/login"]').click(); // Navigate to the login page
        cy.get('input[name="username"]').type(data.validUser.email); // Enter username
        cy.get('input[id="password"]').first().type(data.validUser.password); // Enter password
        cy.contains('button', 'Login').click(); // Submit login form
        cy.url().should('not.include', '/login'); // Ensure login is successful
    });
});

// Custom command for adding a product to the cart
Cypress.Commands.add('addToCart', (productName) => {
    cy.visit('https://demo.broadleafcommerce.org/');
    cy.get('input[name="q"]').type(`${productName}{enter}`); // Search for the product
    cy.get('.product-list-item').should('have.length.greaterThan', 0); // Ensure there are search results
    cy.get('.product-list-item').first().find('a').first().click(); // Click the first product
    cy.get('button.btn-primary.js-addToCart').first().click(); // Add the product to the cart
});

// Custom command for filling out the shipping address using fixture data
Cypress.Commands.add('fillShippingAddressWithFixture', () => {
    cy.fixture('user-data.json').then((data) => {
        cy.get('input[name="address.fullName"]').first().type(`${data.validUser.firstName} ${data.validUser.lastName}`);
        cy.get('input[name="address.addressLine1"]').first().type(data.address.address);
        cy.get('input[name="address.city"]').first().type(data.address.city);
        cy.get('select[name="address.stateProvinceRegion"]').first().select(data.address.state);
        cy.get('input[name="address.postalCode"]').first().type(data.address.zipcode);
        cy.get('input[name="address.phonePrimary.phoneNumber"]').first().type(data.address.phone);
    });
});
