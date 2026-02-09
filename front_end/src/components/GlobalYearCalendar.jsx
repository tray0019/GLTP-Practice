

function GlobalYearCalendar({ contributions = [] }){
    const countByDate = {};
    for(let i = 0; i <contributions.length; i++){
        const item = contributions[i];
        countByDate[item.date] = item.count;
    }
    // function formatDate(dateObj){
    //     return dateObj.getFullYear() +'-'+
    // }

    const today = new Date();
    const start = new Date();
    start.setDate(start.getDate()-364); //while

    const oneYearAgo = new Date(today);

    const weeks = [];
    const current = new Date(start);

    while(current <= today){
        const week = [];

        for(let i = 0; i <7; i++){
            const dateCopy = new Date(current);
            //const dateString = formatDate(dateCopy);

            const inRange = dateCopy <= today && dateCopy >= oneYearAgo;

            week.push({ date: dateCopy,inRange});

            current.setDate(current.getDate()+1);
        }

        week.push(week);
    }

    const firstYear = start.getFullYear();
    const lastYear = today.getFullYear();
    const label = `Overall - Last 12 months (${firstYear}-${lastYear})`;


    return(
        <div style={{}} >
        <h1>Test2</h1>
        <div style={{fontSize: '0.9rem'}} >
            <div style={{ display: "flex"}}>
                {weeks.map((week, weekIndex)=>{
                    <div
                     style={{
                        display: "flex",
                        flexDirection: "column"
                     }}>
                        {week.map((cell,dayIndex)=>{
                            <div 
                            key={`day-${weekIndex}-${dayIndex}`}
                            title={`${cell.dateString}-${cell.count} goal(s)`}
                            style={{
                                    width: "12px",
                                    height: "12px",
                                    mraginBottom: "2px",
                                    //backgroundColor: getColor(cell);
                                }}>
                                
                            </div>
                        })}

                    </div>
                })}
            </div>

        </div>

    </div>
    )
}

export default GlobalYearCalendar;