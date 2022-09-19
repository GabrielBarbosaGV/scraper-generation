import fc from "fast-check";
import { ResponseStatus } from "../constants";
import { responding } from './default-response';

describe('responding', () => {
    test('returned function sends OK response with expected content', () => {
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

                    const responder = responding((_) => anything);

                    responder(req, res);

                    expect(statusMock).toHaveBeenCalledWith(ResponseStatus.RES_OK);
                    expect(jsonReceiver).toHaveBeenCalledWith(anything);
                }
            )
        );
    });
});