const { followUser } = require("../../controllers/user-controller");
const User = require("../../models/User");

jest.mock("../../models/User");

describe("Test user following methods", () => {
  const response = {};
  response.status = jest.fn().mockReturnValue(response);
  response.send = jest.fn().mockReturnValue(response);

  it("Should return a 200 status and followed message", async () => {
    const request = {
      params: {
        id: "1",
      },
      session: {
        user: {
          _id: "2",
        },
      },
    };

    User.findById.mockImplementationOnce(() => ({
      _id: "2",
      email: "test2@gmail.com",
      password: "password",
      firstName: "Test",
      lastName: "Hello",
      role: "user",
      favorites: [],
      following: ["3", "4", "5"],
      save: jest.fn(),
    }));

    await followUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      message: "User successfully followed",
      success: true,
    });
  });

  it("Should return a 200 status and an unfollowed message", async () => {
    const request = {
      params: {
        id: "1",
      },
      session: {
        user: {
          _id: "2",
        },
      },
    };

    User.findById.mockImplementationOnce(() => ({
      _id: "2",
      email: "test2@gmail.com",
      password: "password",
      firstName: "Test",
      lastName: "Hello",
      role: "user",
      favorites: [],
      following: ["3", "4", "5", "1"],
      save: jest.fn(),
    }));

    await followUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      message: "User successfully unfollowed",
      success: true,
    });
  });

  it("Should return a 401 status when there is no session id", async () => {
    const request = {
      params: {
        id: "1",
      },
      session: {
        user: {
          _id: undefined,
        },
      },
    };

    await followUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledWith({
      message: "User not logged in",
      success: false,
    });
  });

  it("Should return a 400 status when the user being followed does not exist", async () => {
    const request = {
      params: {
        id: "1",
      },
      session: {
        user: {
          _id: "2",
        },
      },
    };

    User.findById.mockImplementationOnce(() => ({
      _id: "2",
      email: "test2@gmail.com",
      password: "password",
      firstName: "Test",
      lastName: "Hello",
      role: "user",
      favorites: [],
      following: ["3", "4", "5", "1"],
      save: jest.fn(),
    }));

    User.findById.mockImplementationOnce(() =>
      Promise.reject("User not found")
    );

    await followUser(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({
      // eslint-disable-next-line quotes
      message: "User not found",
      success: false,
    });
  });

  it("following list should still be the same when sorted no matter where the id was appended", async () => {
    const request = {
      params: {
        id: "7",
      },
      session: {
        user: {
          _id: "2",
        },
      },
    };
    const expected = ["3", "4", "5"];

    User.findById.mockImplementationOnce(() => ({
      _id: "2",
      email: "test2@gmail.com",
      password: "password",
      firstName: "Test",
      lastName: "Hello",
      role: "user",
      favorites: [],
      following: ["3", "4", "5"],
      save: jest.fn(),
    }));

    await followUser(request, response);

    expected.unshift("7");
    expected.sort();

    // the user object adds the id at the end of the array
    request.session.user.following.sort();

    expect(request.session.user.following.toString()).toEqual(
      expected.toString()
    );
  });

  it("following list should still be the same when sorted when an item is removed", async () => {
    const request = {
      params: {
        id: "7",
      },
      session: {
        user: {
          _id: "2",
        },
      },
    };
    let expected = ["7", "4", "3", "5"];

    User.findById.mockImplementationOnce(() => ({
      _id: "2",
      email: "test2@gmail.com",
      password: "password",
      firstName: "Test",
      lastName: "Hello",
      role: "user",
      favorites: [],
      following: ["3", "4", "5", "7"],
      save: jest.fn(),
    }));

    await followUser(request, response);

    expected = expected.filter((item) => "7" !== item);
    expected.sort();

    request.session.user.following.sort();

    expect(request.session.user.following.toString()).toEqual(
      expected.toString()
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
