const PanicMeter = ({ dueDate }) => {
    const today = new Date()
    const due = new Date(dueDate)
    const timeDiff = due - today
    const daysLeft = Math.ceil(timeDiff / (1000*60*60*24))

    let percentage = Math.max(0, 100 - daysLeft * 10)
    if (percentage > 100) percentage = 100

    let color = "bg-green-400";
    if (daysLeft <= 5) color = "bg-yellow-400";
    if (daysLeft <= 2) color = "bg-red-500 animate-pulse";

    return (
        <div className="w-full h-3 rounded-full bg-gray-200 mt-2">
            <div
                className={`${color} h-full transition-all duration-500 ease-in-out`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    )
}

export default PanicMeter;
