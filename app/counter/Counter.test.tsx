import React from "react";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter component", () => {
  test("コンポーネントの初期表示にカウントが0であることを確認する", () => {
    // COunterコンポーネントをレンダリングする
    render(<Counter />);

    // 「カウント: 0」のテキストを持つ要素を取得する
    const count = screen.queryByText("カウント: 0");

    // 取得した要素が表示されているか確認する
    expect(count).toBeInTheDocument();
  });

  test("プラスボタンをクリックするとカウントが1増加することを確認する", async () => {
    // Counter コンポーネントをレンダリングする
    render(<Counter />);

    // 「プラス」ボタンをクリック
    await userEvent.click(screen.getByText("プラス"));

    // カウント: 1」が表示されていることを確認する
    expect(screen.queryByText("カウント: 1")).toBeInTheDocument();
  });

  test("マイナスボタンをクリックするとカウントが1現象することを確認する", async () => {
    // Counter コンポーネントをレンダリングする
    render(<Counter />);

    // 「マイナス」ボタンをクリック
    await userEvent.click(screen.getByText("マイナス"));

    // カウント: -1」が表示されていることを確認する
    expect(screen.queryByText("カウント: -1")).toBeInTheDocument();
  });

  test("10秒ごとにカウントが10自動増加することを確認する", () => {
    // ダイマーをJestのモックタイマーに置き換える
    jest.useFakeTimers();

    // Counter コンポーネントをレンダリングする
    render(<Counter />);

    // actを使用して、10秒進めた際のコンポーネントの状態更新とレンダリングを確実に行う
    act(() => {
      // 10秒進める
      jest.advanceTimersByTime(10000);
    });

    // カウント: 10が表示されていることを確認する
    expect(screen.queryByText("カウント: 10")).toBeInTheDocument();

    // すべてのタイマーをクリアする
    jest.clearAllTimers();
  });

  test("コンポーネントのアンマウント時にインターバルがクリアされることを確認する", () => {
    // タイマーをJestの偽のタイマーに置き換える
    jest.useFakeTimers();

    // clearInterval, setIntervalをモック化
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    // Counter コンポーネントをレンダリングする
    render(<Counter />);

    // setIntervalが1回呼ばれたことを確認
    // これはコンポーネントがマウントされた時にタイマーが設定されることを確認している
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);

    // `setInterval` から返されたIDを取得
    const intervalId = setIntervalSpy.mock.results[0].value;

    // コンポーネントをアンマウント
    cleanup();

    // `clearInterval` が正しいIDで呼び出されたことを確認
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalId);

    // すべてのタイマーをクリア
    jest.clearAllTimers();
  });
});
