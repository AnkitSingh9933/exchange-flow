function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  selectedCurrency = "USD",
  currencyOptions = [],
}) {
  return (
    <div className="flex rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition-all focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/30">
      <div className="w-1/2">
        <label className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <input
          className="w-full bg-transparent text-xl font-bold tracking-tight text-white placeholder-slate-600 outline-none"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => {
            onAmountChange && onAmountChange(e.target.value);
          }}
        />
      </div>

      <div className="flex w-1/2 flex-col items-end justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Currency
        </span>

        <select
          className="cursor-pointer rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white outline-none transition-colors hover:border-slate-700 focus:border-indigo-500"
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange(e.target.value);
          }}
          value={selectedCurrency}
        >
          {currencyOptions.map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
