export const getRenderBase = async (newDate) => {
    const renderYear = newDate.getFullYear();
    const renderMonth = newDate.getMonth();
    return {renderYear, renderMonth};
}

export const renderCalendar = (renderYear, renderMonth) => {
    const preLast = new Date(renderYear, renderMonth, 0);
        const currentLast = new Date(renderYear, renderMonth+1, 0);
        const PLDate = preLast.getDate();
        const PLDay = preLast.getDay();
        const CLDate = currentLast.getDate();
        const CLDay = currentLast.getDay();
        const PDates = [];
        const CDates = [];
        const NDates = [];
        for(let i = 1; i < CLDate+1; i++ ){
            CDates.push({
                date: new Date(renderYear, renderMonth, i)
            });
        }
        // Sunday - Saturday : 0 - 6
        if (PLDay !== 6){
            for (let i = PLDay; i >= 0; i--){
                PDates.push({
                    date: new Date(renderYear, renderMonth-1, PLDate-i)
                });
            }
        }
        if (CLDay !== 6) {
            for (let i = 1; i <= 6-CLDay; i++){
                NDates.push({
                    date: new Date(renderYear, renderMonth+1, i)
                });
            }
        }
        return (PDates.concat(CDates, NDates));
}