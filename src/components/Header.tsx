const navItems = [
  { label: '企業リストを作る', active: true },
  { label: 'メールアドレスを探す', active: false },
  { label: 'メールをカスタマイズする', active: false },
  { label: 'キャンペーンを開始する', active: false },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center">
        <div className="flex items-center gap-2 mr-6">
          <div className="text-cyan-500 text-lg">🏢</div>
          <span className="font-bold text-gray-800 text-base">Benri.ai</span>
        </div>
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`px-3 py-1.5 text-sm transition-colors ${
                item.active
                  ? 'text-sky-500 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-full border border-sky-400 text-sky-500 flex items-center justify-center text-sm font-bold">
          ?
        </button>
        <span className="text-sm text-gray-600">sayana+client@benri.ai</span>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          👤
        </button>
      </div>
    </header>
  );
}
