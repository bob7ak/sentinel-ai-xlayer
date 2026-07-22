function extractSymbol(input = {}) {

    // If caller already supplied a symbol, use it.
    if (input.symbol) {

        let symbol = input.symbol.toUpperCase();

        if (!symbol.includes("-"))
            symbol += "-USDT";

        return symbol;
    }

    const text =
        (input.request || input.prompt || input.query || "")
        .toUpperCase();

    // Find the first ticker-like word
    const matches =
        text.match(/\b[A-Z0-9]{2,15}\b/g);

    if (!matches)
        return null;

    const blacklist = new Set([
        "ANALYZE",
        "ANALYSIS",
        "SHOULD",
        "BUY",
        "SELL",
        "PRICE",
        "RISK",
        "WHAT",
        "IS",
        "THE",
        "TODAY",
        "PLEASE",
        "FOR",
        "OF",
        "TO",
        "AND",
        "GET",
        "SHOW",
        "ME"
    ]);

    for (const word of matches) {

        if (!blacklist.has(word))
            return `${word}-USDT`;

    }

    return null;
}

module.exports = {
    extractSymbol
};