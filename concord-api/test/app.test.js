const app = require('../src/api')
const supertest = require('supertest')
const request = supertest(app)

describe('Api test', () => {
    test('Create user', async done => {
        const res = await request.post('/register')
            .send({
                email: 'llimab6@gmail.com',
                name: 'Lucas Barbosa',
                password: '123456',
                username: 'llbarbosas'
            })

        console.log(res.body)
        expect(res.status).toBe(200)

        done()
    })

    test('Verify e-mail', async done => {
        const res = await request.get('/verify-email?token=123456')

        console.log(res.body)
        expect(res.status).toBe(200)

        done()
    })

    test('Login user', async done => {
        const res = await request.post('/login')
            .send({
                email: 'llimab6@gmail.com',
                password: '123456',
            })

        console.log(res.body)
        expect(res.status).toBe(200)

        done()
    })
})

// router.post('/login', UserController.auth)
// router.post('/register', UserController.create)
// router.get('/verify-email', UserController.verifyEmail)