export default (connections) => {
    let directions = [];
    
    for (let i = 0; i < connections.length; i++) {
        const value = Object.values(connections[i])[0];
        directions.push(value);
    };
    
    const connectionValue = directions.pop();
    directions.unshift(connectionValue);
    
    for (let i = 0; i < connections.length; i++) {
        for (const direction in connections[i]) {
            connections[i][direction] = directions[i];
        };
    };
};