import { ResponseStatus } from '../constants';

interface RespondingOpts {
    name: string,
    log: (s: string) => void
}

const defaultRespondingOpts = {
    name: 'Default Name',
    log: console.log
};

export const responding = (
    responder: ((req: any) => Promise<any>),
    {
        name,
        log
    }: RespondingOpts = defaultRespondingOpts
) => async (req: any, res: any) => {
    try {
        const resultJson = await responder(req);

        return res.status(ResponseStatus.RES_OK).json(resultJson);
    } catch (err) {
        log(`Requisition with body ${req.body}, for method ${name}, errored with ${err.stack}`);

        return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
    }
};

interface UrlAndTopics {
    url: string,
    topics: string[]
}

interface WithUrlAndTopicsOpts {
    parse: (s: string) => any,
    responding: typeof responding,
    name: string
}

export const defaultWithUrlAndTopicsOpts = {
    parse: JSON.parse,
    responding,
    name: 'Default Name'
};

export const withUrlAndTopics = (
    use: (uat: UrlAndTopics) => Promise<any>,
    {
        parse,
        responding,
        name
    }: WithUrlAndTopicsOpts
) => responding(async req => use(parse(req.body) as UrlAndTopics), { log: console.log, name });