describe('@sass-project/frontend-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('shows the MedPrep landing page and navigation links', () => {
    cy.title().should('contain', 'MedPrep AI Nepal');
    cy.get('h1').should('contain.text', 'MedPrep AI');
    cy.contains('a', 'Start learning free').should('have.attr', 'href', '/auth');
    cy.contains('h2', 'Build a stronger foundation.').should('be.visible');
  });

  it('lets visitors try the sample question without signing in', () => {
    cy.get('[aria-label="Sample question answers"]')
      .contains('button', 'Left ventricle')
      .click();
    cy.get('[aria-live="polite"]').should('contain.text', 'Exactly right.');
  });

  it('keeps the landing content visible on a narrow screen', () => {
    cy.viewport(375, 812);
    cy.get('h1').should('be.visible');
    cy.get('#try-it').should('be.visible');
  });

  it('requires authentication for protected API integrations', () => {
    for (const url of ['/api/admin', '/api/tutor', '/api/visual']) {
      cy.request({ method: 'POST', url, failOnStatusCode: false })
        .its('status')
        .should('equal', 401);
    }
  });
});
