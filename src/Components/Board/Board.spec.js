import React from "react";
import { shallow, configure } from "enzyme";
import { fireEvent, render } from "@testing-library/react";
import Board from "./Board";

import ReactEighteenAdapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new ReactEighteenAdapter()});


describe("Basic rendering of Board", () => {

    it("Board is rendered", () => {
        const board = shallow(<Board />);
        expect(board.exists()).toBe(true);
    })

    it("Board has 9 Squares", () => {
        const board = shallow(<Board />);
        const squares = board.find('Square');
        expect(squares.length).toBe(9);
    })

    it("Board status is set to 'Next Player: X'", () => {
        const board = render(<Board />);
        const status = board.getByTestId("status-value");
        expect(status.textContent).toBe("Next Player: X");
    })

})

describe("Testing Board functionality", () => {

    it("After Player X turn, Board status is set to 'Next Player: O'", () => {
        const board = render(<Board />);
        const square = board.getAllByTestId("square-button")[0];
        fireEvent.click(square);
        const status = board.getByTestId("status-value");
        expect(status.textContent).toBe("Next Player: O");

    })

    it("Board status set to 'Winner: X' when winner is Player X", () => {
        const board = render(<Board />);
        const squares = board.getAllByTestId("square-button");
        fireEvent.click(squares[0]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[2]);
        const status = board.getByTestId("status-value");
        expect(status.textContent).toBe("Winner: X");
    })

})