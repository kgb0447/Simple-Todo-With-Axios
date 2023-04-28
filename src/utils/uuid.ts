export const uuid = (lowercase = false) => {
    return "xxxxxxxx-xxxx-4xxx-yxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const result = (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        return lowercase ? result : result.toUpperCase();
    })
}