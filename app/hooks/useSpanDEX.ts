import { useState, useEffect } from 'react';

const fetchQuoteFromDEX = async (url, params) => {
    const response = await fetch(`${url}?${new URLSearchParams(params)}`);
    if (!response.ok) {
        throw new Error(`Error fetching quote from ${url}`);
    }
    return response.json();
};

const useSpanDEX = () => {
    const [quotes, setQuotes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            setLoading(true);
            setError(null);
            const params = { /* Add necessary params */ };
            const dexUrls = {
                Fabric: 'https://api.fabric.com/quote',
                '0x': 'https://api.0x.org/swap/v1/quote',
                Kyber: 'https://api.kyber.network/swap',
                Odos: 'https://api.odos.io/v1/quote',
            };

            try {
                const fetchPromises = Object.keys(dexUrls).map(async (key) => {
                    const quote = await fetchQuoteFromDEX(dexUrls[key], params);
                    return { dex: key, quote };
                });

                const results = await Promise.all(fetchPromises);
                const quotesObj = results.reduce((acc, { dex, quote }) => {
                    acc[dex] = quote;
                    return acc;
                }, {});
                setQuotes(quotesObj);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    return { quotes, loading, error };
};

export default useSpanDEX;
