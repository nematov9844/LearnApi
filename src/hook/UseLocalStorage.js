/** @format */


// localStorage hook with CRUD operations
export const useLocalStorage = (key, initialValue) => {
    // Get initial value from localStorage or fallback to initialValue
    const getValue = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : initialValue;

    // Set item in localStorage and state (add new data to existing value)
    const setValue = (value) => {
        let data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
        data.push(value);
        localStorage.setItem(key, JSON.stringify(data));
    };

    // Update item in localStorage (find and update the item by index or condition)
    const updateItem = (updatedValue, id) => {
        let data = JSON.parse(localStorage.getItem(key)) || [];
        const index = data.findIndex(item => item.id === id); // assuming `id` is the unique identifier

        if (index !== -1) {
            data[index] = updatedValue; // Update the item
            localStorage.setItem(key, JSON.stringify(data));
        }
    };

    // Delete item from localStorage (find and delete the item by id)
    const removeItem = (id) => {
        let data = JSON.parse(localStorage.getItem(key)) || [];
        const newData = data.filter(item => item.id !== id); // Remove item with matching id
        localStorage.setItem(key, JSON.stringify(newData));
    };

    return {
        getValue, // Get the stored value
        setValue, // Set the value in both localStorage and state
        updateItem, // Update an existing item in localStorage
        removeItem, // Remove an item from localStorage
    };
};
