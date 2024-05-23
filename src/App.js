import React, { useState, useEffect } from 'react';
import MenuList from './components/MenuList'; // メニューリストコンポーネントをインポート
import AddDishForm from './components/AddDishForm'; // 料理追加フォームコンポーネントをインポート
import RouletteModal from './components/RouletteModal'; // ルーレットのモーダルウィンドウコンポーネントをインポート
import './App.css';

const App = () => {
  // メニューアイテムの初期データ
  const [menuItems, setMenuItems] = useState(() => {
    // ローカルストレージからデータを取得し、なければ初期データを使用する
    const storedItems = localStorage.getItem('menuItems');
    return storedItems ? JSON.parse(storedItems) : [
      { id: 1, name: 'カレー', ingredients: 'ご飯、カレー粉、 肉、 野菜' },
      { id: 2, name: 'パスタ', ingredients: 'パスタ、 トマトソース、 チーズ' },
      { id: 3, name: 'オムライス', ingredients: '卵、白米、ケチャップ、鶏肉、グリンピース'},
      { id: 4, name: 'からあげ', ingredients: '鶏むね肉、醤油、みりん、酒、しょうが、片栗粉' },
      { id: 5, name: 'エビチリ', ingredients: 'エビ、片栗粉、酒、しょうが' },
      { id: 6, name: '卵サンド', ingredients: '卵、食パン、マヨネーズ、レタス'}
    ];
  });

  // 更新対象の料理情報を保持する state
  const [selectedDish, setSelectedDish] = useState(null);

  // モーダルウィンドウの表示状態を管理する state
  const [updateModalOpen, setUpdateModalOpen] = useState(false); // 更新ボタンのモーダルウィンドウ
  const [rouletteModalOpen, setRouletteModalOpen] = useState(false); // ルーレットのモーダルウィンドウ
  const [rouletteOptions, setRouletteOptions] = useState([]); // ルーレットの選択肢を管理

  // ページが読み込まれた時にローカルストレージからデータを読み込む
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);
  // useEffectフックを使用して、menuItemsステートが変更されるたびにローカルストレージにデータを保存
  // ページをリロードしても、ローカルストレージからデータが読み込まれ、メニューに追加された要素が消えないようになっている

  // 新しい料理を追加する関数
  const handleAddDish = (newDish) => {
    setMenuItems([...menuItems, { ...newDish, id: Date.now() }]);
  };

  // 料理を更新する関数
  const handleUpdateDish = (id, updatedDish) => {
    setMenuItems(menuItems.map(item => (item.id === id ? { ...item, ...updatedDish } : item)));
    setUpdateModalOpen(false); // 更新ボタンのモーダルウィンドウを閉じる
  };

  // 料理を削除する関数
  const handleDeleteDish = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // 更新ボタンが押されたときに更新ボタンのモーダルウィンドウを開く関数
  const handleOpenUpdateModal = (id) => {
    const dishToUpdate = menuItems.find(item => item.id === id);
    setSelectedDish(dishToUpdate);
    setUpdateModalOpen(true);
  };

  // 更新ボタンのモーダルウィンドウを閉じる関数
  const handleCloseUpdateModal = () => {
    setSelectedDish(null);
    setUpdateModalOpen(false);
  };

  // ルーレットのモーダルウィンドウを開く関数
  const handleOpenRouletteModal = () => {
    // ローカルストレージから取得した料理の名前を取得
    const storedItems = localStorage.getItem('menuItems');
    const localMenuItems = storedItems ? JSON.parse(storedItems) : [];
    // 新しい料理の名前とローカルストレージから取得した料理の名前を結合してルーレットの選択肢にする
    const options = [...menuItems.map(item => item.name), ...localMenuItems.map(item => item.name)];
    setRouletteOptions(options); // ルーレットの選択肢を設定
    setRouletteModalOpen(true); // ルーレットのモーダルウィンドウを開く
  };

  // ルーレットのモーダルウィンドウを閉じる関数
  const handleCloseRouletteModal = () => {
    setRouletteModalOpen(false);
  };

  return (
    <div id="app">
      {/* 左側にメニューリストを表示 */}
      <MenuList menuItems={menuItems} onUpdate={handleOpenUpdateModal} onDelete={handleDeleteDish} />
      {/* 右側に料理追加フォームを表示 */}
      <AddDishForm onAddDish={handleAddDish} />
      {/* 更新ボタンのモーダルウィンドウ */}
      {updateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseUpdateModal}>&times;</span>
            <h2>料理を更新</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateDish(selectedDish.id, { name: e.target.name.value, ingredients: e.target.ingredients.value });
            }}>
              <label htmlFor="name">料理名</label>
              <input type="text" id="name" name="name" defaultValue={selectedDish.name} required />
              <label htmlFor="ingredients">材料</label>
              <input type="text" id="ingredients" name="ingredients" defaultValue={selectedDish.ingredients} required />
              <button type="submit">更新</button>
            </form>
          </div>
        </div>
      )}
      <div id='roulette'>
        {/* ルーレットのモーダルウィンドウ */}
        {rouletteModalOpen && <RouletteModal onClose={handleCloseRouletteModal} options={rouletteOptions} />}
        {/* ルーレットボタン */}
        <button onClick={handleOpenRouletteModal} className='roubutton'>ルーレットを開く</button>
      </div>
    </div>
  );
};

export default App;
