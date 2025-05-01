# Naming Complex Conditions

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>

When complex conditions are used without specific names, it is difficult to understand what the condition means at a glance.

## 📝 Code Example

The following code filters products that match the category and price range.

```typescript
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some(
        (price) => price >= minPrice && price <= maxPrice
      )
  )
);
```

## 👃 Smell the Code

### Readability

In this code, anonymous functions and conditions are intricately intertwined. The logic involving `filter`, `some`, and `&&` is nested in multiple layers, making it difficult to understand the exact conditions.

There are many contexts for the reader to consider at once, which reduces readability. [^1]

[^1]: According to [The Programmer's Brain](https://www.amazon.com/Programmers-Brain-Every-Programmer-Cognition/dp/B09NDVG2DW/ref=sr_1_1?crid=9GGEWPMGSL8Y&dib=eyJ2IjoiMSJ9.AF5Dcf0-L-uK6TtJShyWO_10--nMWYYt347wx3dfFsot6wGbgpz_Mn5XMp9Yv-Dok-XO31xYrb3qcx4VHzmvgH2WwCwpwPSGcfleagpa3sw78VkagAXyim4LIjFL9VTTWZemu1tTng4B6rtuPrrOveuu77Eme6QUtqqaTe6Q9vHejb4QwlvkhMBL1-9f6ixQBnvYmqlgZeeB09xB5ottOCf79StZNty_Z70W876zMSg.oDUVogfe2uXKb3VZqJAvyqrmLnE8o9zJSs7gfNNfdwA&dib_tag=se&keywords=The+Programmer%27s+Brain%3A&qid=1738067574&s=books&sprefix=the+programmer%27s+brain+%2Cstripbooks-intl-ship%2C236&sr=1-1), the number of pieces of information that the human brain can store at one time is six.

## ✏️ Work on Improving

By giving explicit names to conditions as in the following code, you can reduce the context that the reader has to consider at once.

```typescript
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some(
      (price) => price >= minPrice && price <= maxPrice
    );

    return isSameCategory && isPriceInRange;
  });
});
```

By explicitly stating that products are filtered based on being in the same category and within the price range, you can clearly convey the intent of the code without having to follow complex conditional expressions.

## 🔍 Learn More: Criteria for Naming Conditions

When is it beneficial to name and separate conditions or functions?

### When Naming Conditions is Beneficial

- **When dealing with complex logic**: If complex logic is handled over multiple lines in a condition or function, it's beneficial to name it to clearly convey the function's role. This enhances code readability and makes maintenance or code reviews easier.

- **When reusability is needed**: If the same logic is likely to be used repeatedly in different places, you can declare a variable or function to reuse it. This reduces code duplication and makes maintenance easier.

- **When unit testing is needed**: By separating functions, you can write independent unit tests. Unit tests make it easy to verify that a function works correctly, which is especially useful when testing complex logic.

### When Naming Conditions is Not Necessary

- **When the logic is simple**: If the logic is very simple, there's no need to name it. For example, code like `arr.map(x => x * 2)` that simply doubles the elements of an array is intuitive without naming.

- **When used only once**: If a specific logic is used only once in the code and is not complex, handling the logic directly in an anonymous function can be more intuitive.
