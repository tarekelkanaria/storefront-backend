import { User, UserStore } from "../../models/user";
const store = new UserStore();

describe("User Model", () => {
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
  it("Should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
  it("Should have a Delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("Create method should add a user", async () => {
    const result = await store.create({
      first_name: "John",
      last_name: "Doe",
      password_digest: "123456789",
    } as User);
    expect(result.first_name).toEqual("John");
    expect(result.last_name).toEqual("Doe");
  });
  it("Index method should return list of users", async () => {
    const result = await store.index();
    expect(result[2].first_name).toEqual("John");
    expect(result[2].last_name).toEqual("Doe");
  });

  it("Show method should return the correct user", async () => {
    const result = await store.show("4");
    expect(result.first_name).toEqual("John");
    expect(result.last_name).toEqual("Doe");
  });

  it("Update method should return the correct user", async () => {
    const result = await store.update({
      id: "4",
      first_name: "Johny",
      last_name: "Cash",
      password_digest: "123456789",
    });
    expect(result.first_name).toEqual("Johny");
    expect(result.last_name).toEqual("Cash");
  });

  it("Authenticate method should return user ", async () => {
    const result = await store.authenticate("Johny", "123456789");
    expect(result).toBeTruthy();
  });

  it("Delete method should remove the correct user", async () => {
    await store.delete("4");
    const result = await store.index();
    expect(result.length).toEqual(2);
  });
});
