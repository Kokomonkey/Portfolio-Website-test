// evaluator_fire_safety.js
function evaluateFireEscape(layoutData, exitDoor, pixelsPerMeter) {
    const MAX_DISTANCE_M = 30.0;
    let worstDistance = 0;

    // 1. Where is the exit?
    if (!exitDoor) return -1000; // Massive penalty if no exit exists
    const exitX = exitDoor.x;
    const exitY = exitDoor.y;

    // 2. Check the center of every room (simplified furthest point for now)
    layoutData.forEach(room => {
        const roomCenterX = room.x + (room.width / 2);
        const roomCenterY = room.y + (room.height / 2);
        
        // Euclidean distance (in pixels, convert to meters)
        // Note: For real code, you'd use A* pathfinding around walls here
        const distPx = Math.sqrt(Math.pow(roomCenterX - exitX, 2) + Math.pow(roomCenterY - exitY, 2));
        const distM = distPx / pixelsPerMeter;
        
        if (distM > worstDistance) {
            worstDistance = distM;
        }
    });

    // 3. Return a score. 
    // If worst distance is 20m (under 30m limit), score is high.
    // If worst distance is 40m, score becomes negative.
    return (MAX_DISTANCE_M - worstDistance) * 10; 
}