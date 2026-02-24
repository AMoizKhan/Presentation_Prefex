import React, { useState , useEffect} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const RandomWords = () => {
    const [randomWords, setRandomWords] = useState([]);
    const [wordDefinitions, setWordDefinitions] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user , setUser] = useState(null)
    const MAX_WORDS = 5; // Maximum number of words to fetch
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData)
    })
    const fetchRandomWords = async () => {
        setLoading(true);
        setError(null);
        try {
            let newWords = [];
            let newDefinitions = {};
            while (newWords.length < MAX_WORDS) {
                const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
                if (!response.ok) {
                    throw new Error("Failed to fetch random word");
                }
                const data = await response.json();
                const word = data[0];
                const definitions = await fetchDefinitions(word);
                if (definitions.length > 0) {
                    newWords.push(word);
                    newDefinitions[word] = definitions[0]; // Save only the first definition
                }
            }
            setRandomWords(newWords);
            setWordDefinitions(newDefinitions);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching random words:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDefinitions = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch meaning for word: ${word}`);
            }
            const data = await response.json();
            console.log(data); // Log the data to understand the structure
            if (data[0] && data[0].meanings) {
                

                const definitions = data[0].meanings.map(meaning =>
                    meaning.definitions[0]?.definition // Extract only the first definition
                ) 
                || [];
                
                return definitions;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching word meanings:", error.message);
            return [];
        }
    };

    return (
        // <>
        // <Navbar/>
        // <div className="bg-[#0b0c10] text-white flex flex-col items-center justify-center min-h-screen">
        //     <section className="max-w-4xl mx-auto px-6 py-8">
        //         <div className="mb-8 text-center">
        //             <h2 className="text-3xl font-bold mb-2">Words with Meanings</h2>
        //             <p className="text-lg text-gray-400 font-semibold">
        //                 Discover the meanings of randomly generated words.
        //             </p>
        //         </div>
        //         {error && <p className="text-red-500">{error}</p>}
        //         <ul className="list-disc pl-5 mb-4">
        //             {randomWords.map((word, index) => (
        //                 <li key={index} className="mb-2">
        //                     <strong>{word}:</strong> 
        //                     {wordDefinitions[word]}
        //                 </li>
        //             ))}
        //         </ul>
        //         <button
        //             onClick={fetchRandomWords}
        //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        //         >
        //             Generate Words
        //         </button>
        //     </section>
        //     <Footer />
        // </div>
        // </>
        <>
        <Navbar userDataProps={user}/>
        <div className="bg-[#0b0c10] text-white flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-4xl mx-auto py-8 px-6">
                <h2 className="text-3xl font-bold mb-4">Words with Meanings</h2>
                {error && <p className="text-red-500">{error}</p>}
                <ul className="list-disc pl-5 mb-8">
                    {randomWords.map((word, index) => (
                        <li key={index} className="mb-2">
                            <strong>{word}:</strong> 
                            &nbsp; {wordDefinitions[word]}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={fetchRandomWords}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Words'}
                </button>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default RandomWords;




