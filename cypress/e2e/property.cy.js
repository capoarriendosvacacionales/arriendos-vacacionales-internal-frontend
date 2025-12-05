describe('Publicar/Despublicar propiedad', () => {
  beforeEach(() => {
    cy.viewport(1280, 1600)
    cy.visit('/login')

    cy.get('input[placeholder="Correo electrónico"]').type('karlanito@gmail.com')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.contains('Iniciar sesión').click()

    cy.intercept('GET', '**/api/rentals/get-rentals*').as('getRentals')
    cy.wait('@getRentals')

    cy.contains('Mis propiedades').click()
  })

  it('debe despublicar la primera propiedad', () => {
    cy.contains('Mis propiedades')

    // Espera a que la tabla tenga filas
    cy.get('.card-table table tbody tr', { timeout: 8000 }).should('have.length.at.least', 1)

    // Ahora, abre el detalle de la primera propiedad
    cy.get('body').find('.card-table tbody .mdi-chevron-right').first().click({ force: true })

    cy.contains('Despublicar').click()

    cy.contains('Propiedad actualizada!').should('be.visible')
  })

  it('debe publicar la primera propiedad', () => {
    cy.contains('Mis propiedades')

    cy.get('.card-table table tbody tr', { timeout: 8000 }).should('have.length.at.least', 1)

    cy.get('body').find('.card-table tbody .mdi-chevron-right').first().click({ force: true })

    cy.contains('Publicar').click()

    cy.contains('Propiedad actualizada!').should('be.visible')
  })
})
