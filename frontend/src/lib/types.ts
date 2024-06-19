export type Id = string;

export type List = {
    id: Id;
    name: string;
};

export type Item = {
    id: Id;
    list: Id;
    pos: number;
    name: string;
    complete: boolean;
};

export type FetchFunction = (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) => Promise<Response>;
