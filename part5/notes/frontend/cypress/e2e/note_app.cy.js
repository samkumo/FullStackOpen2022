/* eslint-disable no-undef */
describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Samuli Kumo',
            username: 'samkumo',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Application')
    })
    it('login form can be opened', function () {
        cy.contains('Login').click()
    })
    it('user can login', function () {
        cy.contains('Login').click()
        cy.get('#username').type('samkumo')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('Samuli Kumo logged in')
    })
    it('login fails with wrong password', function () {
        cy.contains('Login').click()
        cy.get('#username').type('samkumo')
        cy.get('#password').type('false-pw')
        cy.get('#login-button').click()
        cy.get('.error').contains('Wrong credentials')
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'samkumo', password: 'password' })
        })
        describe('When note exists', function () {
            beforeEach(function () {
                cy.createNote({ content: 'Cypress-test note2', important: false })
                /*                 cy.contains('New note').click()
                                cy.get('#note-input').type('Cypress-test note2')
                                cy.get('#savenote-button').click() */
            })
            it('note can be set as Important', function () {
                cy.contains('Cypress-test note2')
                    .contains('make important')
                    .click()
                cy.contains('Cypress-test note2')
                    .contains('make not important')
            })
        })
        describe('When several notes exists', function () {
            beforeEach(function () {
                cy.createNote({ content: 'Cypress-test note2', important: false })
                cy.createNote({ content: 'Cypress-test note3', important: false })
                cy.createNote({ content: 'Cypress-test note4', important: false })
            })
            it('one of those can be set important', function () {
                cy.contains('Cypress-test note3')
                    .contains('make important')
                    .click()
                cy.contains('Cypress-test note3')
                    .contains('make not important')
            })
        })

        it('new note can be created', function () {
            cy.contains('New note').click()
            cy.get('#note-input').type('Cypress-test note')
            cy.get('#savenote-button').click()
            cy.contains('Cypress-test note')
        })

    })
})