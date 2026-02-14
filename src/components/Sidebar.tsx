const lists = [
  { id: 'all', name: '全ての企業', icon: '□' },
  { id: 'target', name: '全部のターゲット企業', icon: '◎' },
  { id: 'list1', name: 'エコプロ', icon: '📋' },
  { id: 'list2', name: '支援', icon: '📋' },
  { id: 'list3', name: '社会インフラテック', icon: '📋' },
  { id: 'list4', name: 'JAPAN SHOP 大阪', icon: '📋' },
  { id: 'list5', name: '商社', icon: '📋' },
  { id: 'list6', name: 'M&A', icon: '📋' },
  { id: 'list7', name: '人材', icon: '📋' },
  { id: 'list8', name: 'MOBIENT - 追加依頼', icon: '📋' },
  { id: 'list9', name: 'グラムワークス - 店舗型', icon: '📋' },
  { id: 'list10', name: 'グラムワークス - 建築', icon: '📋' },
  { id: 'list11', name: 'グラムワークス - 医療福祉', icon: '📋' },
  { id: 'list12', name: 'PULL-NET - 展示会', icon: '📋' },
  { id: 'list13', name: 'ロジック - 外国人採用', icon: '📋' },
  { id: 'list14', name: 'マエダNEW', icon: '📋' },
  { id: 'list15', name: 'グラムワークス - 自動車ディーラ', icon: '📋' },
  { id: 'list16', name: 'サンクイット_コンサル・東京', icon: '📋' },
  { id: 'list17', name: 'アムスコーポレーション - 菓子店', icon: '📋' },
  { id: 'list18', name: '展示会営業マーケティング - PRTI', icon: '📋' },
  { id: 'list19', name: 'アドネット - 兵庫大阪', icon: '📋' },
  { id: 'list20', name: 'レボルバー - 出版メディア', icon: '📋' },
];

interface SidebarProps {
  activeListId: string;
  onSelectList: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ activeListId, onSelectList, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className="bg-white border-r border-gray-200 shrink-0 overflow-hidden transition-all duration-300 ease-in-out flex flex-col"
      style={{ width: collapsed ? 40 : 208 }}
    >
      {/* Toggle button */}
      <div className={`flex items-center border-b border-gray-100 shrink-0 ${collapsed ? 'justify-center px-0' : 'justify-end px-2'} py-1.5`}>
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors text-sm"
          title={collapsed ? 'サイドバーを展開' : 'サイドバーを折りたたむ'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      {/* List items */}
      {!collapsed && (
        <ul className="py-1 overflow-y-auto flex-1">
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
      )}
    </aside>
  );
}
