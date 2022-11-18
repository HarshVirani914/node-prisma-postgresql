import * as user from '../user';

describe("User handler", () => {
    it("should return a user", async () => {
        const req = { body: { username: "hello", password: "hi" } };
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            }
        };
        await user.createUser(req, res, () => { });
    });
});

