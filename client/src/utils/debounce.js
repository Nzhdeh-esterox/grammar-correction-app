export function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId); // Clear the previous timeout
        timeoutId = setTimeout(() => func.apply(this, args), delay); // Set a new timeout
    };
}
