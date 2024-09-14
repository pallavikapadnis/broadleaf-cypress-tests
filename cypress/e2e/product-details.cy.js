describe('Broadleaf Commerce Demo Product Details', () => {
    it('should navigate to the product details page', () => {
        cy.addToCart('hot sauce'); // Use custom command to add product to cart

        // Verify that the product details page loaded
        cy.url().should('include', '/hot-sauces/scotch_bonnet_hot_sauce');
        cy.contains('Add to Cart').should('be.visible');
        cy.contains('Description').should('be.visible');
    });
});
