// Question 8 (Advanced): Utility Types
// Use TypeScript's built-in utility types to transform and manipulate types.
// Learn Partial, Required, Readonly, Pick, Omit, Record, and more.

// Solution:

// Base interface for examples
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// 1. Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;

function updateUser(id: number, updates: PartialUser): void {
  console.log(`Updating user ${id} with:`, updates);
}

updateUser(1, { name: "Alice" });           // OK - only name
updateUser(2, { email: "bob@example.com", age: 30 });  // OK - email and age

// 2. Required<T> - Makes all properties required
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;

const user: RequiredUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
  // All properties are now required
};

// 3. Readonly<T> - Makes all properties read-only
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "Bob",
  email: "bob@example.com",
  age: 30,
  isActive: true
};

// readonlyUser.name = "Charlie"; // Error: Cannot assign to 'name' because it is read-only

// 4. Pick<T, K> - Select specific properties
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "Alice"
  // Only id and name are required
};

function displayUserPreview(user: UserPreview): void {
  console.log(`User #${user.id}: ${user.name}`);
}

displayUserPreview(preview);

// 5. Omit<T, K> - Exclude specific properties
type UserWithoutEmail = Omit<User, "email">;

const userNoEmail: UserWithoutEmail = {
  id: 1,
  name: "Charlie",
  age: 25,
  isActive: true
  // email is excluded
};

// 6. Record<K, T> - Create object type with specific keys and value type
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log("Admin permissions:", permissions.admin);

// Record with string keys
type UserDictionary = Record<string, User>;

const users: UserDictionary = {
  "user1": { id: 1, name: "Alice", email: "alice@example.com", age: 30, isActive: true },
  "user2": { id: 2, name: "Bob", email: "bob@example.com", age: 25, isActive: false }
};

// 7. Exclude<T, U> - Exclude types from union
type AllStatus = "pending" | "approved" | "rejected" | "draft";
type ActiveStatus = Exclude<AllStatus, "draft">;

const status: ActiveStatus = "approved";  // OK
// const status2: ActiveStatus = "draft"; // Error

// 8. Extract<T, U> - Extract types from union
type StringOrNumber = string | number | boolean;
type OnlyStringOrNumber = Extract<StringOrNumber, string | number>;

const value: OnlyStringOrNumber = "hello";  // OK
const value2: OnlyStringOrNumber = 42;      // OK
// const value3: OnlyStringOrNumber = true; // Error

// 9. NonNullable<T> - Remove null and undefined
type NullableString = string | null | undefined;
type NonNullString = NonNullable<NullableString>;

const str: NonNullString = "hello";  // OK
// const str2: NonNullString = null; // Error

// 10. ReturnType<T> - Extract function return type
function createUser(name: string, email: string) {
  return {
    id: Math.random(),
    name,
    email,
    createdAt: new Date()
  };
}

type CreatedUser = ReturnType<typeof createUser>;

const newUser: CreatedUser = createUser("Alice", "alice@example.com");
console.log("Created user:", newUser);

// 11. Parameters<T> - Extract function parameter types
function greet(name: string, age: number, greeting: string = "Hello"): string {
  return `${greeting}, ${name}! You are ${age} years old.`;
}

type GreetParams = Parameters<typeof greet>;
// Type: [name: string, age: number, greeting?: string]

const params: GreetParams = ["Alice", 30, "Hi"];
console.log(greet(...params));

// 12. ConstructorParameters<T> - Extract constructor parameter types
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonConstructorParams = ConstructorParameters<typeof Person>;
// Type: [name: string, age: number]

const personParams: PersonConstructorParams = ["Bob", 25];
const person = new Person(...personParams);

// 13. InstanceType<T> - Extract instance type from constructor
type PersonInstance = InstanceType<typeof Person>;

const anotherPerson: PersonInstance = new Person("Charlie", 30);

// Combining utility types
type UpdateUserDTO = Partial<Omit<User, "id">>;

function patchUser(id: number, updates: UpdateUserDTO): void {
  console.log(`Patching user ${id}:`, updates);
}

patchUser(1, { name: "Updated Name" });
patchUser(2, { age: 31, isActive: false });

// Advanced: Creating custom utility types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

type NullableUser = Nullable<User>;
type OptionalUser2 = Optional<User>;
type MaybeUser = Maybe<User>;

// Deep partial (recursive)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Company {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  employees: {
    count: number;
    roles: string[];
  };
}

type PartialCompany = DeepPartial<Company>;

const company: PartialCompany = {
  name: "Tech Corp",
  address: {
    city: "San Francisco"
    // street and country are optional
  }
  // employees is optional
};

// Practical example: API Response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserApiResponse = ApiResponse<User>;
type UsersApiResponse = ApiResponse<User[]>;

function handleUserResponse(response: UserApiResponse): void {
  console.log(`Status: ${response.status}`);
  console.log(`User: ${response.data.name}`);
}

// Type transformation example
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

type ImmutableUser = ReadonlyDeep<User>;

const immutableUser: ImmutableUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  isActive: true
};

// immutableUser.name = "Bob"; // Error: read-only
