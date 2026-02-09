import { useState } from 'react';

interface PatternConfirmStepProps {
  pattern: string;
  additionalCount: number;
  selectedCompanyNames: string[];
  onConfirm: (modifiedCondition: string) => void;
  onClose: () => void;
}

export default function PatternConfirmStep({
  pattern,
  additionalCount,
  selectedCompanyNames,
  onConfirm,
  onClose,
}: PatternConfirmStepProps) {
  const [editedPattern, setEditedPattern] = useState(pattern);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">
          🤖 AI除外 - パターン検出
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
          <p className="text-sm text-sky-800">
            選んだ企業（{selectedCompanyNames.length}社）の共通点を分析しました：
          </p>
          <p className="mt-2 font-medium text-sky-900">
            「{pattern}」
          </p>
          <p className="mt-1 text-sm text-sky-700">
            同じ条件の企業が他に約{additionalCount}社あります。
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            選択された企業：
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedCompanyNames.map((name) => (
              <span
                key={name}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            条件を修正できます（任意）：
          </label>
          <textarea
            value={editedPattern}
            onChange={(e) => setEditedPattern(e.target.value)}
            className="w-full h-20 px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={() => onConfirm(editedPattern)}
          className="px-6 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors"
        >
          この条件で除外を開始
        </button>
      </div>
    </>
  );
}
