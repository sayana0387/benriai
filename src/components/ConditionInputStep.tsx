import { useState } from 'react';

interface ConditionInputStepProps {
  initialCondition: string;
  onSubmit: (condition: string) => void;
  onClose: () => void;
  isRefinement?: boolean;
}

export default function ConditionInputStep({
  initialCondition,
  onSubmit,
  onClose,
  isRefinement = false,
}: ConditionInputStepProps) {
  const [condition, setCondition] = useState(initialCondition);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">
          🤖 AI除外{isRefinement ? ' - 条件を修正' : ''}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          どんな企業を除外したいですか？
        </label>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="例：自社と競合するSaaS企業、人材紹介会社、すでに取引のある企業"
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder:text-gray-400"
        />
        <p className="mt-2 text-xs text-gray-400">
          自然言語で除外したい企業の特徴を記述してください。AIが条件を解釈し、該当する企業を抽出します。
        </p>
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={() => onSubmit(condition)}
          disabled={!condition.trim()}
          className="px-6 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          条件を送信
        </button>
      </div>
    </>
  );
}
