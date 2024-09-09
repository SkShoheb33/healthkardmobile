import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerContainer = ({ isVisible, children, style }) => {
    return (
        <ShimmerPlaceholder
            style={ style }
            visible={ isVisible }
        >
            { children }
        </ShimmerPlaceholder>
    );
};

export default ShimmerContainer;
