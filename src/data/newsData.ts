export interface NewsArticle {
    id: string;
    title: string;
    summary?: string;
    content?: string;
    url?: string;
    imageUrl?: string;
    source: {
        name: string;
        url?: string;
        id?: string;
    } | string; // keeping string union for legacy data compatibility if needed initially
    publishedAt?: string;
    time?: string; // legacy support
    image?: string; // legacy support
    category?: string; // legacy support
    author?: string;
    topics?: string[];
}

export const topStories: NewsArticle[] = [
    {
        id: '1',
        title: 'Bago Swears in Commissioners, 25 LG chairmen, Vice Chairmen',
        source: 'Channels Television',
        time: '9 hours ago',
        image: '/news/politics.jpg',
        category: 'Politics'
    },
    {
        id: '2',
        title: 'Niger gov appoints new commissioners, others',
        source: 'Punch Newspapers',
        time: '2 hours ago - By Chika Otuchikere',
        category: 'Politics'
    },
    {
        id: '3',
        title: '2027 Vote: Stopping Me From Backing Unpopular Officials',
        source: 'Daily Trust',
        time: 'Yesterday - By Abubakar Atede',
        category: 'Politics'
    }
];

export const secondaryStories: NewsArticle[] = [
    {
        id: '4',
        title: 'Malami yet to meet bail requirements, says EFCC',
        source: 'Vanguard News',
        time: '3 hours ago',
        image: '/news/efcc.jpg',
        category: 'Politics'
    },
    {
        id: '5',
        title: 'EFCC: Malami rejects ownership of 46 bank accounts, link with...',
        source: 'The Nation Newspaper',
        time: '2 hours ago - By Dale Andi',
        category: 'Politics'
    },
    {
        id: '6',
        title: 'APC backs Malami, condemns EFCC\'s relocation of bail',
        source: 'Punch Newspapers',
        time: '3 hours ago - By Babatope O. Odelusi',
        category: 'Politics'
    }
];

export const thirdStory: NewsArticle = {
    id: '7',
    title: "'Wire naked wife of Rivers politics, Tinubu picked right PDP product' – Akwaor",
    source: 'Daily Post Nigeria',
    time: '4 hours ago - By Victor Ogunje',
    image: '/news/politics2.jpg',
    category: 'Politics'
};

export const fourthStory: NewsArticle = {
    id: '8',
    title: 'Gov Yusuf pardons Ganduje a parallel Kano pol bd',
    source: 'The Nation Newspaper',
    time: '7 hours ago - By Mustapha Isah',
    image: '/news/politics.jpg',
    category: 'Politics'
};

export const picksForYou: NewsArticle[] = [
    {
        id: '9',
        title: "'Going to the Bernabeu is dangerous' - La Liga told referees don't wear 'Real Madrid or...",
        source: 'Marca Blaugrana',
        time: '23 hours ago',
        image: '/news/sports1.jpg',
        category: 'Sports'
    },
    {
        id: '10',
        title: "50 Cent's 'Beam Combo: The Kissing' deepfake Diddy's legal woes",
        source: 'Vanguard News',
        time: '12 hours ago',
        image: '/news/entertainment.jpg',
        category: 'Entertainment'
    },
    {
        id: '11',
        title: 'How Wizkid reclaimed his mantle in 2025',
        source: 'The Nation Newspaper',
        time: '15 hours ago - By Olaitan Ganiu',
        image: '/news/music.jpg',
        category: 'Entertainment'
    }
];

export const forYouArticles: NewsArticle[] = [
    {
        id: '12',
        title: 'Sad end for the family life, Barrister ends life at 40 after killing wife and 3 children',
        source: 'Vanguard News',
        time: '14 hours ago - By Eze Anaba',
        image: '/news/politics.jpg',
        category: 'Nigeria'
    },
    {
        id: '13',
        title: "Tinubu's son-in-law joins race for wedding - world record",
        source: 'Premium Times',
        time: '9 hours ago',
        image: '/news/entertainment.jpg',
        category: 'Entertainment'
    },
    {
        id: '14',
        title: 'Tinubu intervening police power - Abayomi Isah and 3 others',
        source: 'The Cable',
        time: '6 hours ago - By Eze Anaba',
        image: '/news/politics2.jpg',
        category: 'Nigeria'
    },
    {
        id: '15',
        title: 'Alleged corruption: Tinubu urged to sack minister from govt',
        source: 'Daily Post Nigeria',
        time: '11 hours ago',
        category: 'Politics'
    },
    {
        id: '16',
        title: 'Bobrisky sues EFCC, demands N1.2bn for alleged rights violation',
        source: 'Punch Newspapers',
        time: '8 hours ago - By Eze Anaba',
        image: '/news/entertainment.jpg',
        category: 'Entertainment'
    },
    {
        id: '17',
        title: 'Obi visits Ganduje, condemns a parallel Kano pol bd',
        source: 'The Nation Newspaper',
        time: '13 hours ago - By Mustapha Isah',
        image: '/news/politics.jpg',
        category: 'Politics'
    }
];

