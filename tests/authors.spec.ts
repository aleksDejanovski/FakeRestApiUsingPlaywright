import { test, expect } from "@playwright/test";
import authors from "./dataSet/authors.json";

test("get all authors", async ({ request }) => {
  const response = await request.get("/api/v1/Authors");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject[0].firstName).toBe("First Name 1");
  expect(responseObject[0].firstName).not.toBe("First Name 3");
  expect(responseObject[3].idBook).toBe(2);
  expect(responseObject.length).toBeGreaterThan(30);
});

test("get ids for given author", async ({ request }) => {
  const response = await request.get("api/v1/Authors/authors/books/3");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.length).toBeGreaterThan(1);
});

test("create new author", async ({ request }) => {
  const response = await request.post("/api/v1/Authors", {
    data: {
      id: 44,
      idBook: 44,
      firstName: "Aleks",
      lastName: "Dankovic",
    },
  });
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(44);
  expect(responseObject.firstName).toBe("Aleks");
  expect(responseObject.lastName).toBe("Dankovic");
});

authors.forEach((author) => {
  test(`create new author using ${author.firstName}`, async ({ request }) => {
    const response = await request.post("/api/v1/Authors", {
      data: author,
    });

    expect(response.status()).toBe(200);
  });
});

test("deleve specific author", async ({ request }) => {
  const response = await request.delete("api/v1/Authors/55");
  expect(response.status()).toBe(200);
});
