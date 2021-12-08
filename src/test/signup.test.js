const signup = require('./signup');

const user1 = {
    name: "User1",
    email: "user1.com",
    password: "User1234"
}

const user2 = {
    name: "User2",
    email: "user2@user2.com",
    password: "User1234"
}

const user3 = {
    name: "User2",
    email: "user3@user3.com",
    password: "user"
}

describe("Validating a user trying to login", function(){
    it("user with invalid email", function(){
        expect(signup(user1)).toBeFalsy();
    })

    it("Valid user", function(){
        expect(signup(user2)).toBeTruthy();
    })

    it("user with invalid password", function(){
        expect(signup(user3)).toBeFalsy();
    })
})

