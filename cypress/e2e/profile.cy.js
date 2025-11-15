/// <reference types="cypress" />

describe('Actualizar perfil', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
    cy.visit('/login')

    cy.get('input[placeholder="Correo electrónico"]').type('karlanito@gmail.com')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.contains('Iniciar sesión').click()

    cy.intercept('GET', '**/api/rentals/get-rentals*').as('getRentals')
    cy.wait('@getRentals')

    cy.contains('Mi perfil').click()
  })

  it('Debe actualizar banco, tipo de cuenta y número de cuenta', () => {
    cy.intercept('PATCH', '**/profile*').as('patchProfile')

    // Banco
    cy.get('select').eq(4).select('BancoEstado')

    // Tipo de cuenta
    cy.get('select').eq(5).select('Cuenta RUT')

    // Número de cuenta
    cy.get('#accountNumber').clear().type('123456789')

    // Guardar
    cy.contains('Guardar').click()

    cy.contains('Perfil actualizado!').should('be.visible')
  })
})
