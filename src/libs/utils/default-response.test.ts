import fc from "fast-check";
import { ResponseStatus } from "../constants";
import { responding, withUrlAndTopics } from './default-response';

describe('responding', () => {
    test('returned function sends OK response with expected content', () => {
        let assertionCount = 0;

        fc.assert(
            fc.property(
                fc.anything(),

                anything => {
                    const jsonReceiver = jest.fn();

                    const statusMock = jest.fn().mockReturnValue({
                        json: jsonReceiver
                    });

                    const res = { status: statusMock };

                    const req = jest.fn();

                    const responder = responding(async (_) => anything);

                    assertionCount += 2;

                    responder(req, res).then(_ => {
                        expect(statusMock).toHaveBeenCalledWith(ResponseStatus.RES_OK);
                        expect(jsonReceiver).toHaveBeenCalledWith(anything);
                    });
                }
            )
        );

        expect.assertions(assertionCount);
    });

    test('returned function errors when appropriate', () => {
        let assertionCount = 0;

        fc.assert(
            fc.property(
                fc.string(),

                name => {
                    const statusMock = jest.fn();
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

                    assertionCount += 2;

                    responder(req, res).then(_ => {
                        expect(statusMock).toHaveBeenCalledWith(ResponseStatus.INTERNAL_SERVER_ERROR);
                        expect(log).toHaveBeenCalled();
                    });
                }
            )
        );

        expect.assertions(assertionCount);
    });
});

describe('withUrlAndTopics', () => {
    test('extracts url and topics using parse', () => {
        let assertionCount = 0;

        fc.assert(
            fc.property(
                fc.record({
                    url: fc.string(),
                    topics: fc.array(fc.string(), { maxLength: 20 })
                }),

                urlAndTopics => {
                    const useMock = jest.fn();

                    const parse = jest.fn().mockReturnValue(urlAndTopics);

                    const responder = withUrlAndTopics(
                        useMock,
                        { parse }
                    );

                    const statusMock = jest.fn();

                    const [req, res] = [{ body: jest.fn() }, { status: statusMock }];

                    assertionCount += 2;

                    responder(req, res).then(_ => {
                        expect(parse).toHaveBeenCalled();
                        expect(useMock).toHaveBeenCalledWith(urlAndTopics);
                    });
                }
            )
        );

        expect.assertions(assertionCount);
    });
});