import React from "react";
import {Alert, Button} from "react-bootstrap";


export default function PageLoadAlert(props) {

    return (
        <>
            <Alert show={true} variant="success" className={'mt-4'}>
                <Alert.Heading>New Error</Alert.Heading>
                <p>
                   Something Went Wrong Please Try Letter
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => props.closeAlert()} variant="outline-success">
                        Close me y'all!
                    </Button>
                </div>
            </Alert>

        </>
    );
}