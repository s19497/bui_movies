import {RouteComponentProps} from "react-router";

export function setQuery(props: RouteComponentProps, entries: { [key: string]: string }) {
    let prevQuery = new URLSearchParams(props.location.search);
    Object.entries(entries).forEach(value => prevQuery.set(...value));
    props.history.push('?' + prevQuery.toString());
}

export function delQuery(props: RouteComponentProps, ...keys: string[]) {
    let prevQuery = new URLSearchParams(props.location.search);
    keys.forEach(prevQuery.delete);
    props.history.push('?' + prevQuery.toString());
}
