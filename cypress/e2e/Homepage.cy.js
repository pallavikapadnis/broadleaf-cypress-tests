describe('Broad leaf Demo Homepage', () => {
    it('should load the homepage successfully', () => {
      cy.visit('https://demo.broadleafcommerce.org/');
      cy.contains('HOT SAUCE AFICIONADO?'); // Check for a specific element on the homepage
    });
  });