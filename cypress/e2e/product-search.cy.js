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
