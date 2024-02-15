import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { signIn } from "next-auth/react";

// next-auth/react モジュールの signIn 関数をモック化
jest.mock("next-auth/react", () => ({
  // ...jest.requireActual("next-auth/react")によってsignIn以外は元のままにする
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

// 各テストの前に全てのモックをリセット
beforeEach(() => {
  jest.resetAllMocks();
});

describe("LoginForm component", () => {
  test("無効なメールアドレスとパスワードでフォームを送信した場合、適切なバリデーションメッセージが表示されることを確認する", async () => {
    // LoginFormをレンダリング
    render(<LoginForm />);

    // 無効なメールアドレスとパスワードを入力
    await userEvent.type(
      screen.getByPlaceholderText("user@example.com"),
      "invalid#example.com",
    );
    await userEvent.type(screen.getByPlaceholderText("password"), "short");

    // ログインボタンをクリック
    userEvent.click(screen.getByRole("button"));

    // バリデーションメッセージが表示されることを確認
    await waitFor(() => {
      expect(
        screen.queryByText("正しいメールアドレス形式ではありません。"),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("パスワードは8文字以上必要です。"),
      ).toBeInTheDocument();
    });
  });
  test("フォームの送信後、ローディング状態になり、ボタンが無効化されることを確認する", async () => {
    // signIn 関数のモック実装を設定（1秒後に成功を返す）
    (signIn as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ status: "success" }), 1000),
        ),
    );

    // LoginForm をレンダリング
    render(<LoginForm />);

    // ログインボタンを取得
    const button = screen.getByText("ログイン");

    // ユーザー情報を入力
    await userEvent.type(
      screen.getByPlaceholderText("user@example.com"),
      "test-user@example.com",
    );
    await userEvent.type(
      screen.getByPlaceholderText("password"),
      "testpassword",
    );
    // ログインボタンをクリック
    await userEvent.click(button);

    // ログインボタンがローディング状態になることを確認
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent("Loading");
    });
  });
  test("有効なメールアドレスとパスワードでログインを試みた場合、ログイン処理が正常に行われることを確認する", () => {
    // LoginFormをレンダリング
    render(<LoginForm />);
  });
  test("ログイン処理中にエラーが発生した場合、エラーメッセージが表示される", () => {
    // LoginFormをレンダリング
    render(<LoginForm />);
  });
});
