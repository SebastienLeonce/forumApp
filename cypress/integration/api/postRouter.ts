import StatusCodes from 'http-status-codes';
import { cookieProps, loginFailedErr, paramMissingError } from '@shared/constants';

describe('postRouter', () => {

    beforeEach(() => {
        cy.task('db:seed')
        cy.login();
    })

    after(() => {
        cy.task('db:seed')
    })

    const apiUrl = 'http://localhost:3000';
    const postsPath = `${apiUrl}/api/posts`;
    const getPath = `${postsPath}/all`;
    const getOne = `${postsPath}`;
    const updatePath = `${postsPath}/update`;
    const deletePath = `${postsPath}/delete`;
    const addPath = `${postsPath}/add`;
    const { BAD_REQUEST, OK, CREATED } = StatusCodes;    

    describe(`"GET - ${getPath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request('GET', getPath)
                .should((res : any) => {
                    expect(res.status).equal(OK);
                    done();
                });
        });
    });

    describe(`"GET - ${getOne}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request('GET', `${getOne}/356537875835`)
                .should((res : any) => {
                    expect(res.status).equal(OK);
                    done();
                });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request( {
                method: 'GET',
                url: `${getOne}/356588875835`,
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });

    describe(`"PUT - ${updatePath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request('PUT', updatePath, {
                post : {
                    "title":"ggg",
                    "author": "fdfsf",
                    "content": "fdsfs",
                    "id": 356537875835
                }
            }).should((res : any) => {
                expect(res.status).equal(OK);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request({
                method: 'PUT', 
                url: updatePath, 
                body: {
                    post : {
                        title:"unknown",
                        author:"unknown@gmail.com",
                        content:"hash",
                        id:13231321
                    }
                },
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request({
                method: 'PUT', 
                url: updatePath, 
                body: {},
                failOnStatusCode: false
            }).should((res) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });

    describe(`"DELETE - ${deletePath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request({
                method: 'DELETE',
                url: `${deletePath}/356537875835`,
            }).should((res : any) => {
                expect(res.status).equal(OK);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request({
                method: 'DELETE',
                url: `${deletePath}/3577875835`,
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });

    describe(`"POST - ${addPath}"`, () => {
        it(`should return a response with a status of "${CREATED}".`, (done) => {
            cy.request('POST', addPath, {
                post : {
                    title:"Test",
                    author:"testl@gmail.com",
                    content:"$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy",
                }
            }).should((res : any) => {
                expect(res.status).equal(CREATED);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request({
                method: 'POST', 
                url: addPath,
                body: {},
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });
});
