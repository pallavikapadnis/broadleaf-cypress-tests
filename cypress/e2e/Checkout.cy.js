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
        cy.get('a[data-toggle="pill"][href="#COD"]').click();
        cy.get('a.js-submitPaymentCheckoutStage').click();
        cy.get('a.js-performCheckout').first().click();
        cy.url().should('include', '/confirmation');
        cy.contains('Thank You!').should('be.visible');
    });
});
