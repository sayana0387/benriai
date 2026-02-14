interface SearchFiltersProps {
  aiMode: boolean;
}

export default function SearchFilters({ aiMode }: SearchFiltersProps) {
  return (
    <div className="relative">
      <div className="px-4 pt-3 pb-2 space-y-3">
        <div className="text-xs text-gray-400 mb-1">別のユーザーとして表示中</div>

        {/* Search inputs row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">法人番号・URL・企業名で検索</label>
            <textarea
              placeholder="ドメイン名・企業名・企業番号で検索"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-14 resize-none focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              disabled={aiMode}
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
                disabled={aiMode}
              />
            </div>
          </div>
          <div className="w-48">
            <label className="text-xs text-gray-500 mb-1 block">除外キーワード</label>
            <input
              type="text"
              placeholder="除外したいキーワードを入力"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-14 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              disabled={aiMode}
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-2 flex-wrap">
          <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[100px]" disabled={aiMode}>
            <option>業界 ↕</option>
          </select>
          <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[100px]" disabled={aiMode}>
            <option>都道府県 ↕</option>
          </select>
          <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[90px]" disabled={aiMode}>
            <option>市区町村 ↕</option>
          </select>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm">👥</span>
            <input
              type="number"
              defaultValue={0}
              className="border border-gray-300 rounded px-2 py-1.5 text-sm w-16 text-center"
              disabled={aiMode}
            />
            <span className="text-gray-400 text-sm">〜</span>
            <input
              type="text"
              placeholder="上限なし"
              className="border border-gray-300 rounded px-2 py-1.5 text-sm w-20 text-center"
              disabled={aiMode}
            />
          </div>
          <select className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[90px]" disabled={aiMode}>
            <option>連絡方法 ↕</option>
          </select>
          <button className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 flex items-center gap-1 hover:bg-gray-50 disabled:opacity-50" disabled={aiMode}>
            <span>🎯</span> こだわり検索
          </button>
          <button className="bg-sky-500 text-white rounded px-4 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-sky-600 transition-colors disabled:opacity-50" disabled={aiMode}>
            🔍 検索
          </button>
          <label className="flex items-center gap-1 text-xs text-gray-500 ml-2">
            <input type="checkbox" className="rounded border-gray-300" disabled={aiMode} />
            いずれかのリストに含まれている企業を除外
          </label>
        </div>
      </div>

      {/* AI Mode Overlay */}
      {aiMode && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <span className="bg-sky-100 text-sky-700 text-sm font-medium px-4 py-2 rounded-full border border-sky-200">
            AI検索モード中
          </span>
        </div>
      )}
    </div>
  );
}
