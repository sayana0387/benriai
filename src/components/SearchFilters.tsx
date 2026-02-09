export default function SearchFilters() {
  return (
    <div className="px-4 pt-3 pb-2 space-y-3">
      <div className="text-xs text-gray-400 mb-1">別のユーザーとして表示中</div>

      {/* Search inputs row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">法人番号・URL・企業名で検索</label>
          <textarea
            placeholder="ドメイン名・企業名・企業番号で検索"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-14 resize-none focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">キーワード検索</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="キーワードを入力（いずれかを含む）"
              className="w-full border border-gray-300 rounded px-3 py-2 pl-8 text-sm h-14 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            />
          </div>
        </div>
        <div className="w-48">
          <label className="text-xs text-gray-500 mb-1 block">除外キーワード</label>
          <input
            type="text"
            placeholder="除外したいキーワードを入力"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-14 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400">従業員数</span>
        <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[100px]">
          <option>都道府県 ↕</option>
        </select>
        <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[90px]">
          <option>市区町村 ↕</option>
        </select>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-sm">👥</span>
          <input
            type="number"
            defaultValue={0}
            className="border border-gray-300 rounded px-2 py-1.5 text-sm w-16 text-center"
          />
          <span className="text-gray-400 text-sm">〜</span>
          <input
            type="text"
            placeholder="上限なし"
            className="border border-gray-300 rounded px-2 py-1.5 text-sm w-20 text-center"
          />
        </div>
        <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[90px]">
          <option>連絡方法 ↕</option>
        </select>
        <button className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 flex items-center gap-1 hover:bg-gray-50">
          <span>🎯</span> こだわり検索
        </button>
        <button className="bg-sky-500 text-white rounded px-4 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-sky-600 transition-colors">
          🔍 検索
        </button>
      </div>
    </div>
  );
}
