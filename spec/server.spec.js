process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("sams-chai-sorted");
chai.use(chaiSorted);

const connection = require("../db/connection");
const request = require("supertest");
const server = require("../server");

describe.only("/SERVER", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });

  describe("/api", () => {
    it(" Error status: 404 response when a bad path is provided", () => {
      return request(server)
        .get("/api/not-a-route")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Route Not Found");
        });
    });
    describe("/topics", () => {
      describe("GET", () => {
        it("status: 200 responds with an array of topic objects, which has slug and description properties", () => {
          return request(server)
            .get("/api/topics")
            .expect(200)
            .then(topics => {
              expect(topics.body).to.have.keys("topics");
              topics.body.topics.forEach(topic => {
                expect(topic).to.have.keys(["slug", "description"]);
              });
            });
        });
      });
    });

    describe("/users/:username", () => {
      describe("GET", () => {
        it("status: 200 responds with a user object each with properties of username, avatar_url and name", () => {
          return request(server)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(user => {
              expect(user.body).to.eql({
                user: [
                  {
                    username: "butter_bridge",
                    name: "jonny",
                    avatar_url:
                      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
                  }
                ]
              });
            });
        });
        it("Error status 404: returns an error when user is not in database", () => {
          return request(server)
            .get("/api/users/MrMatthew")
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.equal("User Not Found");
            });
        });
      });
    });

    describe("/articles/:article_id", () => {
      describe("GET", () => {
        it("", () => {});
      });
    });
  });
});
