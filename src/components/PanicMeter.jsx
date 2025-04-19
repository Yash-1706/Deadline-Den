const PanicMeter = ({ daysLeft }) => {
    let color = "bg-green-400";
    if (daysLeft < 5) color = "bg-yellow-400";
    if (daysLeft < 2) color = "bg-red-500 animate-pulse";

    return (
        <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden mt-2">
            <div
                className={`${color} h-full transition-all`}
                style={{ width: `${100 - daysLeft * 10}%` }}
            />
        </div>
    );
};

export default PanicMeter;
