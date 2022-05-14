const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);



describe('First test collection', () => {

    it('test default API welcome route...', (done) => {
        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('Welcome to the MEN-REST-API')
            done();
        })
    } )

    it('should verify that we have 0 products in the database', (done) => {
        chai.request(server)
        .get('/api/products')
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0);
        done();
        });
    });

    it('should POST a valid product', (done) => {
        let product = {
            name: "Test product",
            description: "test product desc",
            price: 100,
            inStock: true
        } 
        chai.request(server)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
            res.should.have.status(201); 
            done();
        });
    });

    it('should verify that we have 1 product in the database', (done) => {
        chai.request(server)
        .get('/api/products')
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1);
        done();
        });
    });

    it('should test two values', () => {
        let expectedVal = 10;
        let actualVal = 5;

        expect(actualVal).to.be.equal(expectedVal);
    })
})

