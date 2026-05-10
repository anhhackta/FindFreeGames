import test from "node:test";
import assert from "node:assert/strict";
import { filterGames } from "../js/filters.js";

const sample = [
  { id: "a", finalPrice: 0, discountPercent: 100 },
  { id: "b", finalPrice: 4.99, discountPercent: 90 },
  { id: "c", finalPrice: 8.99, discountPercent: 70 },
  { id: "d", finalPrice: 12.99, discountPercent: 20 },
];

test("filter free returns only free games", () => {
  const result = filterGames(sample, "free");
  assert.deepEqual(
    result.map((item) => item.id),
    ["a"],
  );
});

test("filter gt80 returns discounts greater than 80", () => {
  const result = filterGames(sample, "gt80");
  assert.deepEqual(
    result.map((item) => item.id),
    ["a", "b"],
  );
});

test("filter gt60 returns discounts greater than 60", () => {
  const result = filterGames(sample, "gt60");
  assert.deepEqual(
    result.map((item) => item.id),
    ["a", "b", "c"],
  );
});

test("filter best sorts by discount desc", () => {
  const result = filterGames(sample, "best");
  assert.deepEqual(
    result.map((item) => item.id),
    ["a", "b", "c", "d"],
  );
});
