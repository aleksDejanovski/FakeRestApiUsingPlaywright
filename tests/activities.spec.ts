import { test, expect } from "@playwright/test";

test("get all activities", async ({ request }) => {
  const response = await request.get("/api/v1/Activities");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject[0].title).toBe("Activity 1");
  expect(responseObject.length).toBeLessThanOrEqual(30);
});

test("get given activity", async ({ request }) => {
  const response = await request.get("/api/v1/Activities/14");
  const responseObject = await response.json();
  expect(response.status()).toBe(200);
  expect(responseObject.title).toBe("Activity 14");
  expect(responseObject.completed).toBe(true);
});
