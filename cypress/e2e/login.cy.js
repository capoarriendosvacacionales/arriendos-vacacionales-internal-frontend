/// <reference types="cypress" />

describe('Hacer Login', () => {
  beforeEach(() => {
    cy.visit('/login') // Asegura que el usuario está en la ruta correcta
  })

  it('Debe iniciar sesión, ir a Mi perfil, cerrar sesión y volver a /login', () => {
    cy.viewport(1280, 900)

    // Login correcto
    cy.get('input[placeholder="Correo electrónico"]').type('karlanito@gmail.com')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.contains('Iniciar sesión').click()

    cy.intercept('GET', '**/api/rentals/get-rentals*').as('getRentals')
    cy.wait('@getRentals')

    // Debe quedar en /calendar
    cy.url().should('include', '/calendar')

    // hace clic en Mi Perfil
    cy.contains('Mi perfil').click()

    // Verifica que estamos en /profile
    cy.url().should('include', '/profile')

    // Cerrar sesión
    cy.contains('Cerrar sesión').click()

    // Debe volver a /login
    cy.url().should('include', '/login')
  })

  it('Debe mostrar error si las credenciales son incorrectas', () => {
    cy.get('input[placeholder="Correo electrónico"]').type('karlanito@gmail.com')
    cy.get('input[placeholder="Password"]').type('1234567890')
    cy.contains('Iniciar sesión').click()

    // Debe ver mensaje de error
    cy.contains('Usuario o password incorrectas').should('be.visible')
  })
})
