export interface ITreantObject {
    text: {
        name: string;
    };
    children: ITreantObject[];
}
export interface ID3Object {
    name: string;
    children: ID3Object[];
}
export interface ISubsection {
    id: number;
    name: string;
    subsections: ISubsection[];
    status: number;
}
