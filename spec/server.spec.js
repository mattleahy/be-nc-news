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
  describe("GET", () => {
    it("", () => {});
  });
});
