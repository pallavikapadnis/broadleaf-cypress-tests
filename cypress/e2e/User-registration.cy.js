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

