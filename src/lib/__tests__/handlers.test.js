const handlers = require('../handlers');

test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() };

    handlers.home(req, res);

    expect(res.render.mock.calls[0][0]).toBe('home');
});

test('about page renders with fortune', () => {
    const req = {}
    const res = { render: jest.fn() };

    handlers.about(req, res);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('about');
    expect(res.render.mock.calls[0][1])
        .toEqual(expect.objectContaining({ fortune: expect.any(String) }));
});

test('404 page renders', () => {
    const req = {}
    const res = { status: jest.fn(), render: jest.fn() };

    handlers.notFound(req, res);

    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 page renders', () => {
    const err = new Error('test error');
    const req = {}
    const res = { status: jest.fn(), render: jest.fn() };
    const next = jest.fn();

    handlers.serverError(err, req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.render.mock.calls[0][0]).toBe('500');
});