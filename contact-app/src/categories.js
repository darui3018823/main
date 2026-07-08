export const FORMSPREE_URL = 'https://formspree.io/f/xdaanaya';

export const CATEGORIES = [
    {
        key: 'thisbot',
        icon: 'bot',
        listTitle: 'This is bot Services上のBotに関するお問い合わせ',
        listDescription: '機能・使用方法、不具合報告・ご相談など。',
        formTitle: 'This is bot Services上のBotに関するお問い合わせ',
        formDescription: '機能・使用方法・不具合報告などがございましたら、お気軽にお問い合わせください。',
        subcategories: ['機能について', '使用方法について', '不具合報告', 'その他'],
    },
    {
        key: 'siteissue',
        icon: 'monitor',
        listTitle: 'サイトに関する問題 / 提案',
        listDescription: '表示崩れ・リンク切れのご報告や、改善アイデア・ご要望など。',
        formTitle: 'サイトに関する問題 / 提案',
        formDescription: 'このサイトの不具合のご報告や、機能追加・改善のご提案をお聞かせください。',
        subcategories: [
            '表示が崩れている',
            'リンクが切れている',
            'ページが開かない',
            '機能追加のご提案',
            '改善のご提案',
            'デザインについて',
            'その他',
        ],
    },
    {
        key: 'personal',
        icon: 'user',
        listTitle: '個人へのお問い合わせ',
        listDescription: '権利関係や個人的なご質問など。',
        formTitle: 'darui3018823個人へのお問い合わせ',
        formDescription: '個人的なご質問やご連絡はこちらからお願いします。',
        subcategories: ['コラボレーション相談', '出演依頼', 'ビジネス相談', '権利関係', 'その他'],
    },
    {
        key: 'ahoshinet',
        icon: 'ahoshinet',
        listTitle: 'Ahoshinet Groupsについてのお問い合わせ',
        listDescription: 'グループのサイトで受け付けています。',
        formTitle: 'Ahoshinet Groupsに関するお問い合わせ',
        formDescription: 'お問い合わせはグループのサイトで直接受け付けています。',
        direct: { url: 'https://corp.daruks.com/', label: 'グループサイトへ ↗' },
    },
];
