const TaskCard = ({ task }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
        <h2 className="text-xl font-semibold mb-2">{task.title} 🎯</h2>
        <p className="text-gray-600 mb-1">Due: {task.dueDate}</p>
        <p className="text-gray-700">Type: {task.type}</p>
    </div>
);

export default TaskCard;
