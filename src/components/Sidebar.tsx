const lists = [
  { id: 'all', name: '全ての企業', icon: '□' },
  { id: 'target', name: '全部のターゲット企業', icon: '◎' },
  { id: 'list1', name: 'MOBIENT - 追加依頼', icon: '📋' },
  { id: 'list2', name: 'グラムワークス - 店舗型', icon: '📋' },
  { id: 'list3', name: 'グラムワークス - 建築', icon: '📋' },
  { id: 'list4', name: 'グラムワークス - 医療福祉', icon: '📋' },
  { id: 'list5', name: 'PULL-NET - 展示会', icon: '📋' },
  { id: 'list6', name: 'ロジック - 外国人採用', icon: '📋' },
  { id: 'list7', name: 'マエダNEW', icon: '📋' },
  { id: 'list8', name: 'グラムワークス - 自動車ディーラ', icon: '📋' },
  { id: 'list9', name: 'サンクイット_コンサル・東京', icon: '📋' },
  { id: 'list10', name: 'アムスコーポレーション - 菓子店', icon: '📋' },
  { id: 'list11', name: '展示会営業マーケティング - PRTI', icon: '📋' },
  { id: 'list12', name: 'アドネット - 兵庫大阪', icon: '📋' },
  { id: 'list13', name: 'レボルバー - 出版メディア', icon: '📋' },
  { id: 'list14', name: 'レボルバー - PRTIMES', icon: '📋' },
  { id: 'list15', name: 'グラムワークス - 印刷', icon: '📋' },
  { id: 'list16', name: 'Guidy - ジェグテック2', icon: '📋' },
  { id: 'list17', name: 'MOBIENT - 提出リスト① 優先度順', icon: '📋' },
  { id: 'list18', name: 'ミーカンパニー - 人材紹介', icon: '📋' },
  { id: 'list19', name: 'ミーカンパニー - 歯科メーカー', icon: '📋' },
  { id: 'list20', name: '十方 - 採用リスト', icon: '📋' },
];

interface SidebarProps {
  activeListId: string;
  onSelectList: (id: string) => void;
}

export default function Sidebar({ activeListId, onSelectList }: SidebarProps) {
  return (
    <aside className="w-52 bg-white border-r border-gray-200 overflow-y-auto shrink-0">
      <ul className="py-2">
        {lists.map((list) => (
          <li key={list.id}>
            <button
              onClick={() => onSelectList(list.id)}
              className={`w-full text-left px-4 py-1.5 text-[13px] flex items-start gap-2 transition-colors ${
                activeListId === list.id
                  ? 'text-sky-500 font-medium bg-sky-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="shrink-0 mt-0.5 text-xs">{list.icon}</span>
              <span className="truncate">{list.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
