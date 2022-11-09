describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://google.com.br');
    cy.get('.gNO89b').should('have.value', 'Pesquisa Google');
  })
})
