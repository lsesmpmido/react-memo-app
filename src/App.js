import "./App.css";
import { useState, useEffect } from "react";
import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import { SignInContext } from "./Context.js";

function App() {
  const [memos, setMemos] = useState(() => {
    const savedMemos = JSON.parse(localStorage.getItem("memos"));
    return savedMemos || [];
  });
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (memos.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memos));
    } else {
      localStorage.removeItem("memos");
    }
  }, [memos]);

  function handleSelectMemo(memoId) {
    setSelectedMemoId(memoId);
    setShowForm(true);
  }

  function handleCreateMemo() {
    if (showForm) {
      setShowForm(false);
      setSelectedMemoId(null);
    } else {
      setShowForm(true);
      setSelectedMemoId(null);
    }
  }

  function handleSaveMemo(title, content) {
    const nextId =
      memos.length > 0 ? Math.max(...memos.map((memo) => memo.id)) + 1 : 0;
    if (selectedMemoId === null) {
      setMemos([...memos, { id: nextId, title, content }]);
    } else {
      setMemos(
        memos.map((memo) =>
          memo.id === selectedMemoId ? { ...memo, title, content } : memo,
        ),
      );
    }
    setShowForm(false);
  }

  function handleDeleteMemo(memoId) {
    setMemos(memos.filter((memo) => memo.id !== memoId));
    setSelectedMemoId(null);
    setShowForm(false);
  }

  function handleSignIn() {
    setIsSignIn((prevSignIn) => !prevSignIn);
  }

  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);

  return (
    <SignInContext.Provider value={isSignIn}>
      <h1>メモ帳</h1>
      <button onClick={handleSignIn}>
        {isSignIn ? "ログアウト" : "ログイン"}
      </button>
      <MemoList
        memos={memos}
        onSelectMemo={handleSelectMemo}
        onCreateMemo={handleCreateMemo}
      />
      {showForm && (
        <MemoForm
          selectedMemo={selectedMemo}
          onSaveMemo={handleSaveMemo}
          onDeleteMemo={handleDeleteMemo}
        />
      )}
    </SignInContext.Provider>
  );
}

export default App;
