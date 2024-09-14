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
