
const request = require('supertest')
const {Category} = require('../../models/category')
let server;

describe('/api/categories', ()=>{
    beforeEach(()=>{server=require('../../index');})
    afterEach(async()=>{
        server.close();
        await Category.remove({})
    })
    describe('GET /',()=>{
        it('should return all categories', async()=>{
           await Category.collection.insertMany([
            {name:'category1'},
            {name:'category2'}
           ]);
            const res = await request(server).get('/api/categories')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(c=>c.name==='category2')).toBeTruthy();
            
        })
    })
    describe('GET /:id', ()=>{
        it('should return value depending on a given value', async()=>{
            const category = new Category({name: 'category1'});
            await category.save();

            const res = await request(server).get('/api/categories/'+category._id)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', category.name)
        })
        it('should return 404 if invalid ID is passed', async()=>{

            const res = await request(server).get('/api/categories/1')
            expect(res.status).toBe(404);
        })
    })
    describe('POST /', ()=>{
        // it('should return a valid category object if it is correct', async()=>{
        //     category = new Category({name: 'category11'})
        //     await category.save()

        //     const res = await request(server).post('/api/categories')
        //     expect(res.status).toBe(200);
        //     expect(res.body).toHaveProperty('name', category.name)
        // })
        it("should return 401 if client isn't logged in", async()=>{
           const res = await request(server).post('/api/categories').send({name: 'category10'})

           expect(res.status).toBe(401)
        })
    })
})