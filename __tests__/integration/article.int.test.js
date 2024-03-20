const request = require("supertest");
const { app } = require("../../app");
const db = require("../../config/test-db");
const session = require("supertest-session");

let testSession;

describe("Upvote and downvote tests", () => {
  let authenticatedSession;

  beforeAll(async () => {
    await db.connect();
    await db.populateDatabase();
  });

  beforeAll((done) => {
    testSession = session(app);
    testSession
      .post("/users/login")
      .send({ email: "tyrone.stamaria35@gmail.com", password: "123456" })
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

  it("PUT /articles/toggle-votes/:id an article is successfully upvoted", async () => {
    const article = await db.getArticle();
    const id = article._id.toString();
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ method: "upvote" });

    expect(res._body.success).toEqual(true);
    expect(res._body.upvotes).toEqual(1);
    expect(res._body.downvotes).toEqual(0);
  });

  it("PUT /articles/toggle-votes/:id an article is successfully downvoted", async () => {
    const article = await db.getArticle();
    const id = article._id.toString();
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ method: "downvote" });

    expect(res._body.success).toEqual(true);
    expect(res._body.upvotes).toEqual(0);
    expect(res._body.downvotes).toEqual(1);
  });

  it("PUT /articles/toggle-votes/:id upvoting a non-existing article fails", async () => {
    const id = "XXXX";
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ method: "upvote" });

    expect(res._body.success).toEqual(false);
    expect(res._body.upvotes).toEqual(null);
    expect(res._body.downvotes).toEqual(null);
  });

  it("PUT /articles/toggle-votes/:id downvoting a non-existing article fails", async () => {
    const id = "XXXX";
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + authenticatedSession.cookies[0].value])
      .send({ method: "downvote" });

    expect(res._body.success).toEqual(false);
    expect(res._body.upvotes).toEqual(null);
    expect(res._body.downvotes).toEqual(null);
  });

  it("PUT /articles/toggle-votes/:id upvoting when not logged in fails", async () => {
    const article = await db.getArticle();
    const id = article._id.toString();
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + "XXX"])
      .send({ method: "upvote" });

    expect(res._body.success).toEqual(false);
    expect(res._body.upvotes).toEqual(null);
    expect(res._body.downvotes).toEqual(null);
  });

  it("PUT /articles/toggle-votes/:id downvoting when not logged in fails", async () => {
    const article = await db.getArticle();
    const id = article._id.toString();
    const res = await request(app)
      .put(`/articles/toggle-vote/${id}`)
      .set("Cookie", ["connect.sid=" + "XXX"])
      .send({ method: "downvote" });

    expect(res._body.success).toEqual(false);
    expect(res._body.upvotes).toEqual(null);
    expect(res._body.downvotes).toEqual(null);
  });
});
