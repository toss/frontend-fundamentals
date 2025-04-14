# Managing Unique Names

<div style="margin-top: 16px">
<Badge type="info" text="Predictability" />
</div>
Functions or variables with the same name should have the same behavior. Small differences in behavior can reduce the predictability of the code and confuse the reader.

## 📝 Code Example

In a frontend service, a new module was created to send HTTP requests in a new way by wrapping the original HTTP library.
Coincidentally, both the original HTTP library and the newly created HTTP module are named `http`.

::: code-group

```typescript [http.ts]
// This service uses a library called `@some-library/http`
import { http as httpLibrary } from "@some-library/http";

export const http = {
  async get(url: string) {
    const token = await fetchToken();

    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```typescript [fetchUser.ts]
// Code that imports http defined in http.ts
import { http } from "./http";

export async function fetchUser() {
  return http.get("...");
}
```

:::

## 👃 Smell the Code

### Predictability

This code is functionally correct but can confuse the reader. A developer calling `http.get` might expect it to simply send a GET request as the original HTTP library does, but in reality, it performs additional tasks like fetching a token.

This misunderstanding can lead to discrepancies between expected and actual behavior, causing bugs or making the debugging process complex and confusing.

## ✏️ Work on Improving

You can make the function's behavior more predictable by using a distinct name that differentiates the service-created function from the library's function.

::: code-group

```typescript [httpService.ts]
// This service uses a library called `@some-library/http`
import { http as httpLibrary } from "@some-library/http";
// Changed the name to distinguish it from the library function.
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();

    // Add authentication logic such as adding the token to the header.
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```typescript [fetchUser.ts]
// Code that imports httpService defined in httpService.ts
import { httpService } from "./httpService";

export async function fetchUser() {
  // The function name indicates that this function sends an authenticated request.
  return await httpService.getWithAuth("...");
}
```

:::

This way, you can reduce the chance of misunderstanding the function's behavior by its name.
Other developers will recognize that this function is defined by the service and use it correctly.

Also, the name `getWithAuth` clearly indicates that this function sends an authenticated request.
