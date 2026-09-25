import { useState } from "react";


import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hook/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [isFromActive, setIsFromActive] = useState(true);
  const apiData = useCurrencyInfo(from);
  const options = Object.keys(apiData);
  let fromCal, toCal;
  const rates = apiData[to] || 1; //fallback
  if (isFromActive) {
    toCal = amount === "" ? "" : (amount * rates).toFixed(2);
    fromCal = amount;
  } else {
    fromCal = amount === "" ? "" : (amount / rates).toFixed(2);
    toCal = amount;
  }
  //swap logic
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 selection:bg-indigo-500 selection:text-white">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            Real-time Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Exchange<span className="text-indigo-400">Flow</span>
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
            Bi-directional Live Currency Converter
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* From Input Container */}
            <div className="w-full">
              <InputBox
                label="from"
                amount={fromCal}
                onAmountChange={(amountChange) => {
                  setAmount(amountChange);
                  setIsFromActive(true);
                }}
                onCurrencyChange={(currencyChange) => setFrom(currencyChange)}
                currencyOptions={options}
                selectedCurrency={from}
              />
            </div>

            {/* Swap Divider & Button */}
            <div className="relative my-1 flex items-center justify-center z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/80"></div>
              </div>
              <button
                type="button"
                className="relative flex cursor-pointer items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-indigo-600/30 transition-all duration-150 hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
                onClick={swap}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
                <span>Swap</span>
              </button>
            </div>

            {/* To Input Container */}
            <div className="w-full">
              <InputBox
                label="to"
                onAmountChange={(amountChange) => {
                  setAmount(amountChange);
                  setIsFromActive(false);
                }}
                onCurrencyChange={(currencyChange) => {
                  setTo(currencyChange);
                }}
                currencyOptions={options}
                selectedCurrency={to}
                amount={toCal}
              />
            </div>

            {/* Live Indicator Bar */}
            <div className="mt-4 flex items-center justify-center border-t border-slate-800/80 pt-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 translate-y-[1px]"></span>
                <span>
                  Live rates : 1 {from} = {rates.toFixed(2)} {to}
                </span>
              </span>
            </div>
          </form>
        </div>

        {/* Footer */}
        
        <footer className="mt-8 flex justify-center ">
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-400">
            <span>
              Built by{" "}
              <a
                href="https://github.com/AnkitSingh9933"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Anku
              </a>
            </span>

            <span className="text-slate-600">|</span>

            <span className="font-mono text-[11px] text-slate-400 translate-y-[2px]">
              v1.0
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
