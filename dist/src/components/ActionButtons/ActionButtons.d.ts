import * as React from 'react';
interface ActionButtonsProps {
    applicationName: string;
    onSync?: () => void;
    onRefresh?: () => void;
    onDelete?: () => void;
    disabled?: boolean;
}
declare const ActionButtons: React.FC<ActionButtonsProps>;
export default ActionButtons;
