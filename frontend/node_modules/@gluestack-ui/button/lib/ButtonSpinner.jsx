import React, { forwardRef } from 'react';
import { useButtonContext } from './Context';
export const ButtonSpinner = (StyledButtonSpinner) => forwardRef((props, ref) => {
    const { hover, focus, active, disabled, focusVisible } = useButtonContext();
    return (<StyledButtonSpinner {...props} tabIndex={0} aria-label="loading" ref={ref} dataSet={{
            hover: hover,
            focus: focus,
            active: active,
            disabled: disabled,
            focusVisible: focusVisible,
        }} states={{
            hover: hover,
            focus: focus,
            active: active,
            disabled: disabled,
            focusVisible: focusVisible,
        }}/>);
});
