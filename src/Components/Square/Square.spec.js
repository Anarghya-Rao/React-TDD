import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import Square from "./Square";
import Board from "../Board/Board";

import ReactEighteenAdapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new ReactEighteenAdapter()});

describe("Basic rendering for Square", () => {
    
    it("Square is rendered", () => {
        const square = shallow(<Square value="" onSquareClick={null} />);
        expect(square.exists()).toBe(true);
    })

    it("Square is empty", () => {
        const square = render(<Square value="" onSquareClick={null} />);
        const value = square.getByTestId("square-button");
        expect(value.textContent).toBe("");
    })
})

describe("Testing Square functionality", () => {

    it("Square changes value to X on click", () => {
        const board = render(<Board />);
        const square = board.getAllByTestId("square-button")[0];
        fireEvent.click(square);
        expect(square.textContent).toBe("X");
    })

    it("Square value remains X when clicked second time", () =>{
        const board = render(<Board />);
        const square = board.getAllByTestId("square-button")[0];
        fireEvent.click(square);
        fireEvent.click(square);
        expect(square.textContent).toBe("X");
    })
})