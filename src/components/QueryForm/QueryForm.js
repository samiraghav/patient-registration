import React, { useState } from 'react';
import { queryPatients } from '../../services/databaseService';
import { FaTerminal, FaDatabase, FaCode, FaPlay } from 'react-icons/fa';

const QueryForm = ({ onQueryExecuted }) => {
  const [sql, setSql] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryExamples = [
    { query: "SELECT * FROM patients WHERE age >= 60", label: 'Senior Patients (60+)' },
    { query: "SELECT * FROM patients ORDER BY name ASC", label: 'Sort by Name' },
    { query: "SELECT gender, COUNT(*) FROM patients GROUP BY gender", label: 'Count by Gender' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await queryPatients(sql);
      setResults(data);
      if (onQueryExecuted) onQueryExecuted();
    } catch (err) {
      setError(err.message || 'Failed to execute query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-2 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <h2 className="text-[#334EAC] text-lg font-semibold flex items-center gap-2">
            <FaTerminal /> SQL Query Editor
          </h2>

          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="SELECT * FROM patients WHERE age >= 60"
            rows={6}
            className="w-full p-3 border border-[#BAD6EB]/40 h-[260px] rounded-md shadow-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#334EAC]/30"
            required
          />

          <div className="flex flex-wrap gap-2">
            {queryExamples.map(({ query, label }, idx) => (
              <button
                key={idx}
                onClick={() => setSql(query)}
                type="button"
                className="text-xs px-3 py-1 bg-[#D0E3FF]/60 hover:bg-[#BAD6EB]/80 text-[#334EAC] rounded-md transition"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!sql.trim() || loading}
            className={`w-full py-2 flex items-center justify-center gap-2 text-white text-sm rounded-md transition font-medium
              ${loading || !sql.trim()
                ? 'bg-[#7096D1]/50 cursor-not-allowed'
                : 'bg-[#2563EB] hover:bg-[#1e4db6]'}
            `}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Executing...
              </>
            ) : (
              <>
                <FaPlay size={14} />
                Run Query
              </>
            )}
          </button>

          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-300 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <h2 className="text-[#334EAC] text-lg font-semibold flex items-center gap-2">
            <FaDatabase /> Results
          </h2>

          <div className="bg-[#F8FAFC] border border-[#BAD6EB]/30 p-4 rounded-md h-[260px] overflow-auto text-sm font-mono text-left">
            {results.length > 0 ? (
              <pre>{JSON.stringify(results, null, 2)}</pre>
            ) : (
              <div className="text-center text-[#7096D1] text-sm flex flex-col items-center justify-center h-full">
                <FaCode size={32} className="mb-2" />
                <p>No results yet</p>
                <p className="text-xs">Run a query to display patient data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
