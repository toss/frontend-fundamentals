import React from "react";

export default function OauthTestPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const validTossBusinessAccount = await checkBusinessAccountValidity({
      email,
      password
    });
    alert(JSON.stringify({ validTossBusinessAccount }));
    if (validTossBusinessAccount) {
      submitBusinessAccountLoginStartForm({ email, password });
      return;
    }
    alert("토비 회원이 아니예요.");
  };
  return (
    <div>
      <h1>OauthTestPage</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

async function checkBusinessAccountValidity(payload: {
  email: string;
  password: string;
}) {
  try {
    const result = await tossResponseFetcher(
      `https://alpha-business-accounts.toss.im/migrate/match-account`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return result;
  } catch {
    return { match: false };
  }
}

async function submitBusinessAccountLoginStartForm(data: {
  email: string;
  password: string;
}) {
  const clientId = "aq1mox5ase1xppzeaqumdo4p3ml78ux9"; // ads
  const redirectUri =
    "https://shopping-merchant-alpha-api.toss.im/api-public/v3/shopping-merchant/toss-business/oauth/callback";
  const failureUri =
    "https://shopping-merchant-alpha-api.toss.im/api-public/v3/shopping-merchant/toss-business/oauth/callback";
  submitForm(
    `https://alpha-business-accounts.toss.im/v1/sign-in?
      client_id=${clientId}&
      redirect_uri=${redirectUri}&
      failure_uri=${failureUri}`,
    data
  );
}

function submitForm(url: string, payload: Record<string, any>) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = url;

  for (const [key, value] of Object.entries(payload)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();

  document.body.removeChild(form);
}

async function tossResponseFetcher<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const res = await fetch(url, { ...options, credentials: "include" });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();

  if (data.error) {
    throw new Error(`${data.error.errorCode}: ${data.error.reason}`);
  }
  return data.success as T;
}
