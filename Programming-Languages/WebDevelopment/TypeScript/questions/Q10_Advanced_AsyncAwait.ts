// Question 10 (Advanced): Async/Await with TypeScript and Promise Handling
// Work with asynchronous code using Promises, async/await, and proper error handling.
// Build a type-safe API client with async operations.

// Solution:

// 1. Basic Promise usage
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function basicAsync(): Promise<void> {
  console.log("Starting...");
  await delay(1000);
  console.log("Done after 1 second!");
}

// 2. Typed Promises
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({
          id,
          name: `User ${id}`,
          email: `user${id}@example.com`
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

async function getUser(id: number): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log("User:", user);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

// 3. Generic API Response Type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface ApiError {
  status: number;
  message: string;
}

// 4. Type-Safe API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        message: "Success"
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        message: "Success"
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message
      };
    }
    return {
      status: 500,
      message: "Unknown error occurred"
    };
  }
}

// 5. Parallel async operations
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}

async function demonstrateParallel(): Promise<void> {
  console.log("\n=== Parallel Requests ===");
  const start = Date.now();
  
  const users = await fetchMultipleUsers([1, 2, 3]);
  
  const end = Date.now();
  console.log("Users:", users);
  console.log(`Fetched ${users.length} users in ${end - start}ms`);
}

// 6. Sequential async operations
async function fetchUsersSequentially(ids: number[]): Promise<User[]> {
  const users: User[] = [];
  
  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }
  
  return users;
}

// 7. Promise.race example
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

async function demonstrateTimeout(): Promise<void> {
  console.log("\n=== Timeout Example ===");
  try {
    const user = await fetchWithTimeout(fetchUser(1), 500);
    console.log("User fetched:", user);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

// 8. Async Generator
async function* generateNumbers(max: number): AsyncGenerator<number> {
  for (let i = 1; i <= max; i++) {
    await delay(100);
    yield i;
  }
}

async function demonstrateAsyncGenerator(): Promise<void> {
  console.log("\n=== Async Generator ===");
  for await (const num of generateNumbers(5)) {
    console.log("Generated:", num);
  }
}

// 9. Error handling patterns
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safelyFetchUser(id: number): Promise<Result<User>> {
  try {
    const user = await fetchUser(id);
    return { success: true, data: user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error("Unknown error")
    };
  }
}

async function demonstrateSafeError(): Promise<void> {
  console.log("\n=== Safe Error Handling ===");
  
  const result = await safelyFetchUser(1);
  
  if (result.success) {
    console.log("User data:", result.data);
  } else {
    console.error("Error occurred:", result.error.message);
  }
}

// 10. Retry logic
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${attempt} failed`);
      
      if (attempt === maxAttempts) {
        throw error;
      }
      
      await delay(delayMs);
    }
  }
  
  throw new Error("Max attempts reached");
}

async function demonstrateRetry(): Promise<void> {
  console.log("\n=== Retry Logic ===");
  
  let attempts = 0;
  const unreliableFunction = async (): Promise<string> => {
    attempts++;
    if (attempts < 3) {
      throw new Error("Temporary failure");
    }
    return "Success!";
  };

  try {
    const result = await retry(unreliableFunction, 5, 500);
    console.log("Result:", result);
  } catch (error) {
    console.error("Failed after retries:", (error as Error).message);
  }
}

// 11. Promise chaining vs async/await
function demonstrateChaining(): void {
  console.log("\n=== Promise Chaining ===");
  
  fetchUser(1)
    .then(user => {
      console.log("Fetched user:", user);
      return fetchUser(2);
    })
    .then(user => {
      console.log("Fetched another user:", user);
    })
    .catch(error => {
      console.error("Error in chain:", error.message);
    });
}

async function demonstrateAsyncAwait(): Promise<void> {
  console.log("\n=== Async/Await ===");
  
  try {
    const user1 = await fetchUser(1);
    console.log("Fetched user:", user1);
    
    const user2 = await fetchUser(2);
    console.log("Fetched another user:", user2);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

// 12. Combining multiple async operations
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UserWithPosts {
  user: User;
  posts: Post[];
}

async function fetchUserWithPosts(userId: number): Promise<UserWithPosts> {
  // Simulated API calls
  const fetchPosts = async (userId: number): Promise<Post[]> => {
    await delay(500);
    return [
      { id: 1, userId, title: "Post 1", body: "Content 1" },
      { id: 2, userId, title: "Post 2", body: "Content 2" }
    ];
  };

  // Fetch user and posts in parallel
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId)
  ]);

  return { user, posts };
}

async function demonstrateCombined(): Promise<void> {
  console.log("\n=== Combined Operations ===");
  
  const userWithPosts = await fetchUserWithPosts(1);
  console.log("User:", userWithPosts.user.name);
  console.log("Posts:", userWithPosts.posts.length);
}

// 13. Debouncing with async
function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delayMs);
    });
  };
}

const debouncedFetch = debounce(fetchUser, 500);

// Main execution
async function main(): Promise<void> {
  console.log("=== TypeScript Async/Await Examples ===\n");

  await basicAsync();
  await getUser(1);
  await demonstrateParallel();
  await demonstrateTimeout();
  await demonstrateAsyncGenerator();
  await demonstrateSafeError();
  await demonstrateRetry();
  demonstrateChaining();
  await demonstrateAsyncAwait();
  await demonstrateCombined();

  console.log("\n=== All examples completed ===");
}

// Uncomment to run
// main().catch(console.error);

export { ApiClient, fetchUser, retry, Result, UserWithPosts };
