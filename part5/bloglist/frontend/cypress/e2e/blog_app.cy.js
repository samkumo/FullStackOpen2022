/* eslint-disable no-undef */
describe('Bloglist App', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Samuli Kumo',
            username: 'samkumo',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function () {
        cy.contains('Login')
    })
    describe('Login', function () {
        it('User can login', function () {
            cy.contains('Login').click()
            cy.get('#username-input').type('samkumo')
            cy.get('#password-input').type('password')
            cy.get('#login-button').click()
            cy.contains('logged in')
        })
        it('Wrong credentials', function () {
            cy.contains('Login').click()
            cy.get('#username-input').type('samkumo')
            cy.get('#password-input').type('falsepw')
            cy.get('#login-button').click()
            cy.get('.error').contains('Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})
