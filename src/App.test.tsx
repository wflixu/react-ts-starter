import { render, cleanup, fireEvent } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

afterEach(cleanup);

describe("App", () => {
    test("When page loads, posts are rendered", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet("https://jsonplaceholder.typicode.com/posts").reply(200,
            [
                {
                    userId: 1, id: 1,
                    title: "title test 1",
                    body: "body test 1"
                },
                {
                    userId: 1,
                    id: 2, title: "title test 2",
                    body: "body test 2"
                }
            ]);
    });
});