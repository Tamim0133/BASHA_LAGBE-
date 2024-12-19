import React, { forwardRef } from 'react';
import { useButtonContext } from './Context';
export const ButtonText = (StyledButtonText) => forwardRef(({ children, ...props }, ref) => {
    const { hover, focus, active, disabled, focusVisible } = useButtonContext();
    return (<StyledButtonText ref={ref} {...props} states={{
            hover: hover,
            focus: focus,
            active: active,
            disabled: disabled,
            focusVisible: focusVisible,
        }} dataSet={{
            hover: hover,
            focus: focus,
            active: active,
            disabled: disabled,
            focusVisible: focusVisible,
        }}>
        {children}
      </StyledButtonText>);
});
