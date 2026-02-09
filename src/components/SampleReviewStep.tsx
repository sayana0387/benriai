import { useState } from 'react';
import type { SampleCompany, ExclusionDecision } from '../types/company';

interface SampleReviewStepProps {
  condition: string;
  totalMatches: number;
  previousMatches?: number;
  sampleCompanies: SampleCompany[];
  stepNumber: 1 | 2;
  onNext: (decisions: Map<string, ExclusionDecision>, feedback: string) => void;
  onBack: () => void;
  onClose: () => void;
}

export default function SampleReviewStep({
  condition,
  totalMatches,
  previousMatches,
  sampleCompanies,
  stepNumber,
  onNext,
  onBack,
  onClose,
}: SampleReviewStepProps) {
  const [decisions, setDecisions] = useState<Map<string, ExclusionDecision>>(
    () => new Map(sampleCompanies.map((c) => [c.id, c.decision]))
  );
  const [feedback, setFeedback] = useState('');

  const toggleDecision = (id: string) => {
    setDecisions((prev) => {
      const next = new Map(prev);
      next.set(id, prev.get(id) === 'exclude' ? 'keep' : 'exclude');
      return next;
    });
  };

  return (
    <>
      {/* Fixed header */}
      <div className="px-6 py-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800">
            AI除外プレビュー（{stepNumber}/2）
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        {stepNumber === 2 && (
          <div className="text-sm text-sky-600 mb-1">条件を修正しました：</div>
        )}
        <div className="text-sm text-gray-700">
          条件：「{condition}」
        </div>
        <div className="text-sm text-gray-500 mt-1">
          該当企業：約{totalMatches}社
          {stepNumber === 2 && previousMatches != null && (
            <span className="text-sky-600 ml-1">
              （前回より{totalMatches - previousMatches > 0 ? '+' : ''}
              {totalMatches - previousMatches}社）
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {stepNumber === 1
            ? '以下の企業は除外しますか？'
            : '新しい条件で再抽出したサンプルです：'}
        </div>
      </div>

      {/* Scrollable company cards */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {sampleCompanies.map((company) => {
          const decision = decisions.get(company.id) ?? 'exclude';
          return (
            <div
              key={company.id}
              className={`border rounded-lg p-4 transition-colors ${
                decision === 'exclude'
                  ? 'border-red-200 bg-red-50/50'
                  : 'border-sky-200 bg-sky-50/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm">{company.name}</div>
                  <div className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                    {company.description}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 italic">
                    AI判定理由：{company.aiReason}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (decision !== 'exclude') toggleDecision(company.id);
                    }}
                    className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                      decision === 'exclude'
                        ? 'bg-red-500 text-white'
                        : 'bg-white border border-gray-300 text-gray-500 hover:bg-red-50'
                    }`}
                  >
                    除外する
                  </button>
                  <button
                    onClick={() => {
                      if (decision !== 'keep') toggleDecision(company.id);
                    }}
                    className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                      decision === 'keep'
                        ? 'bg-sky-500 text-white'
                        : 'bg-white border border-gray-300 text-gray-500 hover:bg-sky-50'
                    }`}
                  >
                    残す
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed footer */}
      <div className="px-6 py-4 border-t border-gray-200 shrink-0 space-y-3">
        {stepNumber === 1 && (
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              💡 「残す」にした理由があれば：
            </label>
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="例）この会社は既存顧客なので..."
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            />
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 条件を修正
          </button>
          <button
            onClick={() => onNext(decisions, feedback)}
            className="px-6 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors"
          >
            {stepNumber === 1 ? '次へ →' : '確定して次へ →'}
          </button>
        </div>
      </div>
    </>
  );
}
