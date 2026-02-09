import type { Company } from '../types/company';

interface CompanyTableProps {
  companies: Company[];
  selectedIds: Set<string>;
  excludedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  currentPage: number;
  pageSize: number;
}

export default function CompanyTable({
  companies,
  selectedIds,
  excludedIds,
  onToggleSelect,
  onToggleSelectAll,
  currentPage,
  pageSize,
}: CompanyTableProps) {
  const start = (currentPage - 1) * pageSize;
  const pageCompanies = companies.slice(start, start + pageSize);
  const allOnPageSelected =
    pageCompanies.length > 0 && pageCompanies.every((c) => selectedIds.has(c.id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="py-2 px-3 w-8">
              <input
                type="checkbox"
                checked={allOnPageSelected}
                onChange={onToggleSelectAll}
                className="rounded border-gray-300"
              />
            </th>
            <th className="py-2 px-2 font-medium">企業名</th>
            <th className="py-2 px-2 font-medium w-12 text-center">👥</th>
            <th className="py-2 px-2 font-medium">ホームページ</th>
            <th className="py-2 px-2 font-medium w-10 text-center">✉️</th>
            <th className="py-2 px-2 font-medium w-10 text-center">SNS</th>
            <th className="py-2 px-2 font-medium w-10 text-center">📨</th>
            <th className="py-2 px-2 font-medium w-12">ID</th>
            <th className="py-2 px-2 font-medium">都道府県</th>
            <th className="py-2 px-2 font-medium">市区町村</th>
          </tr>
        </thead>
        <tbody>
          {pageCompanies.map((company) => {
            const isExcluded = excludedIds.has(company.id);
            return (
              <tr
                key={company.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  isExcluded ? 'opacity-40 bg-red-50' : ''
                }`}
              >
                <td className="py-2.5 px-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(company.id)}
                    onChange={() => onToggleSelect(company.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-2.5 px-2">
                  <div>
                    <span className="text-gray-800">{company.name}</span>
                    {isExcluded && (
                      <span className="ml-2 text-[11px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                        AI除外済み
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">
                    {company.description}
                  </div>
                </td>
                <td className="py-2.5 px-2 text-center text-gray-600">
                  {company.employeeCount}
                </td>
                <td className="py-2.5 px-2">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:underline text-[12px] truncate block max-w-[180px]"
                  >
                    {company.website.replace('https://', '')}
                  </a>
                </td>
                <td className="py-2.5 px-2 text-center text-gray-400">
                  {company.hasEmail ? '✉️' : ''}
                </td>
                <td className="py-2.5 px-2 text-center text-gray-400">
                  {company.hasSns ? '📷' : ''}
                </td>
                <td className="py-2.5 px-2 text-center text-gray-400">
                  {company.hasTel ? 'あり' : ''}
                </td>
                <td className="py-2.5 px-2 text-gray-400 text-[11px]">{company.id}</td>
                <td className="py-2.5 px-2 text-gray-600">{company.prefecture}</td>
                <td className="py-2.5 px-2 text-gray-600">{company.city}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
