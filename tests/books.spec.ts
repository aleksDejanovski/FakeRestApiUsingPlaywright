import { test, expect } from "@playwright/test";
import { request } from "node:http";
import books from "./dataSet/books.json";

test("get all books", async ({ request }) => {
  const response = await request.get("/api/v1/Books");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.length).toBeGreaterThan(17);
  expect(responseObject[0].id).toBe(1);
  expect(responseObject[1].title).toBe("Book 2");
});

test("get specific book and check response data", async ({ request }) => {
  const response = await request.get("/api/v1/Books/44");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(44);
  expect(responseObject.title).toBe("Book 44");
  expect(responseObject.pageCount).toBe(4400);
});

test("create new book resourse and check response", async ({ request }) => {
  const response = await request.post("/api/v1/Books", {
    data: {
      id: 4445,
      title: "aaa",
      description: "qqq",
    },
  });
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(4445);
  expect(responseObject.title).toBe("aaa");
  expect(responseObject.pageCount).toBe(0);
  expect(responseObject.description).toBe("qqq");
});

books.forEach((book) => {
  test(`create new book using ${book.id}`, async ({ request }) => {
    const response = await request.post("/api/v1/Books", {
      data: book,
    });
    const responseObject = await response.json();
    expect(response.status()).toBe(200);
    expect(responseObject.id).toBe(book.id);
  });
});

test("update specific book resource", async ({ request }) => {
  const response = await request.put("/api/v1/Books/66", {
    data: {
      id: 666,
      title: "udated Book 66",
      description: "we updated the book 66 to new book 666",
    },
  });
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.id).toBe(666);
  expect(responseObject.title).toBe("udated Book 66");
  expect(responseObject.description).toBe(
    "we updated the book 66 to new book 666",
  );
});
