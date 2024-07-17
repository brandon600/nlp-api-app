const API_BASE_URL = '/entrez/eutils/';

interface MedResponse {
    esearchresult: {
      idlist: string[];
    };
  }

  interface ArticleSummary {
    uid: string;
    title: string;
    source: string;
    pubdate: string;
    link: string;
  }

  interface SummaryResponse {
    result: {
        [key: string]: ArticleSummary | any;
        uids: string[];
    }
  }


  const fetchArticles = async (searchTerm: string): Promise<string[]> => {
    try {
        const response = await fetch (
            `${API_BASE_URL}esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerm)}&retmode=json&retmax=10`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data: MedResponse = await response.json();
        const articleIds = data.esearchresult.idlist;
        return articleIds;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
  }

  const fetchArticleDetails = async (ids: string[]): Promise<ArticleSummary[]> => {
    try {
        const response = await fetch (
            `${API_BASE_URL}esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

            const data: SummaryResponse = await response.json();
            const summaries = data.result.uids.map(uid => {
                const article = data.result[uid];
                const link = article.elocationid ? `https://pubmed.ncbi.nlm.nih.gov/${uid}/` : '';
                return {
                  uid: article.uid,
                  title: article.title,
                  source: article.fulljournalname,
                  pubdate: article.pubdate,
                  link: link
                };
              });
              return summaries;
        } catch (error) {
            console.error('Error fetching article details:', error);
            return [];
    }
  }

  export { fetchArticles, fetchArticleDetails };