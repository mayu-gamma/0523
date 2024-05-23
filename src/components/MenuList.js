import React from 'react';
import '../App.css';

// MenuListコンポーネントを定義。menuItems, onUpdate, onDeleteというpropsを受け取る。
const MenuList = ({ menuItems, onUpdate, onDelete }) => {
  return (
    <div id="menu-container"> 
      {/* メニューのタイトル */}
      <h1>メニュー一覧</h1>
      
      <div id="menu-list" className="menu-scroll"> 
        {/* 箇条書きリストの開始 */}
        <ul>
          {/* menuItems配列をmapメソッドでループし、各メニュー項目をliとしてレンダリング */}
          {menuItems.map(item => ( 
            // 各メニュー項目をli要素としてレンダリング。keyは一意のitem.idを使用。
            <li key={item.id} className="menu-item"> 
              {/* メニュー項目の詳細（名前と材料）を表示 */}
              <span className="item-details">
                {item.name} - {item.ingredients}
              </span>
              {/* 更新ボタンと削除ボタンを囲むdiv */}
              <div className="item-buttons"> 
                {/* 更新ボタン。クリック時にonUpdate関数を呼び出し、item.idを渡す。 */}
                <button onClick={() => onUpdate(item.id)} className='update'>更新</button> 
                {/* 削除ボタン。クリック時にonDelete関数を呼び出し、item.idを渡す。 */}
                <button onClick={() => onDelete(item.id)} className='delete'>削除</button> 
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuList; // MenuListコンポーネントをエクスポート
