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
    responder: ((req: any) => any),
    {
        name,
        log
    }: RespondingOpts = defaultRespondingOpts
) => (req: any, res: any) => {
    try {
        const resultJson = responder(req);

        return res.status(ResponseStatus.RES_OK).json(resultJson);
    } catch (err) {
        log(`Requisition with body ${req.body}, for method ${name}, errored with ${err}`);

        return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
    }
};