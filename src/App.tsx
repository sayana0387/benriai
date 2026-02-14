import { useState, useCallback, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchFilters from './components/SearchFilters';
import CompanyTable from './components/CompanyTable';
import AIPanel from './components/AIPanel';
import ModalBackdrop from './components/ModalBackdrop';
import ConditionInputStep from './components/ConditionInputStep';
import PatternConfirmStep from './components/PatternConfirmStep';
import SampleReviewStep from './components/SampleReviewStep';
import FinalConfirmStep from './components/FinalConfirmStep';
import type { ModalStep, ExclusionDecision } from './types/company';
import {
  mockCompanies,
  mockExclusionSample1,
  mockExclusionSample2,
  mockFullExclusionList,
  mockPatternResult,
} from './data/mockCompanies';

const PAGE_SIZE = 10;

function App() {
  // Sidebar
  const [activeListId, setActiveListId] = useState('list4');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // AI mode
  const [aiMode, setAiMode] = useState(false);

  // Table selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Excluded companies (result of AI exclusion)
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [modalStep, setModalStep] = useState<ModalStep>('closed');
  const [, setEntryMode] = useState<'rule' | 'sample'>('rule');
  const [condition, setCondition] = useState('');
  const [refinedCondition, setRefinedCondition] = useState('');
  const [reviewRound, setReviewRound] = useState<1 | 2>(1);

  const totalPages = Math.ceil(mockCompanies.length / PAGE_SIZE);
  const selectedCount = selectedIds.size;

  // Companies for final confirmation
  const finalExcludeCompanies = useMemo(
    () => mockCompanies.filter((c) => mockFullExclusionList.includes(c.id)),
    []
  );

  // Toggle single company selection
  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Toggle all on current page
  const handleToggleSelectAll = useCallback(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageCompanies = mockCompanies.slice(start, start + PAGE_SIZE);
    setSelectedIds((prev) => {
      const allSelected = pageCompanies.every((c) => prev.has(c.id));
      const next = new Set(prev);
      if (allSelected) {
        pageCompanies.forEach((c) => next.delete(c.id));
      } else {
        pageCompanies.forEach((c) => next.add(c.id));
      }
      return next;
    });
  }, [currentPage]);

  // --- Entry 1: Rule-based AI exclusion ---
  const handleOpenRuleModal = () => {
    setEntryMode('rule');
    setCondition('');
    setRefinedCondition('');
    setReviewRound(1);
    setModalStep('condition-input');
  };

  // --- Entry 2: Sample-based AI exclusion ---
  const handleOpenSampleModal = () => {
    setEntryMode('sample');
    setCondition('');
    setRefinedCondition('');
    setReviewRound(1);
    setModalStep('pattern-confirm');
  };

  // Close modal
  const handleCloseModal = () => {
    setModalStep('closed');
  };

  // Condition submitted (Entry 1)
  const handleConditionSubmit = (text: string) => {
    setCondition(text);
    setReviewRound(1);
    setModalStep('sample-review-1');
  };

  // Pattern confirmed (Entry 2)
  const handlePatternConfirm = (modifiedCondition: string) => {
    setCondition(modifiedCondition);
    setReviewRound(1);
    setModalStep('sample-review-1');
  };

  // Sample review: next
  const handleSampleNext = (_decisions: Map<string, ExclusionDecision>, feedback: string) => {
    if (reviewRound === 1) {
      // Simulate AI refinement based on feedback
      const refined = feedback
        ? `${condition}。ただし${feedback}`
        : `${condition}。ただし飲食業界特化は除く`;
      setRefinedCondition(refined);
      setReviewRound(2);
      setModalStep('sample-review-2');
    } else {
      // Go to final confirm
      setModalStep('final-confirm');
    }
  };

  // Sample review: back to condition input
  const handleSampleBack = () => {
    if (reviewRound === 2) {
      // Go back to round 1
      setReviewRound(1);
      setModalStep('sample-review-1');
    } else {
      setModalStep('condition-input');
    }
  };

  // Final confirm: execute exclusion
  const handleFinalConfirm = (ids: string[]) => {
    setExcludedIds(new Set(ids));
    setModalStep('closed');
    setSelectedIds(new Set());
  };

  // Final confirm: back
  const handleFinalBack = () => {
    setModalStep(reviewRound === 2 ? 'sample-review-2' : 'sample-review-1');
  };

  // Selected company names for pattern step
  const selectedCompanyNames = useMemo(
    () =>
      mockCompanies
        .filter((c) => selectedIds.has(c.id))
        .map((c) => c.name),
    [selectedIds]
  );

  return (
    <div className="h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar
          activeListId={activeListId}
          onSelectList={setActiveListId}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        />

        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          <SearchFilters aiMode={aiMode} />

          {/* AI Exclusion button row + table header area */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* Entry 1: Always visible AI Exclusion button */}
              <button
                onClick={handleOpenRuleModal}
                className="px-3 py-1.5 bg-sky-50 border border-sky-300 text-sky-600 text-sm rounded-md hover:bg-sky-100 transition-colors font-medium"
              >
                🤖 AI除外
              </button>
              {excludedIds.size > 0 && (
                <span className="text-xs text-gray-400">
                  ({excludedIds.size}社を除外済み)
                </span>
              )}
            </div>
          </div>

          {/* Company table */}
          <div className="flex-1 overflow-y-auto">
            <CompanyTable
              companies={mockCompanies}
              selectedIds={selectedIds}
              excludedIds={excludedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {selectedCount} / {mockCompanies.length} 行を選択しています。
              </span>
              <label className="flex items-center gap-1 text-sm text-gray-500">
                <input type="checkbox" className="rounded border-gray-300" />
                以前ダウンロードした企業を排除
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">合計</span>
              <span className="font-bold text-gray-800">4,438,728社</span>

              <button className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded font-medium hover:bg-orange-600 transition-colors flex items-center gap-1">
                {selectedCount}社をダウンロード 📥
              </button>

              <button className="px-3 py-1.5 border border-gray-300 text-sm text-gray-600 rounded hover:bg-gray-50 transition-colors">
                {selectedCount}社をリストに追加 📋
              </button>

              {/* Entry 2: Selection-based AI Exclusion button */}
              {selectedCount > 0 && (
                <button
                  onClick={handleOpenSampleModal}
                  className="px-3 py-1.5 bg-sky-50 border border-sky-300 text-sky-600 text-sm rounded font-medium hover:bg-sky-100 transition-colors"
                >
                  🤖 AI除外
                </button>
              )}

              <button className="px-3 py-1.5 bg-red-50 border border-red-300 text-red-600 text-sm rounded hover:bg-red-100 transition-colors flex items-center gap-1">
                🗑 リストを削除
              </button>

              {/* Pagination */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50"
              >
                前へ
              </button>
              <span className="text-sm text-gray-500">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50"
              >
                次へ
              </button>
            </div>
          </div>
        </main>

        {/* AI Side Panel */}
        <AIPanel aiMode={aiMode} onAiModeChange={setAiMode} />
      </div>

      {/* ===== MODAL SYSTEM ===== */}
      {modalStep !== 'closed' && (
        <ModalBackdrop onClose={handleCloseModal}>
          {/* Step: Condition Input (Entry 1 or refinement) */}
          {modalStep === 'condition-input' && (
            <ConditionInputStep
              initialCondition={condition}
              onSubmit={handleConditionSubmit}
              onClose={handleCloseModal}
              isRefinement={!!condition}
            />
          )}

          {/* Step: Pattern Confirm (Entry 2) */}
          {modalStep === 'pattern-confirm' && (
            <PatternConfirmStep
              pattern={mockPatternResult.pattern}
              additionalCount={mockPatternResult.additionalCount}
              selectedCompanyNames={selectedCompanyNames}
              onConfirm={handlePatternConfirm}
              onClose={handleCloseModal}
            />
          )}

          {/* Step: Sample Review Round 1 */}
          {modalStep === 'sample-review-1' && (
            <SampleReviewStep
              condition={condition}
              totalMatches={47}
              sampleCompanies={mockExclusionSample1}
              stepNumber={1}
              onNext={handleSampleNext}
              onBack={handleSampleBack}
              onClose={handleCloseModal}
            />
          )}

          {/* Step: Sample Review Round 2 */}
          {modalStep === 'sample-review-2' && (
            <SampleReviewStep
              condition={refinedCondition || condition}
              totalMatches={32}
              previousMatches={47}
              sampleCompanies={mockExclusionSample2}
              stepNumber={2}
              onNext={handleSampleNext}
              onBack={handleSampleBack}
              onClose={handleCloseModal}
            />
          )}

          {/* Step: Final Confirmation */}
          {modalStep === 'final-confirm' && (
            <FinalConfirmStep
              condition={refinedCondition || condition}
              excludeCompanies={finalExcludeCompanies}
              onConfirm={handleFinalConfirm}
              onBack={handleFinalBack}
              onClose={handleCloseModal}
            />
          )}
        </ModalBackdrop>
      )}
    </div>
  );
}

export default App;
