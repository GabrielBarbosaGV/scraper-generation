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
        const resultJson = responder(req);

        return res.status(ResponseStatus.RES_OK).json(resultJson);
    } catch (err) {
        log(`Requisition with body ${req.body}, for method ${name}, errored with ${err}`);

        return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
    }
};

interface UrlAndTopics {
    url: string,
    topics: string[]
}

interface WithUrlAndTopicsOpts {
    parse?: (s: string) => any,
    responding?: typeof responding
}

const defaultWithUrlAndTopicsOpts = {
    parse: JSON.parse,
    responding
};

export const withUrlAndTopics = (
    use: (uat: UrlAndTopics) => Promise<any>,
    {
        parse = defaultWithUrlAndTopicsOpts.parse,
        responding = defaultWithUrlAndTopicsOpts.responding
    }: WithUrlAndTopicsOpts = defaultWithUrlAndTopicsOpts
) => responding(async req => use(parse(req.body) as UrlAndTopics));