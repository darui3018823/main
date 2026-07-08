const collectedDataRows = [
    ['お名前', 'ニックネームまたは本名'],
    ['件名・タイトル', 'お問い合わせの件名'],
    ['カテゴリ', 'お問い合わせの種類・詳細カテゴリ'],
    ['緊急度', 'お問い合わせの優先度'],
    ['返信方法', 'Email / Discord / その他SNS / 返信不要'],
    ['連絡先', 'メールアドレス / Discordユーザー名 / SNSアカウント'],
    ['お問い合わせ内容', 'お問い合わせの本文'],
];

const serviceStorage = [
    ['Formspree', 'お問い合わせフォームのデータ送信・管理サービス'],
    ['管理者', 'すべてのデータは darui3018823 の管理下に置かれます。'],
];

const usagePurposes = [
    ['お問い合わせへの対応', 'ユーザーからのお問い合わせ内容の確認・回答'],
    ['返信の送信', 'ユーザーが指定した方法での返信'],
    ['サービス改善', 'お問い合わせ傾向の分析によるサービス向上'],
];

const prohibitedUses = [
    '第三者へのデータ販売',
    '広告目的での利用',
    'ユーザーのプロファイリング',
    'その他、お問い合わせ対応以外での利用',
];

export default function PrivacyPolicy({ onBack }) {
    return (
        <main className="contact-main policy-main">
            <section className="liquid-glass contact-panel policy-panel" aria-labelledby="contactTitle">
                <a
                    className="contact-back"
                    href="/contact/"
                    onClick={(event) => {
                        event.preventDefault();
                        onBack();
                    }}
                >
                    ← お問い合わせページに戻る
                </a>

                <header className="policy-header">
                    <h1 id="contactTitle" className="policy-title">プライバシーポリシー</h1>
                    <p className="policy-subtitle">Privacy Policy</p>
                    <p className="policy-updated">最終更新日: 2026年1月10日</p>
                </header>

                <section className="policy-important" aria-labelledby="policyImportantTitle">
                    <h2 id="policyImportantTitle">重要: データ収集について</h2>
                    <p>
                        本お問い合わせフォームでは、お問い合わせの対応および返信のために必要な情報を収集します。
                        フォームを送信する前に、本ポリシーをよくお読みください。
                    </p>
                </section>

                <div className="policy-content">
                    <PolicyChapter title="第1章 総則" id="pp-ch1">
                        <PolicyArticle title="第1条（目的）">
                            <p>本プライバシーポリシー（以下「本ポリシー」）は、daruks.com のお問い合わせフォーム（以下「本サービス」）におけるユーザーの個人情報の取り扱いについて定めるものです。</p>
                            <p>本サービスを利用するすべてのユーザー（以下「ユーザー」）は、本ポリシーに同意したものとみなします。</p>
                        </PolicyArticle>
                        <PolicyArticle title="第2条（適用範囲）">
                            <p>本ポリシーは、daruks.com が提供するすべてのお問い合わせフォームに適用されます。</p>
                            <p>
                                また、関連するウェブサイト（
                                <a href="https://daruks.com/" target="_blank" rel="noopener noreferrer">https://daruks.com/</a>
                                ）の利用にも適用されます。
                            </p>
                        </PolicyArticle>
                        <PolicyArticle title="第3条（定義）">
                            <ol>
                                <li>「本サービス」とは、daruks.com が提供するお問い合わせフォーム機能を指します。</li>
                                <li>「サービス提供者」とは、本サービスを管理・運営する者を指し、darui3018823 がこれに該当します。</li>
                                <li>「ユーザー」とは、本サービスを利用するすべての個人または法人を指します。</li>
                                <li>「個人情報」とは、第2章に記載の項目を指します。</li>
                            </ol>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第2章 収集する情報" id="pp-ch2">
                        <PolicyArticle title="第4条（収集するデータの範囲）">
                            <p>本サービスでは、以下の情報を収集・保存します。</p>
                            <h4>お問い合わせフォームで収集するデータ</h4>
                            <div className="policy-table-wrap">
                                <table className="policy-data-table">
                                    <thead>
                                        <tr>
                                            <th>項目</th>
                                            <th>説明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {collectedDataRows.map(([label, description]) => (
                                            <tr key={label}>
                                                <td>{label}</td>
                                                <td>{description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="policy-small">※ 上記のデータは、お問い合わせへの対応および返信のためにのみ使用されます。</p>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第3章 データの保存方法" id="pp-ch3">
                        <PolicyArticle title="第5条（ストレージと安全性）">
                            <p>収集したデータは、以下の方法で安全に保存されます。</p>
                            <div className="policy-info-list">
                                {serviceStorage.map(([title, description]) => (
                                    <div className="policy-info-item" key={title}>
                                        <h4>{title}</h4>
                                        <p>{description}</p>
                                    </div>
                                ))}
                            </div>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第4章 データの保持期間" id="pp-ch4">
                        <PolicyArticle title="第6条（データの保持）">
                            <ol>
                                <li>収集したデータは、お問い合わせへの対応が完了するまで保持されます。</li>
                                <li>対応完了後、適切なタイミングでデータの整理・削除を行います。</li>
                                <li>法的要請がある場合は、必要な期間保持される場合があります。</li>
                            </ol>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第5章 データの利用目的" id="pp-ch5">
                        <PolicyArticle title="第7条（利用目的）">
                            <p>収集したデータは、以下の目的のみに使用されます。</p>
                            <div className="policy-info-list">
                                {usagePurposes.map(([title, description]) => (
                                    <div className="policy-info-item is-purpose" key={title}>
                                        <h4>{title}</h4>
                                        <p>{description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="policy-negative">
                                <h4>以下の利用は行いません</h4>
                                <ul>
                                    {prohibitedUses.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第6章 第三者提供" id="pp-ch6">
                        <PolicyArticle title="第8条（第三者提供の有無）">
                            <p>本サービスは、基本的にすべてのデータを第三者に提供することは一切ありません。</p>
                            <p>ただし、以下の条件に該当する場合は、この限りではありません。</p>
                            <ol>
                                <li>ユーザーが明示的に同意した場合</li>
                                <li>法的要請（裁判所命令、警察からの正式な請求）があった場合</li>
                                <li>サービス提供上の技術的要請が発生した場合（最小限の情報に限る）</li>
                            </ol>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第7章 ユーザーの権利" id="pp-ch7">
                        <PolicyArticle title="第9条（データの開示請求）">
                            <p>ユーザーは、自身に関するデータの開示を請求することができます。</p>
                            <p>開示請求は、下記のお問い合わせ窓口までご連絡ください。</p>
                        </PolicyArticle>
                        <PolicyArticle title="第10条（データ削除リクエスト）">
                            <p>データの削除をご希望の場合は、お問い合わせ窓口までご連絡ください。</p>
                            <p>ただし、対応中のお問い合わせに関するデータは、対応完了まで削除できない場合があります。</p>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第8章 お問い合わせ" id="pp-ch8">
                        <PolicyArticle title="第11条（問い合わせ方法）">
                            <p>本プライバシーポリシーに関するお問い合わせ、データの開示請求、削除依頼は以下の窓口までご連絡ください。</p>
                            <div className="policy-info-item">
                                <h4>Discord</h4>
                                <p className="policy-mono">@darui3018823</p>
                                <p>24時間受け付けていますが、返信には時間がかかる場合があります。</p>
                            </div>
                        </PolicyArticle>
                    </PolicyChapter>

                    <PolicyChapter title="第9章 その他" id="pp-ch9">
                        <PolicyArticle title="第12条（ポリシーの変更）">
                            <ol>
                                <li>本プライバシーポリシーは、事前告知なしに変更される場合があります。</li>
                                <li>変更があった場合であっても、原則としてユーザーへの通知は行いません。</li>
                                <li>最新のプライバシーポリシーは、常に本ページで確認できます。</li>
                            </ol>
                        </PolicyArticle>
                        <PolicyArticle title="第13条（準拠法および管轄裁判所）">
                            <ol>
                                <li>本ポリシーは日本法に準拠し、東京地方裁判所を第一審の専属的管轄裁判所とします。</li>
                                <li>ユーザーの居住地の法と日本国法が相反する項目があった場合でも、日本国法を優先します。</li>
                            </ol>
                        </PolicyArticle>
                        <PolicyArticle title="第14条（その他の事項）">
                            <p>本ポリシーに明示的な定めがない事項については、サービス提供者の裁量により、法令及び本サービスの趣旨に照らして適切に判断・対応するものとします。</p>
                        </PolicyArticle>
                        <p className="policy-end">以上</p>
                    </PolicyChapter>

                    <PolicyChapter title="改定履歴" id="pp-changelog">
                        <div className="policy-changelog-item">
                            <p>2026-01-10</p>
                            <span>初版を公開しました。</span>
                        </div>
                    </PolicyChapter>
                </div>
            </section>
        </main>
    );
}

function PolicyChapter({ id, title, children }) {
    return (
        <section className="policy-chapter" id={id}>
            <div className="policy-chapter-header">
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

function PolicyArticle({ title, children }) {
    return (
        <section className="policy-article">
            <h3>{title}</h3>
            {children}
        </section>
    );
}
