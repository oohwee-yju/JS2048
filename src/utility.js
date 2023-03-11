
export function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function createAnimationFunction() {
    return ((x1, x2, t) => {
        return x1+(x2-x1)*Math.sqrt(1-(1-t)*(1-t));
    });
}
