export const updateToolTip = (tooltipRef, x, y, visible = false) => {
    if (tooltipRef.current) {
        tooltipRef.current.style.left = x + 'px';
        tooltipRef.current.style.top = y + 'px';
        if (visible) {
            tooltipRef.current.style.visibility = 'visible';
        }
    }
};
