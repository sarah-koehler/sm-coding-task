import * as React from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';
import './Spinner.scss';

type Props = {
    enabled?: boolean,
};

const Spinner = ({ enabled }: Props): JSX.Element | null => (enabled ? (
    <div className="Spinner">
        <BSpinner animation="border" variant="primary" />
    </div>
) : null);

Spinner.defaultProps = {
    enabled: false,
};

export default Spinner;
