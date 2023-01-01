/* eslint-disable no-undef */
const bloggerName = 'Cypress Test'
const username = 'cyUser'
const password = '123456'
const title = 'Blog about Cypress'
const author = bloggerName
const url = 'www.cypress.io'


describe('Bloglist App', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: bloggerName,
            username: username,
            password: password
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
            cy.get('#username-input').type(username)
            cy.get('#password-input').type(password)
            cy.get('#login-button').click()
            cy.contains('logged in')
        })
        it('Wrong credentials', function () {
            cy.contains('Login').click()
            cy.get('#username-input').type(username)
            cy.get('#password-input').type('wrong_pw')
            cy.get('#login-button').click()
            cy.get('.error').contains('Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.contains('Login').click()
            cy.login({ username: username, password: password })
        })
        it('add blog', function () {
            cy.contains('New blog').click()
            cy.get('#title-input').type(title)
            cy.get('#author-input').type(author)
            cy.get('#url-input').type(url)
            cy.get('#submitBlog-button').click()
            cy.contains(title)
        })
    })
})
