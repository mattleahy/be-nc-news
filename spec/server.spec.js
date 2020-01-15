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
        .then(err => {
          expect(err.body.msg).to.equal("Route Not Found");
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
        it("status 200: responds with an article object, which should have the following properties: author, title, article_id, body, topic, created_at, votes, and comment_count", () => {
          return request(server)
            .get("/api/articles/1")
            .expect(200)
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171Z",
                topic: "mitch",
                comment_count: "13"
              };
              expect(response.body).to.be.an("object");
              expect(response.body.article).eql(expectedResult);
            });
        });
        it("Error status 404: returns an error when valid article_id does not exist in database", () => {
          return request(server)
            .get("/api/articles/12765")
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.equal("Article Does Not Exist");
            });
        });
        it("Error status 400 sends an appropriate error message when given an invalid id", () => {
          return request(server)
            .get("/api/articles/not-a-valid-id")
            .expect(400)
            .then(err => {
              expect(err.body.msg).to.equal("Invalid Value");
            });
        });
      });
      describe("PATCH", () => {
        it("status: 200 responds with the updated article with votes incremented when passed a valid inc_votes object", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: 10 })
            .expect(200)
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 110,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171Z",
                topic: "mitch"
              };
              expect(response.body.updatedArticle).to.be.an("object");
              expect(response.body.updatedArticle).to.eql(expectedResult);
            });
        });
        it("status: 200 responds with the updated article with votes decremented when passed a valid inc_votes object", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: -1 })
            .expect(200)
            .then(response => {
              expect(response.body.updatedArticle.votes).to.equal(99);
            });
        });
        it("status: 200 responds with the updated article with votes decremented below 0, when passed a valid inc_votes object", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: -101 })
            .expect(200)
            .then(response => {
              expect(response.body.updatedArticle.votes).to.equal(-1);
            });
        });
        it("status: 200 responds with the original article when not passed inc_votes object", () => {
          return request(server)
            .patch("/api/articles/1")
            .send()
            .expect(200)
            .then(response => {
              expect(response.body.updatedArticle.votes).to.equal(100);
            });
        });
        it("status: 200 and doesn't add keys when there is an additional invalid key entry", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: 10, invalid: "entry" })
            .expect(200)
            .then(response => {
              expect(response.body.updatedArticle).to.have.keys([
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at"
              ]);
            });
        });
        it("Error status: 400 response with invalid inc_votes entry", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: "ten" })
            .expect(400)
            .then(err => {
              expect(err.body.msg).to.equal("Invalid Value");
            });
        });
        it("Error status: 404 when article is not present ", () => {
          return request(server)
            .patch("/api/articles/9090")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.equal("Article Does Not Exist");
            });
        });
      });
    });
    describe("/articles/:article_id/comments", () => {
      describe("POST", () => {
        it("status: 201 accepts an object with properties username and body,and responds with posted comment", () => {
          return request(server)
            .post("/api/articles/2/comments")
            .send({
              username: "icellusedkars",
              body: "This is a great article!"
            })
            .expect(201)
            .then(response => {
              const { comment } = response.body;
              expect(comment).to.have.keys(
                "body",
                "article_id",
                "author",
                "comment_id",
                "created_at",
                "votes"
              );
            });
        });
        it("Error status: 404 response when user/username does not exist", () => {
          return request(server)
            .post("/api/articles/2/comments")
            .send({
              username: "MrMatthew",
              body: "No account for this username!"
            })
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.equal("Target path does not exist");
            });
        });
        it("Error status: 400 response when no username is passed", () => {
          return request(server)
            .post("/api/articles/2/comments")
            .send({ body: "This is my comment!" })
            .expect(400)
            .then(response => {
              const { msg } = response.body;
              expect(msg).to.equal("Key data not input");
            });
        });
        it("Error status: 400 response when post contains no content", () => {
          return request(server)
            .post("/api/articles/2/comments")
            .send({ username: "icellusedkars", body: "" })
            .expect(400)
            .then(err => {
              expect(err.body.msg).to.equal("Invalid post request");
            });
        });
        it("Error status: 404 response when article does not exist", () => {
          return request(server)
            .post("/api/articles/19000/comments")
            .send({
              username: "icellusedkars",
              body: "Fantastico!"
            })
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.equal("Target path does not exist");
            });
        });
      });
      describe.only("GET", () => {
        it("status 200: responds with an array of comments for a given article_id, which has the properties: comment_id, body, created_at, votes, and author", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments[0]).to.include.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
              response.body.comments.forEach(comment => {
                expect(comment).to.be.an("object");
              });
            });
        });
        it("status 200: responds with default sort_by and order when no queries are passed", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.descendingBy("created_at");
            });
        });
        it("status 200: accepts sort_by queries for columns and responds with comments correctly sorted", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=author")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.descendingBy("author");
            });
        });
        it("status 200: accepts sort_by and order queries for columns and responds with comments correctly sorted", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=author&order=asc")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.ascendingBy("author");
            });
        });
        it("status 200: responds with an empty array when passed an article with no comments", () => {
          return request(server)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.have.lengthOf(0);
            });
        });
        it("Error status: 404 response when article does not exist", () => {
          return request(server)
            .get("/api/articles/19000/comments")
            .expect(404)
            .then(err => {
              expect(err.body.msg).to.eql("Article Not Found");
            });
        });
        it("Error status: 400 response when an invalid sort_by value passed to /api/articles/1/comments", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=not-a-column")
            .expect(400)
            .then(err => {
              expect(err.body.msg).to.eql("Bad request");
            });
        });
      });
    });
  });
});
