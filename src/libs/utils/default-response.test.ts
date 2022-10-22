import fc from "fast-check";
import { ResponseStatus } from "../constants";
import { defaultWithUrlAndTopicsOpts, responding, withUrlAndTopics } from './default-response';

describe('responding', () => {
    test('returned function sends OK response with expected content', () => {
        return fc.assert(
            fc.asyncProperty(
                fc.anything(),

                async anything => {
                    const jsonReceiver = jest.fn();

                    const statusMock = jest.fn().mockReturnValue({
                        json: jsonReceiver
                    });

                    const res = { status: statusMock };

                    const req = jest.fn();

                    const responder = responding(async (_) => anything);

                    await responder(req, res)

                    expect(statusMock).toHaveBeenCalledWith(ResponseStatus.RES_OK);
                    expect(jsonReceiver).toHaveBeenCalledWith(anything);
                }
            )
        );
    });

    test('returned function errors when appropriate', () => {
        return fc.assert(
            fc.asyncProperty(
                fc.string(),

                async name => {
                    const jsonReceiver = jest.fn();

                    const statusMock = jest.fn().mockReturnValue({
                        json: jsonReceiver
                    });

                    const log = jest.fn();

                    const responder = responding(
                        async (_) => {
                            throw new Error('Ayy');
                        },
                        {
                            name,
                            log
                        }
                    );

                    const [req, res] = [jest.fn(), { status: statusMock }];

                    await responder(req, res)

                    expect(statusMock).toHaveBeenCalledWith(ResponseStatus.INTERNAL_SERVER_ERROR);
                    expect(log).toHaveBeenCalled();
                }
            )
        );
    });
});

describe('withUrlAndTopics', () => {
    test('extracts url and topics using parse', () => {
        return fc.assert(
            fc.asyncProperty(
                fc.record({
                    url: fc.string(),
                    topics: fc.array(fc.string(), { maxLength: 20 })
                }),

                async urlAndTopics => {
                    const useMock = jest.fn();

                    const parse = jest.fn().mockReturnValue(urlAndTopics);

                    const responder = withUrlAndTopics(
                        useMock,
                        { ...defaultWithUrlAndTopicsOpts, parse }
                    );

                    const jsonReceiver = jest.fn();

                    const statusMock = jest.fn().mockReturnValue({
                        json: jsonReceiver
                    });

                    const [req, res] = [{ body: jest.fn() }, { status: statusMock }];

                    await responder(req, res)

                    expect(parse).toHaveBeenCalled();
                    expect(useMock).toHaveBeenCalledWith(urlAndTopics);
                }
            )
        );
    });
});