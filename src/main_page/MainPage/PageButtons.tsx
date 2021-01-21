import React, {useState} from "react";
import {RouteComponentProps} from "react-router";
import {Button} from "react-bootstrap";

type PageButtonsProps = {
    totalPages: number
    currentPage: number
} & RouteComponentProps;

const PageButtons: React.FC<PageButtonsProps> = (props) => {
    function flipPage(next: boolean) {
        let newPage = props.currentPage + (next ? 1 : -1);
        if (newPage > 0) {
            let prevQuery = new URLSearchParams(props.location.search);
            prevQuery.set('page', newPage.toString());
            props.history.push('?' + prevQuery.toString());
        }
    }

    return (
        <div>
            <Button onClick={(e) => flipPage(false)}>Prev</Button>
            <Button variant="outline-secondary" className="disabled">
                {props.currentPage} / {props.totalPages}
            </Button>
            <Button onClick={(e) => flipPage(true)}>Next</Button>
        </div>
    )
}

export default PageButtons;