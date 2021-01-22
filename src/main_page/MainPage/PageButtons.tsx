import React, {useState} from "react";
import {RouteComponentProps} from "react-router";
import {Button} from "react-bootstrap";
import {setQuery} from "../../util/util";

type PageButtonsProps = {
    totalPages: number
    currentPage: number
} & RouteComponentProps;

const PageButtons: React.FC<PageButtonsProps> = (props) => {
    function flipPage(next: boolean) {
        let newPage = props.currentPage + (next ? 1 : -1);
        if (newPage > 0 && newPage <= props.totalPages) {
            setQuery(props, {'page': newPage.toString()});
            window.scrollTo({top: 0});
        }
    }

    return (
        <div className="PageButtons m-auto">
            <Button onClick={(e) => flipPage(false)}>Prev</Button>
            <Button variant="outline-secondary" className="disabled">
                {props.currentPage} / {props.totalPages}
            </Button>
            <Button onClick={(e) => flipPage(true)}>Next</Button>
        </div>
    )
}

export default PageButtons;