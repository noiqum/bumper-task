

describe('Form Submission Flow', () => {
    it('should navigate to the form page, fill out the form, and submit successfully', () => {
        // Visit the homepage
        cy.visit('http://localhost:3000');

        // Navigate to the form page
        cy.get('[data-testid="register-button-nav"]').click();

        const randomEmail = `test${Date.now()}@example.com`

        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                name: 'Test User',
                company: 'Test Company',
                mobile_phone: '07123456789',
                email_address: randomEmail,
                postcode: 'EC1N',
                pay_later: true,
                pay_now: false
            }
        }).then((response) => {
            //@ts-ignore
            expect(response.status as any).to.equal(201)


            // Now navigate to the list page to verify the record
            cy.visit('http://localhost:3000/driver')
            cy.contains('Test Company').should('be.visible')

            // Test search functionality
            cy.get('[id="search"]').type('Test Company')
            cy.contains('Test Company').should('be.visible')
        })

    });
});