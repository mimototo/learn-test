"use client";

import React, { useState, useEffect } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  // 10秒ごとにカウントを10増やす
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 10);
    }, 10000);

    // コンポーネントのクリーンアップ時にインターバルをクリア
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-12">
      <h2>カウント: {count}</h2>
      <div className="flex gap-4">
        <button
          className="border border-gray-300 bg-gray-100 p-2 px-4 rounded"
          onClick={() => setCount(count + 1)}
        >
          プラス
        </button>
        <button
          className="border border-gray-300 bg-gray-100 p-2 px-4 rounded"
          onClick={() => setCount(count - 1)}
        >
          マイナス
        </button>
      </div>
    </div>
  );
};
