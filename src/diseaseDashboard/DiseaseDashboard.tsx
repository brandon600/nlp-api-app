import React, { useState } from 'react';
import { fetchArticles, fetchArticleDetails } from '../api/apiReq';
import '../App.css';

interface Article {
    uid: string;
    title: string;
    source: string;
    pubdate: string;
    link: string;
}

const DiseaseDashboard: React.FC = () => {
    const [disease, setDisease] = useState('');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const articleIds = await fetchArticles(disease);

        if (articleIds.length > 0) {
            const articleDetails = await fetchArticleDetails(articleIds);
            setArticles(articleDetails);
        }
        setLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    placeholder="Search for a disease"
                />
                <button type="submit">Search</button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) :
            (
                <div className="articles-list">
                    {articles.map((article) => (
                        <div key={article.uid}>
                            <h3>{article.title}</h3>
                            <p>{article.source}</p>
                            <p>{article.pubdate}</p>
                            {article.link && <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>}
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default DiseaseDashboard;