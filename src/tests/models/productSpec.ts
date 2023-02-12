import { Product, ProductStore } from "../../models/product";
const store = new ProductStore();

describe("Product Model", () => {
  it("Should have an Index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Should have a Show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Should have a Create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Should have an update method", () => {
    expect(store.update).toBeDefined();
  });
  it("Should have a productsByCategory method", () => {
    expect(store.productsByCategory).toBeDefined();
  });
  it("Should have a Delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("Create method should add a product", async () => {
    const result = await store.create({
      name: "Product A",
      price: 20,
      category: "Food",
    } as Product);
    expect(result).toEqual({
      id: 2,
      name: "Product A",
      price: 20,
      category: "Food",
    } as unknown as Product);
  });

  it("Index method should return list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 2,
        name: "Product A",
        price: 20,
        category: "Food",
      },
    ]);
  });

  it("Show method should return the correct product", async () => {
    const result = await store.show("2");
    expect(result).toEqual({
      id: 2,
      name: "Product A",
      price: 20,
      category: "Food",
    });
  });

  it("Update method should return the correct product", async () => {
    const result = await store.update({
      id: "2",
      name: "Product B",
      price: 30,
      category: "Flowers",
    });
    expect(result).toEqual({
      id: 2,
      name: "Product B",
      price: 30,
      category: "Flowers",
    });
  });

  it("ProductsByCategory method should return all products with the given category", async () => {
    const result = await store.productsByCategory("Flowers");
    expect(result).toEqual([
      {
        id: 2,
        name: "Product B",
        price: 30,
        category: "Flowers",
      },
    ]);
  });

  it("Delete method should remove the correct product", async () => {
    await store.delete("2");
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
