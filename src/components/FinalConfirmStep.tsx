import { useState } from 'react';
import type { Company } from '../types/company';

interface FinalConfirmStepProps {
  condition: string;
  excludeCompanies: Company[];
  onConfirm: (finalIds: string[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export default function FinalConfirmStep({
  condition,
  excludeCompanies,
  onConfirm,
  onBack,
  onClose,
}: FinalConfirmStepProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    () => new Set(excludeCompanies.map((c) => c.id))
  );
  const [expanded, setExpanded] = useState(excludeCompanies.length <= 20);

  const toggleId = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
        <h2 className="text-lg font-bold text-gray-800">除外の最終確認</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div className="space-y-1">
          <div className="text-sm text-gray-700">
            条件：「{condition}」
          </div>
          <div className="text-sm text-gray-700">
            除外対象：合計<span className="font-bold text-red-600">{checkedIds.size}</span>社
          </div>
        </div>

        {/* Collapsible full list */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>{expanded ? '▼' : '▶'} 全社リストを確認する</span>
            <span className="text-xs text-gray-400">{excludeCompanies.length}社</span>
          </button>
          {expanded && (
            <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
              {excludeCompanies.map((company) => (
                <label
                  key={company.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={checkedIds.has(company.id)}
                    onChange={() => toggleId(company.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-800 shrink-0">{company.name}</span>
                  <span className="text-[11px] text-gray-400 truncate">{company.description}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Recovery notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
          <span className="shrink-0">⚠</span>
          <span>除外した企業は「除外済み」タブからいつでも復元できます</span>
        </div>
      </div>

      <div className="flex justify-between px-6 py-4 border-t border-gray-200 shrink-0">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← 戻る
        </button>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => onConfirm(Array.from(checkedIds))}
            className="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            {checkedIds.size}社を除外する
          </button>
        </div>
      </div>
    </>
  );
}
