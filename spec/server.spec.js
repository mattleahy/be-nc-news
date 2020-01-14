process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("sams-chai-sorted");
chai.use(chaiSorted);

const connection = require("../db/connection");
const request = require("supertest");
const server = require("../server");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe.only("/topics", () => {
    describe("GET", () => {
      it("GET: 200 responds with an array of topic objects, which has slug and description properties", () => {
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
});
