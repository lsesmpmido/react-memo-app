import "./App.css";
import { useState, useEffect } from "react";

let nextId = 0;

function App() {
  const [content, setContent] = useState("");
  const [memos, setMemos] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [selectedMemoId, setSelectedMemoId] = useState(null);

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

  function handleShowInputToggle(memoId) {
    if (showInput) {
      if (selectedMemoId === null || selectedMemoId === memoId) {
        setShowInput(false);
      }
    } else {
      setShowInput(true);
    }
  }

  function handleCreateMemoToggle() {
    setSelectedMemoId(null);
    setContent("");
  }

  function handleEditMemoToggle(memoId) {
    if (memoId !== selectedMemoId) {
      setSelectedMemoId(memoId);
      const selectedMemo = memos.find((memo) => memo.id === memoId);
      setContent(
        selectedMemo ? selectedMemo.title + "\n" + selectedMemo.content : "",
      );
    }
  }

  function handleSaveMemo() {
    const [title, ...mainContent] = content.split("\n");

    if (selectedMemoId === null) {
      setMemos([...memos, { id: nextId++, title, content: mainContent }]);
    } else {
      setMemos(
        memos.map((memo) =>
          memo.id === selectedMemoId
            ? { ...memo, title, content: mainContent }
            : memo,
        ),
      );
    }
    setShowInput(false);
    setSelectedMemoId(null);
  }

  function handleDeleteMemo() {
    setMemos(memos.filter((memo) => memo.id !== selectedMemoId));
    setShowInput(false);
    setSelectedMemoId(null);
  }

  return (
    <>
      <h1>メモ帳</h1>
      <div className="frame">
        <h2>一覧</h2>
        <button
          onClick={() => {
            handleShowInputToggle();
            handleCreateMemoToggle();
          }}
        >
          +
        </button>
        <ul>
          {memos.map((memo) => (
            <li key={memo.id}>
              <span
                onClick={() => {
                  handleShowInputToggle(memo.id);
                  handleEditMemoToggle(memo.id);
                }}
              >
                {memo.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {showInput && (
        <div className="frame">
          <h2>{selectedMemoId === null ? "追加" : "編集"}</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSaveMemo}>
            {selectedMemoId === null ? "作成" : "更新"}
          </button>
          {selectedMemoId !== null && (
            <button onClick={handleDeleteMemo}>削除</button>
          )}
        </div>
      )}
    </>
  );
}

export default App;
