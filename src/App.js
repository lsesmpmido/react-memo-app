import "./App.css";
import { useState, useEffect } from "react";
import MemoList from "./MemoList";
import MemoForm from "./MemoForm";

let nextId = 0;

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedMemos = JSON.parse(localStorage.getItem("memos"));
    if (savedMemos) {
      setMemos(savedMemos);
      nextId =
        savedMemos.length > 0 ? savedMemos[savedMemos.length - 1].id + 1 : 0;
    }
  }, []);

  useEffect(() => {
    if (memos.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memos));
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
    if (selectedMemoId === null) {
      setMemos([...memos, { id: nextId++, title, content }]);
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

  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);

  return (
    <>
      <h1>メモ帳</h1>
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
    </>
  );
}

export default App;
