<div class="ff-debugg-404">
  <div class="ff-debugg-404__card" role="alert" aria-live="assertive">
    <div class="ff-debugg-404__title">
      <span class="ff-debugg-404__code">404</span>
      <span class="ff-debugg-404__divider">:</span>
      <span class="ff-debugg-404__label">NOT_FOUND</span>
    </div>
    <div class="ff-debugg-404__body">
      <div class="ff-debugg-404__row">
        <span class="ff-debugg-404__key">Code:</span>
        <code class="ff-debugg-404__mono">나는 디버깅 고수</code>
      </div>
      <div class="ff-debugg-404__row">
        <span class="ff-debugg-404__key">ID:</span>
        <code class="ff-debugg-404__mono">I CAN DO IT</code>
      </div>
    </div>
    <div class="ff-debugg-404__question">
      404 페이지는 왜 떴을까요? 버그를 잡아주세요!
    </div>
  </div>
</div>

<style>
  .ff-debugg-404 {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 24px;
    box-sizing: border-box;
  }
  .ff-debugg-404__card {
    width: 100%;
    max-width: 720px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
    padding: 20px 24px;
  }
  .ff-debugg-404__title {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 12px;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  }
  .ff-debugg-404__code {
    font-weight: 800;
    font-size: 22px;
    color: #dc2626; /* red-600 */
  }
  .ff-debugg-404__divider {
    color: #6b7280; /* gray-500 */
    font-weight: 600;
  }
  .ff-debugg-404__label {
    font-weight: 700;
    color: #111827; /* gray-900 */
    letter-spacing: 0.02em;
  }
  .ff-debugg-404__body {
    display: grid;
    gap: 6px;
    margin: 8px 0 16px;
  }
  .ff-debugg-404__row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .ff-debugg-404__key {
    width: 56px;
    color: #374151; /* gray-700 */
    font-weight: 600;
  }
  .ff-debugg-404__mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    color: #111827; /* gray-900 */
  }
  .ff-debugg-404__actions {
    margin-top: 10px;
  }
  .ff-debugg-404__button {
    display: inline-block;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #c7d2fe; /* indigo-200 */
    background: #eef2ff; /* indigo-50 */
    color: #3730a3; /* indigo-800 */
    text-decoration: none;
    font-weight: 600;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  }
  .ff-debugg-404__button:hover {
    background: #e0e7ff; /* indigo-100 */
    border-color: #a5b4fc; /* indigo-300 */
    color: #312e81; /* indigo-900 */
  }
  @media (prefers-color-scheme: dark) {
    .ff-debugg-404__card {
      background: #0b1020;
      border-color: #1f2937; /* gray-800 */
      box-shadow: none;
    }
    .ff-debugg-404__label { color: #e5e7eb; }
    .ff-debugg-404__divider { color: #9ca3af; }
    .ff-debugg-404__mono {
      background: #0f172a; /* slate-900 */
      border-color: #1f2937;
      color: #e5e7eb;
    }
    .ff-debugg-404__key { color: #d1d5db; }
  }
</style>