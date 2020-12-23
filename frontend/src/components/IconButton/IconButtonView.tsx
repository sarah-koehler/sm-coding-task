import * as React from 'react';
import { Plus } from 'react-bootstrap-icons';

type Props = {
    Icon: typeof Plus,
    color?: string,
    className?: string,
    size?: number,
    onClick?: (e: React.MouseEvent) => any,
};

const IconButton = ({
    Icon,
    color,
    className,
    size,
    onClick,
}: Props): JSX.Element => (
    <Icon className={`IconButton ${className} text-${color}`} role="button" size={size} onClick={onClick} />
);

IconButton.defaultProps = {
    color: 'white',
    className: '',
    size: 32,
    onClick: undefined,
};

export default IconButton;
