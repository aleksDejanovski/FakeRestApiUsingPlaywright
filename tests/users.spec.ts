import { test, expect } from "@playwright/test";
import { request } from "node:http";

test("get all users", async ({ request }) => {
  const response = await request.get("/api/v1/Users");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.length).toBeGreaterThan(6);
  expect(responseObject[0].id).toBe(1);
  expect(responseObject[1].userName).toBe("User 2");
  expect(responseObject[5].password).toBe("Password6");
});

test("get given valid user", async ({ request }) => {
  const response = await request.get("/api/v1/Users/2");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(2);
  expect(responseObject.userName).toBe("User 2");
});

test("get user that is not there - expect 404", async ({ request }) => {
  const response = await request.get("/api/v1/Users/555");
  const responseObject = await response.json();
  expect(responseObject.title).toBe("Not Found");
  expect(response.status()).toBe(404);
});

test("create new user", async ({ request }) => {
  const response = await request.post("/api/v1/Users", {
    data: {
      id: 445,
      userName: "user 445",
      password: "pass 445 ",
    },
  });
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.userName).toBe("user 445");
  expect(responseObject.password).toBe("pass 445 ");
});

test("update specific a user", async ({ request }) => {
  const response = await request.put("/api/v1/Users/66", {
    data: {
      id: 333,
      userName: "new user 12",
      password: "hidden password 12",
    },
  });
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(333);
  expect(responseObject.userName).toBe("new user 12");
  expect(responseObject.password).toBe("hidden password 12");
});
