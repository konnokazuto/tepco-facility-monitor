// わざとフォーマットを崩したファイル
import React from "react";

export const TestComponent = () => {
  const [count, setCount] = React.useState(0);
  const message = "Hello World";

  return (
    <div>
      <h1>{message}</h1>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

// セミコロンなし
const someFunction = () => {
  console.log("test");
};

// インデントがおかしい
const config = {
  name: "test",
  value: 123,
  items: [1, 2, 3]
};
