import { ResponseStatus } from '../constants';

interface RespondingOpts {
    name: string
}

const defaultRespondingOpts = {
    name: 'Default Name'
};

export const responding = (
    responder: ((req: any) => any),
    { name }: RespondingOpts = defaultRespondingOpts
) => (req: any, res: any) => {
    try {
        const resultJson = responder(req);

        return res.status(ResponseStatus.RES_OK).json(resultJson);
    } catch (err) {
        console.log(`Requisition with body ${req.body}, for method ${name}, errored with ${err}`);

        return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
    }
};