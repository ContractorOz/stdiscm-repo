const request = require("supertest");
const { app } = require("../../app");
const db = require("../../config/test-db");
const session = require("supertest-session");

let testSession;

describe("User management tests", () => {
  let authenticatedSession;

  beforeAll(async () => {
    await db.connect();
    await db.populateDatabase();
  });

  beforeAll((done) => {
    testSession = session(app);
    testSession
      .post("/users/login")
      .send({ email: "tyrone_stamaria@dlsu.edu.ph", password: "123456" })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  afterAll(async () => {
    await db.clearDatabase();
    return await db.closeDatabase();
  });

  it("PUT /moderator/edit/u/:id/done Successfully edit the first name of an existing user", async () => {
    const initialUser = await db.getUser("tyrone.stamaria35@gmail.com");
    const id = initialUser._id.toString();

    const res = await request(app)
      .put(`/moderator/edit/u/${id}/done`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ ...initialUser, firstName: "Justin" });

    const editedUser = await db.getUser("tyrone.stamaria35@gmail.com");
    expect(initialUser.firstName).not.toEqual(editedUser.firstName);
    expect(res._body.success).toEqual(true);
  });

  it("PUT /moderator/edit/u/:id/done Throws an error when editing the first name of a non-existing user", async () => {
    const initialUser = await db.getUser("tyrone@gmail.com");
    const id = initialUser?._id.toString() ?? "xxx";

    const res = await request(app)
      .put(`/moderator/edit/u/${id}/done`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ ...initialUser, firstName: "Justin" });

    expect(res._body.success).toEqual(false);
    expect(res._body.errors[0].msg).toEqual(
      "There seems to be an error in editing the user"
    );
  });

  it("DELETE /moderator/delete/user/:id Successfully deletes existing user", async () => {
    const user = await db.getUser("tyrone.stamaria35@gmail.com");
    const id = user._id.toString();
    const res = await request(app)
      .delete(`/moderator/delete/user/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .redirects(0);

    expect(res.headers.location).toEqual("/moderator/users/list");
  });

  it("PUT /moderator/suspend/u/:id Successfully suspend a user", async () => {
    const user = await db.getUser("wilfredgo@gmail.com");
    const id = user._id.toString();
    const res = await request(app)
      .put(`/moderator/suspend/u/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .redirects(0);

    const suspendedUser = await db.getUser("wilfredgo@gmail.com");
    expect(suspendedUser.suspended).toEqual(true);
    expect(res.headers.location).toEqual(`/moderator/edit/u/${id}`);
  });
});