// Your Topics - Nigeria
export const nigeriaNews: NewsArticle[] = [
    {
        id: '18',
        title: 'Tinubu appoints new commissioners, others',
        source: 'Premium Times',
        time: '5 hours ago',
        image: '/news/politics.jpg',
        category: 'Nigeria'
    },
    {
        id: '19',
        title: 'NNPC announces new fuel price reduction across Nigeria',
        source: 'The Cable',
        time: '3 hours ago',
        category: 'Nigeria'
    },
    {
        id: '20',
        title: 'CBN raises interest rate to 18.5% to curb inflation',
        source: 'BusinessDay',
        time: '7 hours ago',
        image: '/news/politics2.jpg',
        category: 'Nigeria'
    }
];

// Your Topics - Entertainment
export const entertainmentNews: NewsArticle[] = [
    {
        id: '21',
        title: 'Burna Boy wins Grammy for Best Global Music Album',
        source: 'The Nation Newspaper',
        time: '2 hours ago',
        image: '/news/music.jpg',
        category: 'Entertainment'
    },
    {
        id: '22',
        title: 'Nollywood actress Funke Akindele breaks box office record',
        source: 'Vanguard News',
        time: '6 hours ago',
        category: 'Entertainment'
    },
    {
        id: '23',
        title: 'Davido announces world tour dates for 2025',
        source: 'Pulse Nigeria',
        time: '4 hours ago',
        image: '/news/entertainment.jpg',
        category: 'Entertainment'
    }
];

// Your Topics - Business
export const businessNews: NewsArticle[] = [
    {
        id: '24',
        title: 'Dangote Refinery begins full operations, to supply 650,000 barrels daily',
        source: 'BusinessDay',
        time: '1 hour ago',
        image: '/news/politics.jpg',
        category: 'Business'
    },
    {
        id: '25',
        title: 'Nigerian Stock Exchange hits all-time high amid economic reforms',
        source: 'The Guardian',
        time: '5 hours ago',
        category: 'Business'
    },
    {
        id: '26',
        title: 'Tech startup raises $50m in Series B funding',
        source: 'TechCabal',
        time: '8 hours ago',
        image: '/news/politics2.jpg',
        category: 'Business'
    }
];

// Digital Currencies
export const digitalCurrencies: NewsArticle[] = [
    {
        id: '27',
        title: 'Bitcoin surges past $100,000 amid institutional adoption',
        source: 'CoinDesk',
        time: '2 hours ago',
        image: '/news/politics.jpg',
        category: 'Digital Currencies'
    },
    {
        id: '28',
        title: 'Nigeria launches eNaira 2.0 with enhanced features',
        source: 'BusinessDay',
        time: '6 hours ago',
        category: 'Digital Currencies'
    },
    {
        id: '29',
        title: 'Ethereum upgrade promises faster, cheaper transactions',
        source: 'CoinTelegraph',
        time: '4 hours ago',
        image: '/news/politics2.jpg',
        category: 'Digital Currencies'
    }
];

// Music
export const musicNews: NewsArticle[] = [
    {
        id: '30',
        title: 'Wizkid and Rihanna collaboration breaks streaming records',
        source: 'Billboard',
        time: '3 hours ago',
        image: '/news/music.jpg',
        category: 'Music'
    },
    {
        id: '31',
        title: 'Afrobeats dominates global charts for third consecutive year',
        source: 'Rolling Stone',
        time: '7 hours ago',
        category: 'Music'
    },
    {
        id: '32',
        title: 'Tems wins Best New Artist at the Grammys',
        source: 'Variety',
        time: '5 hours ago',
        image: '/news/entertainment.jpg',
        category: 'Music'
    }
];

// Personal Finance
export const personalFinance: NewsArticle[] = [
    {
        id: '33',
        title: '5 investment strategies to beat inflation in 2025',
        source: 'Financial Times',
        time: '4 hours ago',
        image: '/news/politics.jpg',
        category: 'Personal Finance'
    },
    {
        id: '34',
        title: 'How to save 30% of your income with these simple tips',
        source: 'Money Magazine',
        time: '9 hours ago',
        category: 'Personal Finance'
    },
    {
        id: '35',
        title: 'Real estate investment trusts offer 15% annual returns',
        source: 'The Economist',
        time: '6 hours ago',
        image: '/news/politics2.jpg',
        category: 'Personal Finance'
    }
];

export const categories = [
    'Home',
    'For you',
    'Following',
    'Nigeria',
    'World',
    'Local',
    'Business',
    'Technology',
    'Entertainment',
    'Sports',
    'Science',
    'Health'
];

