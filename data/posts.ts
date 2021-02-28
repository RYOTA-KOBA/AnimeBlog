export type Post = {
    id: number;
    title: string;
    content: string;
};

export const posts: Post[] = [
    {
        id: 1,
        title: 'テストデータ1',
        content:
            "テストデータ1ですよ"
    },
    {
        id: 2,
        title: 'テストデータ2',
        content:
            "テストデータ2ですよ"
    },
];