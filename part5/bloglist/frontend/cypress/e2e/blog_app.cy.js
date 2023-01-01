import { copyFileSync } from "fs"

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
        describe('When blog exists', function () {
            beforeEach(function () {
                cy.contains('New blog').click()
                cy.createBlog({ title: title, author: author, url: url })
            })
            it('blog can be liked', function () {
                cy.contains(title).parent().parent().as('thisBlog')
                cy.get('@thisBlog').contains('View').click()
                cy.get('@thisBlog').get('#like-button').click()
                cy.get('@thisBlog').contains('Likes: 1')
            })
            it('blog can be deleted', function () {
                cy.contains(title).parent().parent().as('thisBlog')
                cy.get('@thisBlog').contains('View').click()
                cy.get('@thisBlog').get('#delete-button').click()
                cy.contains(title).should('not.exist')
            })
        })
        describe('When multiple blogs exist', function () {
            beforeEach(function () {
                cy.contains('New blog').click()
                cy.createBlog({ title: 'Blog1', author: author, url: url })
                cy.createBlog({ title: 'Blog2', author: author, url: url })
                cy.createBlog({ title: 'Blog3', author: author, url: url })

                cy.contains('Blog1').parent().parent().contains('View').click()
                cy.contains('Blog2').parent().parent().contains('View').click()
                cy.contains('Blog3').parent().parent().contains('View').click()
                cy.contains('Title: Blog1').find('#like-button').click()
                cy.contains('Title: Blog2').find('#like-button').click()
                cy.contains('Title: Blog2').find('#like-button').click()
                cy.contains('Title: Blog3').find('#like-button').click()
                cy.contains('Title: Blog3').find('#like-button').click()
                cy.contains('Title: Blog3').find('#like-button').click()
            })
            it('Blogs are sorted according to likes', function () {
                cy.get('.blog').should('have.length', 3)
                    .then((blogs) => {
                        cy.wrap(blogs[0]).find('#blogDetails')
                            .should('have.text', 'Title: Blog3Author: Cypress TestURL: www.cypress.ioLikes: 3LikeDelete')
                        cy.wrap(blogs[1]).find('#blogDetails')
                            .should('have.text', 'Title: Blog2Author: Cypress TestURL: www.cypress.ioLikes: 2LikeDelete')
                        cy.wrap(blogs[2]).find('#blogDetails')
                            .should('have.text', 'Title: Blog1Author: Cypress TestURL: www.cypress.ioLikes: 1LikeDelete')
                    })
            })
        })
    })
})

